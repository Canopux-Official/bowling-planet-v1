import React, { useEffect, useState } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';

import {
  productItemService,
  type IProductItem,
  type IMedia,
  type IFeaturePoint,
  type IBulletList,
  type IUsageLocation,
  type ProductStatus,
} from '../services';
import { useToast } from '../../../../components/Toast';
import { theme } from '../../../../../../theme';


interface Props {
  item: IProductItem | null;
  baseProductId: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const ProductItemModal: React.FC<Props> = ({ item, baseProductId, isOpen, onClose, onSaveSuccess }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProductStatus>('active');
  const [price, setPrice] = useState<string>('');
  const [featuredOrder, setFeaturedOrder] = useState<string>('0');

  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [existingGallery, setExistingGallery] = useState<IMedia[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);

  const [featureList, setFeatureList] = useState<IBulletList[]>([]);
  const [points, setPoints] = useState<IFeaturePoint[]>([]);
  const [usedIn, setUsedIn] = useState<IUsageLocation[]>([]);

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setDescription(item.description || '');
      setStatus(item.status);
      setPrice(item.price !== undefined ? String(item.price) : '');
      setFeaturedOrder(String(item.featuredOrder ?? 0));
      setExistingThumbnailUrl(item.thumbnail?.url || null);
      setExistingGallery(item.gallery || []);
      setFeatureList(item.featureList || []);
      setPoints(item.points || []);
      setUsedIn(item.usedIn || []);
    } else {
      setTitle(''); setDescription(''); setStatus('active'); setPrice(''); setFeaturedOrder('0');
      setExistingThumbnailUrl(null); setExistingGallery([]);
      setFeatureList([]); setPoints([]); setUsedIn([]);
    }
    setThumbnailFile(null);
    setNewGalleryFiles([]);
    setError('');
  }, [item, isOpen]);

  if (!isOpen) return null;

  // --- Feature list (bullet groups) ---
  const addFeatureList = () => setFeatureList([...featureList, { heading: '', items: [''] }]);
  const updateFeatureHeading = (idx: number, val: string) => {
    const u = [...featureList]; u[idx].heading = val; setFeatureList(u);
  };
  const addFeatureItem = (listIdx: number) => {
    const u = [...featureList]; u[listIdx].items.push(''); setFeatureList(u);
  };
  const updateFeatureItem = (listIdx: number, itemIdx: number, val: string) => {
    const u = [...featureList]; u[listIdx].items[itemIdx] = val; setFeatureList(u);
  };
  const removeFeatureItem = (listIdx: number, itemIdx: number) => {
    const u = [...featureList]; u[listIdx].items = u[listIdx].items.filter((_, i) => i !== itemIdx); setFeatureList(u);
  };
  const removeFeatureList = (idx: number) => setFeatureList(featureList.filter((_, i) => i !== idx));

  // --- Points ---
  const addPoint = () => setPoints([...points, { title: '', description: '' }]);
  const updatePoint = (idx: number, key: keyof IFeaturePoint, val: string) => {
    const u = [...points]; u[idx] = { ...u[idx], [key]: val }; setPoints(u);
  };
  const removePoint = (idx: number) => setPoints(points.filter((_, i) => i !== idx));

  // --- Used In ---
  const addUsedIn = () => setUsedIn([...usedIn, { name: '', description: '' }]);
  const updateUsedIn = (idx: number, key: keyof IUsageLocation, val: string) => {
    const u = [...usedIn]; u[idx] = { ...u[idx], [key]: val }; setUsedIn(u);
  };
  const removeUsedIn = (idx: number) => setUsedIn(usedIn.filter((_, i) => i !== idx));

  // --- Gallery ---
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setNewGalleryFiles([...newGalleryFiles, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item && !thumbnailFile) {
      setError('Thumbnail image is required');
      return;
    }
    setLoading(true);
    setError('');

    const payload: Partial<IProductItem> = {
      baseProduct: baseProductId,
      title,
      description,
      status,
      price: price ? Number(price) : undefined,
      featuredOrder: Number(featuredOrder) || 0,
      gallery: existingGallery,
      featureList,
      points,
      usedIn,
    };

    try {
      if (item) {
        await productItemService.update(item._id, payload, thumbnailFile, newGalleryFiles);
        showToast('success', 'Product item updated successfully');
      } else {
        await productItemService.create(payload, thumbnailFile as File, newGalleryFiles);
        showToast('success', 'Product item created successfully');
      }
      onSaveSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.message || 'Failed to save product item';
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
          <h2 style={{ margin: 0, color: theme.colors.adminText }}>{item ? 'Edit Product Item' : 'Create Product Item'}</h2>
          <button onClick={onClose} style={iconBtnStyle}><X /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && <div style={{ color: '#ff4d4d', fontSize: '14px', fontWeight: 500 }}>{error}</div>}

          <div style={rowStyle}>
            <div style={{ flex: 2 }}>
              <label style={labelStyle}>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Price</label>
              <input type="number" min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={inputStyle} />
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)} style={inputStyle}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Featured Order</label>
              <input type="number" value={featuredOrder} onChange={(e) => setFeaturedOrder(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <hr style={dividerStyle} />

          {/* Thumbnail */}
          <div>
            <label style={labelStyle}>Thumbnail {!item && '(required)'}</label>
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

          {/* Gallery */}
          <div>
            <label style={labelStyle}>Gallery</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              {existingGallery.map((m, i) => (
                <div key={i} style={thumbnailWrapperStyle}>
                  <img src={m.url} alt="gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button type="button" onClick={() => setExistingGallery(existingGallery.filter((_, idx) => idx !== i))} style={deleteThumbBtnStyle}><Trash2 size={12} /></button>
                </div>
              ))}
              {newGalleryFiles.map((f, i) => (
                <div key={i} style={{ ...thumbnailWrapperStyle, opacity: 0.7, backgroundColor: theme.colors.adminBorder }}>
                  <div style={{ fontSize: '10px', padding: '4px' }}>{f.name}</div>
                  <button type="button" onClick={() => setNewGalleryFiles(newGalleryFiles.filter((_, idx) => idx !== i))} style={deleteThumbBtnStyle}><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
            <label style={uploadAreaStyle}>
              <Upload size={16} /> Add Gallery Images
              <input type="file" multiple accept="image/*" onChange={handleGalleryChange} style={{ display: 'none' }} />
            </label>
          </div>

          <hr style={dividerStyle} />

          {/* Feature List (bullet groups) */}
          <div style={cardSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={sectionTitleStyle}>Feature Lists</h3>
              <button type="button" onClick={addFeatureList} style={subAddBtnStyle}><Plus size={14} /> Add List Group</button>
            </div>
            {featureList.map((fl, listIdx) => (
              <div key={listIdx} style={subCardStyle}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                  <input placeholder="List Heading" value={fl.heading} onChange={(e) => updateFeatureHeading(listIdx, e.target.value)} required style={inputStyle} />
                  <button type="button" onClick={() => removeFeatureList(listIdx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
                </div>
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {fl.items.map((val, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', gap: '8px' }}>
                      <input placeholder={`Item #${itemIdx + 1}`} value={val} onChange={(e) => updateFeatureItem(listIdx, itemIdx, e.target.value)} required style={inputStyle} />
                      <button type="button" onClick={() => removeFeatureItem(listIdx, itemIdx)} style={removeIconBtnStyle}><Trash2 size={14} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addFeatureItem(listIdx)} style={{ ...subAddBtnStyle, alignSelf: 'flex-start' }}><Plus size={12} /> Add Item</button>
                </div>
              </div>
            ))}
          </div>

          {/* Points */}
          <div style={cardSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={sectionTitleStyle}>Points</h3>
              <button type="button" onClick={addPoint} style={subAddBtnStyle}><Plus size={14} /> Add Point</button>
            </div>
            {points.map((pt, idx) => (
              <div key={idx} style={arrayItemRowStyle}>
                <input placeholder="Title" value={pt.title} onChange={(e) => updatePoint(idx, 'title', e.target.value)} required style={inputStyle} />
                <input placeholder="Description" value={pt.description || ''} onChange={(e) => updatePoint(idx, 'description', e.target.value)} style={inputStyle} />
                <button type="button" onClick={() => removePoint(idx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>

          {/* Used In */}
          <div style={cardSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={sectionTitleStyle}>Used In</h3>
              <button type="button" onClick={addUsedIn} style={subAddBtnStyle}><Plus size={14} /> Add Location</button>
            </div>
            {usedIn.map((loc, idx) => (
              <div key={idx} style={arrayItemRowStyle}>
                <input placeholder="Location Name" value={loc.name} onChange={(e) => updateUsedIn(idx, 'name', e.target.value)} required style={inputStyle} />
                <input placeholder="Description" value={loc.description || ''} onChange={(e) => updateUsedIn(idx, 'description', e.target.value)} style={inputStyle} />
                <button type="button" onClick={() => removeUsedIn(idx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
              </div>
            ))}
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
const containerStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '800px', maxHeight: '92vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' };
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${theme.colors.adminBorder}`, position: 'sticky', top: 0, backgroundColor: theme.colors.adminSurface, zIndex: 10 };
const rowStyle: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' };
const labelStyle: React.CSSProperties = { display: 'block', color: theme.colors.adminText, marginBottom: '6px', fontSize: '14px', fontWeight: 600 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.1)', border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminText, outline: 'none', boxSizing: 'border-box', fontSize: '14px' };
const dividerStyle: React.CSSProperties = { border: 0, borderTop: `1px solid ${theme.colors.adminBorder}`, margin: '4px 0' };
const cardSectionStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };
const sectionHeaderStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const sectionTitleStyle: React.CSSProperties = { margin: 0, fontSize: '15px', color: theme.colors.adminText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' };
const subCardStyle: React.CSSProperties = { padding: '14px', backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px' };
const arrayItemRowStyle: React.CSSProperties = { display: 'flex', gap: '10px', alignItems: 'center' };
const uploadAreaStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `1px dashed ${theme.colors.adminBorder}`, padding: '16px', borderRadius: '8px', cursor: 'pointer', color: theme.colors.adminTextMuted, fontSize: '14px' };
const thumbnailWrapperStyle: React.CSSProperties = { position: 'relative', width: '75px', height: '75px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', overflow: 'hidden' };
const deleteThumbBtnStyle: React.CSSProperties = { position: 'absolute', top: '2px', right: '2px', backgroundColor: 'rgba(255,77,77,0.9)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', padding: '4px' };
const subAddBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px', background: 'none', color: '#3b82f6', border: 'none', cursor: 'pointer', padding: '4px', fontSize: '13px', fontWeight: 600 };
const removeIconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' };
const iconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px' };
const saveBtnStyle: React.CSSProperties = { padding: '10px 18px', border: 'none', backgroundColor: '#3b82f6', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' };
