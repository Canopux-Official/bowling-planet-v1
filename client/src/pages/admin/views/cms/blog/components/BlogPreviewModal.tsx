import type { FC } from 'react';
import { X } from 'lucide-react';
import type { IBlog } from '../services';
import { theme } from '../../../../../../theme';

interface BlogPreviewModalProps {
  blog: IBlog | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogPreviewModal: FC<BlogPreviewModalProps> = ({ blog, isOpen, onClose }) => {
  if (!isOpen || !blog) return null;

  return (
    <>
      {/* Scope-injected styles targeting HTML rich text inside the modal wrapper */}
      <style>{`
        .preview-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
          background-color: rgba(0, 0, 0, 0.7);
        }

        .preview-modal-container {
          border-radius: 12px;
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .preview-modal-header {
          display: flex;
          justify-content: space-between;
          padding: 16px 20px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .preview-modal-status {
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .preview-modal-close {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .preview-modal-body {
          padding: 24px;
        }

        .preview-modal-cover {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .preview-modal-title {
          margin: 0 0 8px 0;
        }

        .preview-modal-meta {
          font-size: 13px;
          margin-bottom: 20px;
        }

        /* Core Article Styling Structures */
        .preview-article-engine {
          max-width: 820px;
          margin: 0 auto;
          font-size: 16px;
          line-height: 1.8;
        }

        .preview-article-engine p {
          margin: 0 0 16px;
        }

        .preview-article-engine p:last-child {
          margin-bottom: 0;
        }

        .preview-article-engine h2 {
          font-size: 28px;
          font-weight: 700;
          color: #F5F5F7;
          margin: 36px 0 16px;
          line-height: 1.3;
        }

        .preview-article-engine h3 {
          font-size: 21px;
          font-weight: 600;
          color: #F5F5F7;
          margin: 28px 0 12px;
          line-height: 1.3;
        }

        .preview-article-engine ul,
        .preview-article-engine ol {
          margin: 0 0 16px;
          padding-left: 24px;
        }

        .preview-article-engine li {
          margin-bottom: 8px;
        }

        .preview-article-engine li p {
          margin: 0;
        }

        .preview-article-engine ul {
          list-style-type: disc;
          list-style-position: outside;
        }

        .preview-article-engine ol {
          list-style-type: decimal;
          list-style-position: outside;
        }

        .preview-article-engine blockquote {
          border-left: 3px solid #3b82f6;
          margin: 24px 0;
          padding: 4px 0 4px 18px;
          color: #a3a3a3;
          font-style: italic;
        }

        .preview-article-engine pre {
          background-color: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 14px 18px;
          margin: 20px 0;
          overflow-x: auto;
          font-size: 14px;
        }

        .preview-article-engine code {
          background-color: #1a1a1a;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
        }

        .preview-article-engine a {
          color: #60a5fa;
          text-decoration: underline;
        }

        /* Image Alignments */
        .preview-article-engine img[data-align='left'] {
          float: left;
          margin: 4px 20px 12px 0;
          border-radius: 6px;
          max-width: 100%;
        }

        .preview-article-engine img[data-align='right'] {
          float: right;
          margin: 4px 0 12px 20px;
          border-radius: 6px;
          max-width: 100%;
        }

        .preview-article-engine img[data-align='none'],
        .preview-article-engine img:not([data-align]) {
          display: block;
          margin: 24px auto;
          border-radius: 6px;
          max-width: 100%;
        }

        .preview-article-engine h2,
        .preview-article-engine h3,
        .preview-article-engine ul,
        .preview-article-engine ol,
        .preview-article-engine blockquote,
        .preview-article-engine pre {
          clear: both;
        }

        .preview-article-engine::after {
          content: '';
          display: table;
          clear: both;
        }
      `}</style>

      <div className="preview-modal-overlay">
        <div 
          className="preview-modal-container"
          style={{ 
            backgroundColor: theme.colors.adminSurface, 
            border: `1px solid ${theme.colors.adminBorder}`,
            color: theme.colors.adminText 
          }}
        >
          {/* Header */}
          <div 
            className="preview-modal-header"
            style={{ 
              borderBottom: `1px solid ${theme.colors.adminBorder}`,
              backgroundColor: theme.colors.adminSurface 
            }}
          >
            <span 
              className="preview-modal-status"
              style={{ color: blog.isPublished ? '#10b981' : '#f59e0b' }}
            >
              {blog.isPublished ? 'Published' : 'Draft'}
            </span>
            <button 
              onClick={onClose} 
              className="preview-modal-close"
              style={{ color: theme.colors.adminText }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="preview-modal-body">
            {blog.coverImage?.url && (
              <img 
                src={blog.coverImage.url} 
                alt={blog.title} 
                className="preview-modal-cover" 
              />
            )}
            
            <h1 className="preview-modal-title">{blog.title}</h1>
            
            <div 
              className="preview-modal-meta"
              style={{ color: theme.colors.adminTextMuted }}
            >
              By {blog.author} {blog.publishedAt ? `· ${new Date(blog.publishedAt).toLocaleDateString()}` : ''}
            </div>

            {/* Injected HTML Engine */}
            <article
              className="preview-article-engine"
              style={{ color: theme.colors.adminText }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </div>
    </>
  );
};