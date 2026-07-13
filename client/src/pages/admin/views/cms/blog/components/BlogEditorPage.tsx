import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';

import { blogService, type IBlog, type IMedia } from '../services';
import { RichTextEditor } from './RichTextEditor';
import { useToast } from '../../../../components/Toast';
import { theme } from '../../../../../../theme';


export const BlogEditorPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const [coverImage, setCoverImage] = useState<IMedia | null>(null);
    const [coverUploading, setCoverUploading] = useState(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                // getBySlug only returns published posts; for admin edit by id,
                // fall back to filtering the admin list. Swap this for a
                // dedicated GET /admin/blogs/:id endpoint if you add one later.
                const res = await blogService.getAllAdmin({ limit: 100 });
                const blog = res.data.find((b) => b._id === id);
                if (!blog) throw new Error('Blog not found');
                setTitle(blog.title);
                setExcerpt(blog.excerpt || '');
                setContent(blog.content);
                setAuthor(blog.author);
                setTagsInput(blog.tags.join(', '));
                setIsPublished(blog.isPublished);
                setCoverImage(blog.coverImage || null);
            } catch (err: any) {
                showToast('error', err.message || 'Failed to load blog');
                navigate('/admin/cms/blog');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverUploading(true);
        try {
            const res = await blogService.uploadImage(file);
            setCoverImage({ ...res.data, type: 'image' }); // ensure `type` is always present
        } catch (err: any) {
            showToast('error', err.message || 'Failed to upload cover image');
        } finally {
            setCoverUploading(false);
            e.target.value = '';
        }
    };

    const handleSave = async (publishOverride?: boolean) => {
        if (!title.trim()) { setError('Title is required'); return; }
        if (!content.trim() || content === '<p></p>') { setError('Content cannot be empty'); return; }

        setSaving(true);
        setError('');

        const payload: Partial<IBlog> = {
            title,
            excerpt: excerpt.slice(0, 300),
            content,
            author: author || undefined,
            tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
            coverImage: coverImage || undefined,
            isPublished: publishOverride !== undefined ? publishOverride : isPublished,
        };

        try {
            if (isEdit && id) {
                await blogService.update(id, payload);
                showToast('success', 'Blog updated successfully');
            } else {
                await blogService.create(payload);
                showToast('success', 'Blog created successfully');
            }
            navigate('/admin/cms/blog');
        } catch (err: any) {
            const msg = err.message || 'Failed to save blog';
            setError(msg);
            showToast('error', msg);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ color: theme.colors.adminTextMuted, padding: '32px' }}>Loading...</div>;

    return (
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <button onClick={() => navigate('/admin/cms/blog')} style={backBtnStyle}><ArrowLeft size={18} /></button>
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>
                    {isEdit ? 'Edit Blog Post' : 'New Blog Post'}
                </h1>
            </div>

            {error && <div style={{ color: '#ff4d4d', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Blog title"
                    style={{ ...inputStyle, fontSize: '22px', fontWeight: 700, padding: '10px 0', border: 'none', backgroundColor: 'transparent' }}
                />

                {/* Cover image */}
                <div>
                    <label style={labelStyle}>Cover Image</label>
                    {coverImage ? (
                        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                            <img src={coverImage.url} alt="Cover" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                            <button type="button" onClick={() => setCoverImage(null)} style={removeCoverBtnStyle}><X size={14} /></button>
                        </div>
                    ) : (
                        <label style={uploadAreaStyle}>
                            {coverUploading ? 'Uploading...' : <><Upload size={16} /> Upload Cover Image</>}
                            <input type="file" accept="image/*" onChange={handleCoverUpload} style={{ display: 'none' }} disabled={coverUploading} />
                        </label>
                    )}
                </div>

                <div>
                    <label style={labelStyle}>Excerpt <span style={{ fontWeight: 400 }}>({excerpt.length}/300)</span></label>
                    <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value.slice(0, 300))} rows={2} placeholder="Short summary shown in blog listings" style={inputStyle} />
                </div>

                <div style={rowStyle}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Author</label>
                        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Bowling Planet Team" style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Tags (comma separated)</label>
                        <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="tips, news" style={inputStyle} />
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Content</label>
                    <RichTextEditor content={content} onChange={setContent} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingBottom: '40px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.colors.adminText, cursor: 'pointer' }}>
                        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                        Published
                    </label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="button" onClick={() => navigate('/admin/cms/blog')} disabled={saving} style={cancelBtnStyle}>Cancel</button>
                        <button type="button" onClick={() => handleSave(false)} disabled={saving} style={draftBtnStyle}>{saving ? 'Saving...' : 'Save Draft'}</button>
                        <button type="button" onClick={() => handleSave(true)} disabled={saving} style={saveBtnStyle}>{saving ? 'Publishing...' : 'Publish'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const backBtnStyle: React.CSSProperties = { background: 'none', border: '1px solid ' + theme.colors.adminBorder, borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.adminText };
const labelStyle: React.CSSProperties = { display: 'block', color: theme.colors.adminText, marginBottom: '6px', fontSize: '14px', fontWeight: 600 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.1)', border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminText, outline: 'none', boxSizing: 'border-box', fontSize: '14px' };
const rowStyle: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' };
const uploadAreaStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: '8px', border: `1px dashed ${theme.colors.adminBorder}`, padding: '14px 20px', borderRadius: '8px', cursor: 'pointer', color: theme.colors.adminTextMuted, fontSize: '14px' };
const removeCoverBtnStyle: React.CSSProperties = { position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', padding: '6px' };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px' };
const draftBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px', fontWeight: 600 };
const saveBtnStyle: React.CSSProperties = { padding: '10px 18px', border: 'none', backgroundColor: '#3b82f6', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' };
