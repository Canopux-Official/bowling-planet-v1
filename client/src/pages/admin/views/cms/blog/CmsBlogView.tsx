import React, { useEffect, useState } from 'react';
import { theme } from '../../../../../theme';
import { ArrowLeft, Plus, Pencil, Trash2, Eye, Globe, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogService, type IBlog } from './services';
import { BlogPreviewModal } from './components/BlogPreviewModal';
import { useToast } from '../../../components/Toast';


export const CmsBlogView: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState<IBlog | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogService.getAllAdmin({ limit: 50 });
      setBlogs(res.data);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (blog: IBlog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    try {
      await blogService.delete(blog._id);
      showToast('success', 'Blog deleted successfully');
      fetchBlogs();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete blog');
    }
  };

  const handleTogglePublish = async (blog: IBlog) => {
    try {
      const res = await blogService.togglePublish(blog._id);
      showToast('success', res.data.isPublished ? 'Blog published' : 'Blog unpublished');
      fetchBlogs();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update publish status');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/admin/cms')} style={backBtnStyle}><ArrowLeft size={18} /></button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>Manage Blog</h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Write and publish insights, resources, and articles.</p>
          </div>
        </div>
        <button onClick={() => navigate('/admin/cms/blog/new')} style={createBtnStyle}>
          <Plus size={16} /> New Post
        </button>
      </div>

      {loading ? (
        <div style={emptyStateStyle}>Loading posts...</div>
      ) : blogs.length === 0 ? (
        <div style={emptyStateStyle}>No blog posts yet. Write your first one.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {blogs.map((b) => (
            <div key={b._id} style={rowCardStyle}>
              {b.coverImage?.url && (
                <img src={b.coverImage.url} alt={b.title} style={{ width: '80px', height: '56px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: 0, color: theme.colors.adminText, fontSize: '16px' }}>{b.title}</h3>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: b.isPublished ? '#10b981' : '#f59e0b' }}>
                    {b.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div style={{ color: theme.colors.adminTextMuted, fontSize: '13px', marginTop: '4px' }}>
                  By {b.author} {b.tags.length > 0 ? `· ${b.tags.join(', ')}` : ''}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleTogglePublish(b)} style={actionBtnStyle} title={b.isPublished ? 'Unpublish' : 'Publish'}>
                  {b.isPublished ? <EyeOff size={14} /> : <Globe size={14} />}
                </button>
                <button onClick={() => { setActiveBlog(b); setPreviewOpen(true); }} style={actionBtnStyle}><Eye size={14} /></button>
                <button onClick={() => navigate(`/admin/cms/blog/edit/${b._id}`)} style={actionBtnStyle}><Pencil size={14} /></button>
                <button onClick={() => handleDelete(b)} style={{ ...actionBtnStyle, color: '#ff4d4d' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BlogPreviewModal blog={activeBlog} isOpen={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
};

const backBtnStyle: React.CSSProperties = { background: 'none', border: '1px solid ' + theme.colors.adminBorder, borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.adminText };
const createBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer' };
const emptyStateStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, padding: '32px', textAlign: 'center', color: theme.colors.adminTextMuted };
const rowCardStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '10px', padding: '14px' };
const actionBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', background: 'none', color: theme.colors.adminText, cursor: 'pointer' };
