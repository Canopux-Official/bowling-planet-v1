import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ArrowLeft, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { baseProductService, productItemService, type IBaseProduct, type IProductItem } from '../services';
import { ProductItemModal } from './ProductItemModal';
import { ProductItemViewModal } from './ProductItemViewModal';
import { useToast } from '../../../../components/Toast';
import { theme } from '../../../../../../theme';


export const ProductItemsView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [baseProduct, setBaseProduct] = useState<IBaseProduct | null>(null);
  const [items, setItems] = useState<IProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<IProductItem | null>(null);

  const fetchData = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await baseProductService.getWithItems(slug);
      const { items: fetchedItems, ...productFields } = res.data;
      setBaseProduct(productFields as IBaseProduct);
      setItems(fetchedItems);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to load product items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [slug]);

  const handleDelete = async (item: IProductItem) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try {
      await productItemService.delete(item._id);
      showToast('success', 'Product item deleted successfully');
      fetchData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete product item');
    }
  };

  if (loading) {
    return <div style={emptyStateStyle}>Loading...</div>;
  }

  if (!baseProduct) {
    return <div style={emptyStateStyle}>Base product not found.</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/admin/cms/products')} style={backBtnStyle}><ArrowLeft size={18} /></button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>{baseProduct.title} — Items</h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Manage variant items for this base product.</p>
          </div>
        </div>
        <button onClick={() => { setActiveItem(null); setEditModalOpen(true); }} style={createBtnStyle}>
          <Plus size={16} /> New Item
        </button>
      </div>

      {items.length === 0 ? (
        <div style={emptyStateStyle}>No items yet for this product. Create the first one.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {items.map((it) => (
            <div key={it._id} style={cardStyle}>
              <img src={it.thumbnail?.url} alt={it.title} style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: statusColor(it.status) }}>{it.status}</span>
                <h3 style={{ margin: '4px 0 0 0', color: theme.colors.adminText, fontSize: '15px' }}>{it.title}</h3>
                {it.price !== undefined && <div style={{ color: theme.colors.adminTextMuted, fontSize: '13px', marginTop: '2px' }}>${it.price.toFixed(2)}</div>}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button onClick={() => { setActiveItem(it); setViewModalOpen(true); }} style={actionBtnStyle}><Eye size={14} /></button>
                <button onClick={() => { setActiveItem(it); setEditModalOpen(true); }} style={actionBtnStyle}><Pencil size={14} /></button>
                <button onClick={() => handleDelete(it)} style={{ ...actionBtnStyle, color: '#ff4d4d' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductItemModal
        item={activeItem}
        baseProductId={baseProduct._id}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSaveSuccess={fetchData}
      />
      <ProductItemViewModal
        item={activeItem}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />
    </div>
  );
};

function statusColor(status: string) {
  if (status === 'active') return '#10b981';
  if (status === 'draft') return '#f59e0b';
  return '#ef4444';
}

const backBtnStyle: React.CSSProperties = { background: 'none', border: '1px solid ' + theme.colors.adminBorder, borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.adminText };
const createBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer' };
const emptyStateStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, padding: '32px', textAlign: 'center', color: theme.colors.adminTextMuted };
const cardStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', padding: '12px' };
const actionBtnStyle: React.CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', background: 'none', color: theme.colors.adminText, cursor: 'pointer' };
