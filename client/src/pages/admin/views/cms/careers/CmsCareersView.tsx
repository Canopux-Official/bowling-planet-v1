import React, { useEffect, useState } from 'react';
import { theme } from '../../../../../theme';
import { ArrowLeft, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { careerService, type IJob } from './services';
import { useToast } from '../../../components/Toast';
import { CareerModal } from './components/CareerModal';
import { CareerViewModal } from './components/CareerViewModal';




export const CmsCareersView: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<IJob | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await careerService.getAll({ limit: 50 });
      setJobs(res.data);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (job: IJob) => {
    if (!window.confirm(`Delete "${job.title}"? This will permanently remove the job posting and cannot be undone.`)) return;
    try {
      await careerService.delete(job._id);
      showToast('success', 'Job deleted successfully');
      fetchJobs();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete job');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/admin/cms')} style={backBtnStyle}><ArrowLeft size={18} /></button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>Manage Careers</h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Post and manage job openings.</p>
          </div>
        </div>
        <button onClick={() => { setActiveJob(null); setEditModalOpen(true); }} style={createBtnStyle}>
          <Plus size={16} /> New Job
        </button>
      </div>

      {loading ? (
        <div style={emptyStateStyle}>Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div style={emptyStateStyle}>No job postings yet. Create your first one.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {jobs.map((job) => (
            <div key={job._id} style={rowCardStyle}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: 0, color: theme.colors.adminText, fontSize: '16px' }}>{job.title}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: statusColor(job.status) }}>{job.status}</span>
                </div>
                <div style={{ color: theme.colors.adminTextMuted, fontSize: '13px', marginTop: '4px' }}>
                  {job.location} · {job.jobType} · {job.experience} {job.department ? `· ${job.department}` : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setActiveJob(job); setViewModalOpen(true); }} style={actionBtnStyle}><Eye size={14} /></button>
                <button onClick={() => { setActiveJob(job); setEditModalOpen(true); }} style={actionBtnStyle}><Pencil size={14} /></button>
                <button onClick={() => handleDelete(job)} style={{ ...actionBtnStyle, color: '#ff4d4d' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CareerModal
        job={activeJob}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSaveSuccess={fetchJobs}
      />
      <CareerViewModal
        job={activeJob}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
    </div>
  );
};

function statusColor(status: string) {
  if (status === 'open') return '#10b981';
  if (status === 'draft') return '#f59e0b';
  return '#ef4444';
}

const backBtnStyle: React.CSSProperties = { background: 'none', border: '1px solid ' + theme.colors.adminBorder, borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.adminText };
const createBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer' };
const emptyStateStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, padding: '32px', textAlign: 'center', color: theme.colors.adminTextMuted };
const rowCardStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '10px', padding: '16px' };
const actionBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', background: 'none', color: theme.colors.adminText, cursor: 'pointer' };