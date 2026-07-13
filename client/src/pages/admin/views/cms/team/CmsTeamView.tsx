import React, { useEffect, useState } from 'react';
import { theme } from '../../../../../theme';
import { ArrowLeft, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { teamService, type ITeamMember } from './services';
import { useToast } from '../../../components/Toast';
import { TeamMemberViewModal } from './components/TeamMemberViewModal';
import { TeamMemberModal } from './components/TeamMemberModal';

export const CmsTeamView: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [members, setMembers] = useState<ITeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<ITeamMember | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await teamService.getAll();
      setMembers(res.data);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleDelete = async (member: ITeamMember) => {
    if (!window.confirm(`Remove "${member.name}" from the team page? This cannot be undone.`)) return;
    try {
      await teamService.delete(member._id);
      showToast('success', 'Team member deleted successfully');
      fetchMembers();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete team member');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/admin/cms')} style={backBtnStyle}><ArrowLeft size={18} /></button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>Team Details</h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Manage team member information and roles.</p>
          </div>
        </div>
        <button onClick={() => { setActiveMember(null); setEditModalOpen(true); }} style={createBtnStyle}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      {loading ? (
        <div style={emptyStateStyle}>Loading team members...</div>
      ) : members.length === 0 ? (
        <div style={emptyStateStyle}>No team members yet. Add your first one.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {members.map((m) => (
            <div key={m._id} style={cardStyle}>
              <img src={m.image?.url} alt={m.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto' }} />
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <h3 style={{ margin: 0, color: theme.colors.adminText, fontSize: '15px' }}>{m.name}</h3>
                <div style={{ color: theme.colors.adminTextMuted, fontSize: '13px', marginTop: '2px' }}>{m.designation}</div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: m.status === 'active' ? '#10b981' : '#ef4444' }}>{m.status}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button onClick={() => { setActiveMember(m); setViewModalOpen(true); }} style={actionBtnStyle}><Eye size={14} /></button>
                <button onClick={() => { setActiveMember(m); setEditModalOpen(true); }} style={actionBtnStyle}><Pencil size={14} /></button>
                <button onClick={() => handleDelete(m)} style={{ ...actionBtnStyle, color: '#ff4d4d' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TeamMemberModal
        member={activeMember}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSaveSuccess={fetchMembers}
      />
      <TeamMemberViewModal
        member={activeMember}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
    </div>
  );
};

const backBtnStyle: React.CSSProperties = { background: 'none', border: '1px solid ' + theme.colors.adminBorder, borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.adminText };
const createBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer' };
const emptyStateStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, padding: '32px', textAlign: 'center', color: theme.colors.adminTextMuted };
const cardStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', padding: '16px' };
const actionBtnStyle: React.CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', background: 'none', color: theme.colors.adminText, cursor: 'pointer' };
