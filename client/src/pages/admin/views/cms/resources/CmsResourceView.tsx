import React, { useEffect, useState } from 'react';
import { theme } from '../../../../../theme';
import { ArrowLeft, Plus, Pencil, Trash2, Eye, Globe, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../components/Toast';
import { resourceService, type IResource } from './services';
import { ResourceViewModal } from './components/ResourceViewModal';
import { ResourceModal } from './components/ResourceModal';


export const CmsResourceView: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<IResource | null>(null);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await resourceService.getAllAdmin({ limit: 50 });
      setResources(res.data);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResources(); }, []);

  const handleDelete = async (resource: IResource) => {
    if (!window.confirm(`Delete "${resource.title}"? This cannot be undone.`)) return;
    try {
      await resourceService.delete(resource._id);
      showToast('success', 'Resource deleted successfully');
      fetchResources();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete resource');
    }
  };

  const handleTogglePublish = async (resource: IResource) => {
    try {
      const res = await resourceService.togglePublish(resource._id);
      showToast('success', res.data.isPublished ? 'Resource published' : 'Resource unpublished');
      fetchResources();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update publish status');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/admin/cms')} style={backBtnStyle}><ArrowLeft size={18} /></button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>Manage Resources</h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Write and publish insights, resources, and articles.</p>
          </div>
        </div>
        <button onClick={() => { setActiveResource(null); setEditModalOpen(true); }} style={createBtnStyle}>
          <Plus size={16} /> New Resource
        </button>
      </div>

      {loading ? (
        <div style={emptyStateStyle}>Loading resources...</div>
      ) : resources.length === 0 ? (
        <div style={emptyStateStyle}>No resources yet. Create your first one.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {resources.map((r) => (
            <div key={r._id} style={rowCardStyle}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: 0, color: theme.colors.adminText, fontSize: '16px' }}>{r.title}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: r.isPublished ? '#10b981' : '#f59e0b' }}>
                    {r.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div style={{ color: theme.colors.adminTextMuted, fontSize: '13px', marginTop: '4px' }}>
                  {r.type} · {r.category}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleTogglePublish(r)} style={actionBtnStyle} title={r.isPublished ? 'Unpublish' : 'Publish'}>
                  {r.isPublished ? <EyeOff size={14} /> : <Globe size={14} />}
                </button>
                <button onClick={() => { setActiveResource(r); setViewModalOpen(true); }} style={actionBtnStyle}><Eye size={14} /></button>
                <button onClick={() => { setActiveResource(r); setEditModalOpen(true); }} style={actionBtnStyle}><Pencil size={14} /></button>
                <button onClick={() => handleDelete(r)} style={{ ...actionBtnStyle, color: '#ff4d4d' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ResourceModal
        resource={activeResource}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSaveSuccess={fetchResources}
      />
      <ResourceViewModal
        resource={activeResource}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
    </div>
  );
};

const backBtnStyle: React.CSSProperties = { background: 'none', border: '1px solid ' + theme.colors.adminBorder, borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.adminText };
const createBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer' };
const emptyStateStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, padding: '32px', textAlign: 'center', color: theme.colors.adminTextMuted };
const rowCardStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '10px', padding: '16px' };
const actionBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', background: 'none', color: theme.colors.adminText, cursor: 'pointer' };