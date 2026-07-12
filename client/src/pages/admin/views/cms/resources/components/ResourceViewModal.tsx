import React from 'react';
import { X, ExternalLink } from 'lucide-react';

import type { IResource } from '../services';
import { theme } from '../../../../../../theme';

interface Props { resource: IResource | null; isOpen: boolean; onClose: () => void; }

export const ResourceViewModal: React.FC<Props> = ({ resource, isOpen, onClose }) => {
  if (!isOpen || !resource) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '520px', padding: '24px', color: theme.colors.adminText }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: resource.isPublished ? '#10b981' : '#f59e0b' }}>
              {resource.isPublished ? 'Published' : 'Draft'}
            </span>
            <h2 style={{ margin: '4px 0 0 0' }}>{resource.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText }}><X /></button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', fontSize: '13px' }}>
          <span style={pillStyle}>{resource.type}</span>
          <span style={pillStyle}>{resource.category}</span>
        </div>

        <div style={{ marginBottom: '16px', whiteSpace: 'pre-wrap', color: theme.colors.adminTextMuted }}>
          {resource.description}
        </div>

        {resource.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {resource.tags.map((t, idx) => (
              <span key={idx} style={{ backgroundColor: theme.colors.adminBorder, padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>#{t}</span>
            ))}
          </div>
        )}

        <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          <ExternalLink size={14} /> Open resource link
        </a>
      </div>
    </div>
  );
};

const pillStyle: React.CSSProperties = { backgroundColor: theme.colors.adminBorder, padding: '4px 10px', borderRadius: '999px', textTransform: 'capitalize' };
const linkStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#3b82f6', fontSize: '14px', textDecoration: 'none', fontWeight: 600 };