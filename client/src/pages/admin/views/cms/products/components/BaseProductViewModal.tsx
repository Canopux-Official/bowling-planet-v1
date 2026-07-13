import React from 'react';
import { X } from 'lucide-react';

import type { IBaseProduct } from '../services';
import { theme } from '../../../../../../theme';

interface Props { product: IBaseProduct | null; isOpen: boolean; onClose: () => void; }

export const BaseProductViewModal: React.FC<Props> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px', color: theme.colors.adminText }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: statusColor(product.status) }}>{product.status}</span>
            <h2 style={{ margin: '4px 0 0 0' }}>{product.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText }}><X /></button>
        </div>
        {product.thumbnail?.url && (
          <img src={product.thumbnail.url} alt={product.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />
        )}
        <div style={{ color: theme.colors.adminTextMuted, whiteSpace: 'pre-wrap' }}>
          {product.description || 'No description provided.'}
        </div>
      </div>
    </div>
  );
};

function statusColor(status: string) {
  if (status === 'active') return '#10b981';
  if (status === 'draft') return '#f59e0b';
  return '#ef4444';
}
