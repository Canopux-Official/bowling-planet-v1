import React from 'react';
import { X } from 'lucide-react';

import type { IBlog } from '../services';
import { theme } from '../../../../../../theme';

interface Props { blog: IBlog | null; isOpen: boolean; onClose: () => void; }

export const BlogPreviewModal: React.FC<Props> = ({ blog, isOpen, onClose }) => {
  if (!isOpen || !blog) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '760px', maxHeight: '90vh', overflowY: 'auto', color: theme.colors.adminText }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${theme.colors.adminBorder}`, position: 'sticky', top: 0, backgroundColor: theme.colors.adminSurface }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: blog.isPublished ? '#10b981' : '#f59e0b' }}>
            {blog.isPublished ? 'Published' : 'Draft'}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText }}><X /></button>
        </div>
        <div style={{ padding: '24px' }}>
          {blog.coverImage?.url && (
            <img src={blog.coverImage.url} alt={blog.title} style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />
          )}
          <h1 style={{ margin: '0 0 8px 0' }}>{blog.title}</h1>
          <div style={{ color: theme.colors.adminTextMuted, fontSize: '13px', marginBottom: '20px' }}>
            By {blog.author} {blog.publishedAt ? `· ${new Date(blog.publishedAt).toLocaleDateString()}` : ''}
          </div>
          <div
            style={{ lineHeight: 1.7, color: theme.colors.adminText }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </div>
  );
};