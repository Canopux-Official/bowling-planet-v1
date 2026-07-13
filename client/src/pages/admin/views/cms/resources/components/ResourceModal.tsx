import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import { resourceService, type IResource, type ResourceType } from '../services';
import { theme } from '../../../../../../theme';
import { useToast } from '../../../../components/Toast';


const RESOURCE_TYPES: ResourceType[] = ['pdf', 'video', 'tool', 'link', 'guide'];

interface Props {
  resource: IResource | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const ResourceModal: React.FC<Props> = ({ resource, isOpen, onClose, onSaveSuccess }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ResourceType>('link');
  const [externalUrl, setExternalUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (resource) {
      setTitle(resource.title || '');
      setDescription(resource.description || '');
      setType(resource.type || 'link');
      setExternalUrl(resource.externalUrl || '');
      setCategory(resource.category || '');
      setTagsInput(resource.tags ? resource.tags.join(', ') : '');
      setIsPublished(resource.isPublished || false);
    } else {
      setTitle(''); setDescription(''); setType('link'); setExternalUrl('');
      setCategory(''); setTagsInput(''); setIsPublished(false);
    }
    setError('');
  }, [resource, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload: Partial<IResource> = {
      title,
      description,
      type,
      externalUrl,
      category,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      isPublished,
    };

    try {
      if (resource) {
        await resourceService.update(resource._id, payload);
        showToast('success', 'Resource updated successfully');
      } else {
        await resourceService.create(payload);
        showToast('success', 'Resource created successfully');
      }
      onSaveSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.message || 'Failed to save resource';
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
          <h2 style={{ margin: 0, color: theme.colors.adminText }}>{resource ? 'Edit Resource' : 'Create Resource'}</h2>
          <button onClick={onClose} style={iconBtnStyle}><X /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && <div style={{ color: '#ff4d4d', fontSize: '14px' }}>{error}</div>}

          <div>
            <label style={labelStyle}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required style={inputStyle} />
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as ResourceType)} style={inputStyle}>
                {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Category</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} required style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>External URL</label>
            <input type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} required placeholder="https://..." style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Tags (comma separated)</label>
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="operations, guide" style={inputStyle} />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: theme.colors.adminText, fontWeight: 500 }}>
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} style={{ transform: 'scale(1.1)' }} />
            Publish this resource
          </label>

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
const containerStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto' };
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${theme.colors.adminBorder}` };
const rowStyle: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' };
const labelStyle: React.CSSProperties = { display: 'block', color: theme.colors.adminText, marginBottom: '6px', fontSize: '14px', fontWeight: 600 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.1)', border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminText, outline: 'none', boxSizing: 'border-box', fontSize: '14px' };
const iconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px' };
const saveBtnStyle: React.CSSProperties = { padding: '10px 18px', border: 'none', backgroundColor: '#3b82f6', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' };
