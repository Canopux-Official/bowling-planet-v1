import React, { useEffect, useState } from 'react';
import { theme } from '../../../../../theme';
import { ArrowLeft, Plus, Eye, Edit2, Trash2, Globe, EyeOff, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ProjectModal } from './components/ProjectModal';
import { projectService, type IProject } from './services';
import { ProjectViewModal } from './components/ProjectvViewModal';


export const CmsProjectsView: React.FC = () => {
  const navigate = useNavigate();
  
  // Data list and loading states
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination tracking metrics
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal target references
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await projectService.getAll({
        page,
        limit: 8,
        search: searchTerm,
      });
      if (response.success) {
        setProjects(response.data.projects);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (err) {
      console.error('Error retrieving internal collections records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, searchTerm]);

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await projectService.togglePublish(id, !currentStatus);
      fetchProjects();
    } catch (err) {
      alert('Failed updating state flags visibility maps.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you absolute sure you want to completely erase this project details along with remote asset arrays?')) {
      try {
        await projectService.delete(id);
        fetchProjects();
      } catch (err: any) {
        alert(err.message || 'Error occurred handling deletion sequence.');
      }
    }
  };

  const openCreateModal = () => {
    setSelectedProject(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (p: IProject) => {
    setSelectedProject(p);
    setIsFormModalOpen(true);
  };

  const openViewModal = (p: IProject) => {
    setSelectedProject(p);
    setIsViewModalOpen(true);
  };

  return (
    <div>
      {/* Header Container Layout */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate('/admin/cms')}
            style={{ 
              background: 'none', border: '1px solid ' + theme.colors.adminBorder, 
              borderRadius: '8px', padding: '8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: theme.colors.adminText
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>Manage Projects</h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Upload real project gallery photos and detail pages.</p>
          </div>
        </div>

        <button onClick={openCreateModal} style={addBtnStyle}>
          <Plus size={18} /> New Project
        </button>
      </div>

      {/* Control Utility Toolbar Layer */}
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: theme.colors.adminTextMuted }} />
        <input 
          type="text" 
          placeholder="Search items via titles or description criteria blocks..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          style={{ 
            width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', 
            backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`,
            color: theme.colors.adminText, outline: 'none'
          }}
        />
      </div>

      {/* Main Grid Render Loop */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: theme.colors.adminTextMuted }}>Loading structural dependencies...</div>
      ) : projects.length === 0 ? (
        <div style={{ 
          backgroundColor: theme.colors.adminSurface, borderRadius: '12px', 
          border: `1px solid ${theme.colors.adminBorder}`, padding: '42px',
          textAlign: 'center', color: theme.colors.adminTextMuted
        }}>
          No matching records identified. Click "New Project" to construct entry.
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {projects.map((proj) => (
              <div key={proj._id} style={{ 
                backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`,
                borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column'
              }}>
                {/* Visual Thumbnail */}
                <div style={{ height: '160px', backgroundColor: theme.colors.adminBorder, position: 'relative' }}>
                  {proj.media && proj.media[0] ? (
                    <img src={proj.media[0].url} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: theme.colors.adminTextMuted, fontSize: '14px' }}>No Images Linked</div>
                  )}
                  <span style={{
                    position: 'absolute', top: '10px', right: '10px', padding: '4px 8px', borderRadius: '4px',
                    fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase',
                    backgroundColor: proj.isPublished ? 'rgba(16,185,129,0.9)' : 'rgba(245,158,11,0.9)', color: 'white'
                  }}>
                    {proj.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Body Content Context blocks */}
                <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: theme.colors.adminText }}>{proj.title}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: theme.colors.adminTextMuted, lineBreak: 'anywhere', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {proj.description || 'No descriptions standard fields provided.'}
                  </p>
                  
                  {/* Footer Interactive Actions Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '12px', borderTop: `1px solid ${theme.colors.adminBorder}` }}>
                    <button 
                      onClick={() => handleTogglePublish(proj._id, proj.isPublished)}
                      title={proj.isPublished ? "Unpublish Project" : "Publish Project"}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: proj.isPublished ? '#10b981' : theme.colors.adminTextMuted }}
                    >
                      {proj.isPublished ? <Globe size={18} /> : <EyeOff size={18} />}
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openViewModal(proj)} title="View Details" style={actionBtnStyle}><Eye size={16} /></button>
                      <button onClick={() => openEditModal(proj)} title="Edit Configuration" style={actionBtnStyle}><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(proj._id)} title="Delete Records" style={{ ...actionBtnStyle, color: '#ff4d4d' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Pagination Footer Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={pageBtnStyle}>Prev</button>
              <span style={{ color: theme.colors.adminText }}>Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} style={pageBtnStyle}>Next</button>
            </div>
          )}
        </>
      )}

      {/* Modals Injections */}
      <ProjectModal 
        isOpen={isFormModalOpen} 
        project={selectedProject} 
        onClose={() => setIsFormModalOpen(false)} 
        onSaveSuccess={fetchProjects} 
      />

      <ProjectViewModal 
        isOpen={isViewModalOpen} 
        project={selectedProject} 
        onClose={() => setIsViewModalOpen(false)} 
      />
    </div>
  );
};

// Auxiliary style values definitions
const addBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px',
  backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px',
  cursor: 'pointer', fontWeight: 600, fontSize: '14px'
};
const actionBtnStyle: React.CSSProperties = {
  background: 'none', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px',
  padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: theme.colors.adminText
};
const pageBtnStyle: React.CSSProperties = {
  padding: '6px 12px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none',
  borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer'
};