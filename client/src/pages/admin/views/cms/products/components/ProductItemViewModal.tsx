import React from 'react';
import { X } from 'lucide-react';

import type { IProductItem } from '../services';
import { theme } from '../../../../../../theme';

interface Props { item: IProductItem | null; isOpen: boolean; onClose: () => void; }

export const ProductItemViewModal: React.FC<Props> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto', padding: '24px', color: theme.colors.adminText }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: statusColor(item.status) }}>{item.status}</span>
            <h2 style={{ margin: '4px 0 0 0' }}>{item.title}</h2>
            {item.price !== undefined && <div style={{ color: theme.colors.adminTextMuted, marginTop: '4px' }}>${item.price.toFixed(2)}</div>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText }}><X /></button>
        </div>

        {item.thumbnail?.url && (
          <img src={item.thumbnail.url} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />
        )}

        <div style={{ marginBottom: '20px', whiteSpace: 'pre-wrap', color: theme.colors.adminTextMuted }}>
          {item.description || 'No description provided.'}
        </div>

        {item.gallery && item.gallery.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Gallery ({item.gallery.length})</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
              {item.gallery.map((m, i) => (
                <img key={i} src={m.url} alt="gallery" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', border: `1px solid ${theme.colors.adminBorder}` }} />
              ))}
            </div>
          </div>
        )}

        {item.featureList && item.featureList.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Feature Lists</h4>
            {item.featureList.map((fl, idx) => (
              <div key={idx} style={cardStyle}>
                <div style={{ fontWeight: 600, marginBottom: '6px' }}>{fl.heading}</div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: theme.colors.adminTextMuted, fontSize: '14px' }}>
                  {fl.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {item.points && item.points.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Points</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {item.points.map((p, idx) => (
                <div key={idx} style={cardStyle}>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  {p.description && <div style={{ fontSize: '13px', color: theme.colors.adminTextMuted, marginTop: '4px' }}>{p.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {item.usedIn && item.usedIn.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Used In</h4>
            {item.usedIn.map((loc, idx) => (
              <div key={idx} style={cardStyle}>
                <div style={{ fontWeight: 600 }}>{loc.name}</div>
                {loc.description && <div style={{ fontSize: '13px', color: theme.colors.adminTextMuted, marginTop: '4px' }}>{loc.description}</div>}
                {loc.images && loc.images.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {loc.images.map((im, i) => (
                      <img key={i} src={im.url} alt={loc.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: theme.colors.adminTextMuted, marginTop: '8px' }}>
          <span>Purchases: {item.purchaseCount}</span>
          <span>Featured Order: {item.featuredOrder}</span>
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

const sectionStyle: React.CSSProperties = { marginBottom: '20px' };
const sectionTitleStyle: React.CSSProperties = { margin: '0 0 8px 0' };
const cardStyle: React.CSSProperties = { padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px', marginBottom: '8px' };