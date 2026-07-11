import React, { useEffect, useState } from 'react';
import { X, Upload } from 'lucide-react';

import { teamService, type ITeamMember, type TeamMemberStatus } from '../services';
import { useToast } from '../../../../components/Toast';
import { theme } from '../../../../../../theme';

interface Props {
  member: ITeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const TeamMemberModal: React.FC<Props> = ({ member, isOpen, onClose, onSaveSuccess }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [experience, setExperience] = useState('');
  const [order, setOrder] = useState('0');
  const [status, setStatus] = useState<TeamMemberStatus>('active');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (member) {
      setName(member.name || '');
      setDesignation(member.designation || '');
      setExperience(member.experience || '');
      setOrder(String(member.order ?? 0));
      setStatus(member.status || 'active');
      setExistingImageUrl(member.image?.url || null);
    } else {
      setName(''); setDesignation(''); setExperience(''); setOrder('0'); setStatus('active');
      setExistingImageUrl(null);
    }
    setImageFile(null);
    setError('');
  }, [member, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member && !imageFile) {
      setError('Profile image is required');
      return;
    }
    setLoading(true);
    setError('');

    const payload: Partial<ITeamMember> = {
      name, designation, experience, order: Number(order) || 0, status,
    };

    try {
      if (member) {
        await teamService.update(member._id, payload, imageFile);
        showToast('success', 'Team member updated successfully');
      } else {
        await teamService.create(payload, imageFile as File);
        showToast('success', 'Team member created successfully');
      }
      onSaveSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.message || 'Failed to save team member';
      setError(msg);
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={backdropStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, color: theme.colors.adminText }}>{member ? 'Edit Team Member' : 'Add Team Member'}</h2>
          <button onClick={onClose} style={iconBtnStyle}><X /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && <div style={{ color: '#ff4d4d', fontSize: '14px' }}>{error}</div>}

          <div>
            <label style={labelStyle}>Profile Image {!member && '(required)'}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {imageFile ? (
                <div style={{ fontSize: '13px', color: theme.colors.adminTextMuted }}>{imageFile.name}</div>
              ) : existingImageUrl ? (
                <img src={existingImageUrl} alt={name} style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '50%', border: `1px solid ${theme.colors.adminBorder}` }} />
              ) : null}
              <label style={uploadAreaStyle}>
                <Upload size={16} /> {existingImageUrl || imageFile ? 'Replace Photo' : 'Upload Photo'}
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && setImageFile(e.target.files[0])} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Designation</label>
              <input value={designation} onChange={(e) => setDesignation(e.target.value)} required style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Experience</label>
            <input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 5+ years in product design" style={inputStyle} />
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Display Order</label>
              <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as TeamMemberStatus)} style={inputStyle}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} disabled={loading} style={cancelBtnStyle}>Cancel</button>
            <button type="submit" disabled={loading} style={saveBtnStyle}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const backdropStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' };
const containerStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' };
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${theme.colors.adminBorder}` };
const rowStyle: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' };
const labelStyle: React.CSSProperties = { display: 'block', color: theme.colors.adminText, marginBottom: '6px', fontSize: '14px', fontWeight: 600 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.1)', border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminText, outline: 'none', boxSizing: 'border-box', fontSize: '14px' };
const uploadAreaStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `1px dashed ${theme.colors.adminBorder}`, padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', color: theme.colors.adminTextMuted, fontSize: '13px' };
const iconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px' };
const saveBtnStyle: React.CSSProperties = { padding: '10px 18px', border: 'none', backgroundColor: '#3b82f6', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' };