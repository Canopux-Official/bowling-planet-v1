import React, { useEffect, useState } from 'react';
import { theme } from '../../../../../theme';
import { ArrowLeft, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../components/Toast';
import { baseProductService, type IBaseProduct } from './services';
import { BaseProductViewModal } from './components/BaseProductViewModal';
import { BaseProductModal } from './components/BaseProductModal';



export const CmsProductsView: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [products, setProducts] = useState<IBaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<IBaseProduct | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await baseProductService.getAll({ limit: 50 });
      setProducts(res.data);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (product: IBaseProduct) => {
    if (!window.confirm(`Delete "${product.title}" and all its variants? This cannot be undone.`)) return;
    try {
      await baseProductService.delete(product._id);
      showToast('success', 'Base product deleted successfully');
      fetchProducts();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete base product');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/admin/cms')} style={backBtnStyle}><ArrowLeft size={18} /></button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>Manage Products</h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Add, edit, or remove base products and items.</p>
          </div>
        </div>
        <button onClick={() => { setActiveProduct(null); setEditModalOpen(true); }} style={createBtnStyle}>
          <Plus size={16} /> New Base Product
        </button>
      </div>

      {loading ? (
        <div style={emptyStateStyle}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={emptyStateStyle}>No base products yet. Create your first one to get started.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {products.map((p) => (
            <div key={p._id} style={cardStyle}>
              <div onClick={() => navigate(`/admin/cms/products/${p.slug}/items`)} style={{ cursor: 'pointer' }}>
                <img src={p.thumbnail?.url} alt={p.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ marginTop: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: statusColor(p.status) }}>{p.status}</span>
                  <h3 style={{ margin: '4px 0 0 0', color: theme.colors.adminText, fontSize: '16px' }}>{p.title}</h3>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button onClick={() => { setActiveProduct(p); setViewModalOpen(true); }} style={actionBtnStyle}><Eye size={14} /></button>
                <button onClick={() => { setActiveProduct(p); setEditModalOpen(true); }} style={actionBtnStyle}><Pencil size={14} /></button>
                <button onClick={() => handleDelete(p)} style={{ ...actionBtnStyle, color: '#ff4d4d' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BaseProductModal
        product={activeProduct}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSaveSuccess={fetchProducts}
      />
      <BaseProductViewModal
        product={activeProduct}
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