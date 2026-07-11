import React, { useEffect, useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useToast } from '../../../../components/Toast';
import { baseProductService, type IBaseProduct, type ProductStatus } from '../services';
import { theme } from '../../../../../../theme';




interface Props {
  product: IBaseProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const BaseProductModal: React.FC<Props> = ({ product, isOpen, onClose, onSaveSuccess }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProductStatus>('active');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description || '');
      setStatus(product.status);
      setExistingThumbnailUrl(product.thumbnail?.url || null);
    } else {
      setTitle(''); setDescription(''); setStatus('active'); setExistingThumbnailUrl(null);
    }
    setThumbnailFile(null);
    setError('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product && !thumbnailFile) {
      setError('Thumbnail image is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (product) {
        await baseProductService.update(product._id, { title, description, status }, thumbnailFile);
        showToast('success', 'Base product updated successfully');
      } else {
        await baseProductService.create({ title, description, status }, thumbnailFile as File);
        showToast('success', 'Base product created successfully');
      }
      onSaveSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.message || 'Failed to save base product';
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
          <h2 style={{ margin: 0, color: theme.colors.adminText }}>{product ? 'Edit Base Product' : 'Create Base Product'}</h2>
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
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)} style={inputStyle}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Thumbnail {!product && '(required)'}</label>
            {thumbnailFile ? (
              <div style={{ fontSize: '13px', color: theme.colors.adminTextMuted, marginBottom: '8px' }}>{thumbnailFile.name}</div>
            ) : existingThumbnailUrl ? (
              <img src={existingThumbnailUrl} alt="thumbnail" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
            ) : null}
            <label style={uploadAreaStyle}>
              <Upload size={16} /> {existingThumbnailUrl || thumbnailFile ? 'Replace Thumbnail' : 'Upload Thumbnail'}
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && setThumbnailFile(e.target.files[0])} style={{ display: 'none' }} />
            </label>
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
const labelStyle: React.CSSProperties = { display: 'block', color: theme.colors.adminText, marginBottom: '6px', fontSize: '14px', fontWeight: 600 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.1)', border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminText, outline: 'none', boxSizing: 'border-box', fontSize: '14px' };
const uploadAreaStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `1px dashed ${theme.colors.adminBorder}`, padding: '12px', borderRadius: '8px', cursor: 'pointer', color: theme.colors.adminTextMuted, fontSize: '14px' };
const iconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px' };
const saveBtnStyle: React.CSSProperties = { padding: '10px 18px', border: 'none', backgroundColor: '#3b82f6', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' };