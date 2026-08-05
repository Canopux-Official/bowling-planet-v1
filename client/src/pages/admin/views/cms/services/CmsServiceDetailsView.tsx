import React, { useState, useEffect } from 'react';
import { serviceDetailApi, type IServiceDetail } from '../../../../../services/serviceDetailApi';
import { theme } from '../../../../../theme';
import { Loader2, Plus, Trash2, Edit2, Check, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../../../components/Toast';

export default function CmsServiceDetailsView() {
  const [details, setDetails] = useState<IServiceDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await serviceDetailApi.getAll();
      setDetails(data);
    } catch (error) {
      showToast('error', 'Failed to load service pages');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    const newPage: IServiceDetail = {
      slug: `new-service-page-${Date.now()}`,
      seo: { title: 'New Service Page', description: '' },
      header: {
        subtitle: 'New Category',
        title: 'New Service Title',
        accentColor: '#5FC1D1',
        leadId: 'new-service'
      },
      hero: {
        missionText: 'Your mission statement here.',
        timelineTitle: 'Engagement Lifecycle'
      },
      timeline: [
        { phase: 'Phase 1', label: 'Assessment', iconName: 'Settings', color: '#5FC1D1' }
      ],
      metrics: [
        { target: 100, suffix: '+', label: 'Metric 1', color: '#5FC1D1' }
      ],
      features: [
        { title: 'Feature 1', short: 'Description', iconName: 'CheckCircle' }
      ],
      gallery: [
        { title: 'Gallery Item 1', tag: 'Tag' }
      ],
      crossLink: {
        text: 'Explore our other core service offering',
        buttonText: 'Other Service',
        buttonLink: '/services'
      }
    };
    setDetails([...details, newPage]);
    setEditingId(newPage.slug);
  };

  const handleSave = async (detail: IServiceDetail) => {
    try {
      setSaving(true);
      if (detail._id) {
        await serviceDetailApi.update(detail._id, detail);
        showToast('success', 'Service page updated successfully');
      } else {
        const created = await serviceDetailApi.create(detail);
        setDetails(details.map(d => d.slug === detail.slug ? created : d));
        showToast('success', 'Service page created successfully');
      }
      setEditingId(null);
      fetchDetails();
    } catch (error: any) {
      console.error('Failed to save service page:', error);
      showToast('error', error.response?.data?.message || 'Failed to save service page');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!window.confirm('Are you sure you want to delete this service page? This action cannot be undone.')) return;
    try {
      if (id) {
        await serviceDetailApi.delete(id);
      }
      setDetails(details.filter(d => d.slug !== slug));
      showToast('success', 'Service page deleted successfully');
    } catch (error) {
      console.error('Failed to delete service page:', error);
      showToast('error', 'Failed to delete service page');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: theme.colors.text2 }}>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.colors.prussianBlue, marginBottom: 4 }}>Service Inside Pages</h1>
          <p style={{ color: theme.colors.adminTextMuted, fontSize: 14 }}>Manage individual service pages mapped by slug (e.g., /services/your-slug)</p>
        </div>
        <button
          onClick={handleAddNew}
          disabled={editingId !== null}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            backgroundColor: theme.colors.adminAccent, color: 'white',
            padding: '10px 16px', borderRadius: 8,
            fontSize: 14, fontWeight: 600, border: 'none',
            cursor: editingId ? 'not-allowed' : 'pointer', opacity: editingId ? 0.5 : 1
          }}
        >
          <Plus size={16} /> Add New Page
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {details.map((detail) => (
          <ServiceDetailEditor
            key={detail._id || detail.slug}
            initialData={detail}
            isEditing={editingId === (detail._id || detail.slug)}
            onEdit={() => setEditingId(detail._id || detail.slug)}
            onSave={handleSave}
            onCancel={() => {
              if (!detail._id) {
                setDetails(details.filter(d => d.slug !== detail.slug));
              }
              setEditingId(null);
            }}
            onDelete={() => handleDelete(detail._id!, detail.slug)}
            saving={saving}
          />
        ))}
        {details.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, background: 'white', borderRadius: 12, border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminTextMuted }}>
            No service pages found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Component: ServiceDetailEditor
// ---------------------------------------------------------
function ServiceDetailEditor({
  initialData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  saving
}: {
  initialData: IServiceDetail;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: IServiceDetail) => void;
  onCancel: () => void;
  onDelete: () => void;
  saving: boolean;
}) {
  const [data, setData] = useState<IServiceDetail>(initialData);

  // Sync state if editing is cancelled/toggled
  useEffect(() => {
    setData(initialData);
  }, [initialData, isEditing]);

  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const ImageUploader = ({ 
    image, 
    onChange, 
    onRemove 
  }: { 
    image: any, 
    onChange: (file: File) => void, 
    onRemove: () => void 
  }) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {image?.url ? (
        <div style={{ position: 'relative', width: 80, height: 80, borderRadius: 8, overflow: 'hidden', border: `1px solid ${theme.colors.adminBorder}` }}>
          <img src={image.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {isEditing && (
            <button
              onClick={onRemove}
              style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(239,68,68,0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={12} />
            </button>
          )}
        </div>
      ) : (
        <div style={{ width: 80, height: 80, borderRadius: 8, border: `1px dashed ${theme.colors.adminBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.colors.adminTextMuted }}>
          <ImageIcon size={24} />
        </div>
      )}
      {isEditing && (
        <label style={{
          padding: '6px 12px', background: theme.colors.adminBg, border: `1px solid ${theme.colors.adminBorder}`,
          borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', color: theme.colors.prussianBlue
        }}>
          Upload Image
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
            if (e.target.files && e.target.files[0]) onChange(e.target.files[0]);
          }} />
        </label>
      )}
    </div>
  );

  const containerStyle: React.CSSProperties = {
    background: 'white', borderRadius: 12, border: `1px solid ${isEditing ? theme.colors.adminAccent : theme.colors.adminBorder}`,
    overflow: 'hidden', transition: 'all 0.2s', boxShadow: isEditing ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
  };
  
  const headerStyle: React.CSSProperties = {
    padding: '16px 20px', borderBottom: `1px solid ${theme.colors.adminBorder}`,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: isEditing ? '#f8fafc' : 'white'
  };

  const contentStyle: React.CSSProperties = {
    padding: 20, display: 'flex', flexDirection: 'column', gap: 24
  };

  const sectionStyle: React.CSSProperties = {
    padding: 16, background: theme.colors.adminBg, borderRadius: 8, border: `1px solid ${theme.colors.adminBorder}`
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 14, fontWeight: 700, color: theme.colors.prussianBlue, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: 6, fontSize: 14, marginTop: 4, color: '#000'
  };
  
  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: theme.colors.text2, display: 'block'
  };

  const renderField = (label: string, value: string, onChange: (val: string) => void, type = "text") => (
    <div style={{ flex: 1, minWidth: 200 }}>
      <label style={labelStyle}>{label}</label>
      {isEditing ? (
        <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      ) : (
        <div style={{ fontSize: 14, color: theme.colors.prussianBlue, marginTop: 4 }}>{value || '-'}</div>
      )}
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.colors.prussianBlue, margin: 0 }}>
            {data.header.title || 'Untitled Service'}
          </h3>
          <p style={{ fontSize: 13, color: theme.colors.adminTextMuted, margin: '4px 0 0 0' }}>
            Slug: <span style={{ fontFamily: 'monospace' }}>{data.slug}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {isEditing ? (
            <>
              <button
                onClick={onCancel}
                disabled={saving}
                style={{ padding: '6px 12px', background: 'transparent', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(data)}
                disabled={saving}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: theme.colors.adminAccent, color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: theme.colors.adminBg, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
              >
                <Edit2 size={14} /> Edit
              </button>
              <button
                onClick={onDelete}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </>
          )}
        </div>
      </div>

      {(isEditing || data) && (
        <div style={contentStyle}>
          {/* Core Info & SEO */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>General & SEO</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {renderField('Page Slug (URL)', data.slug, (val) => setData({ ...data, slug: val }))}
              {renderField('SEO Title', data.seo.title, (val) => setData({ ...data, seo: { ...data.seo, title: val } }))}
              <div style={{ width: '100%' }}>
                <label style={labelStyle}>SEO Description</label>
                {isEditing ? (
                  <textarea value={data.seo.description} onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })} style={{ ...inputStyle, minHeight: 60 }} />
                ) : (
                  <div style={{ fontSize: 14, color: theme.colors.prussianBlue, marginTop: 4 }}>{data.seo.description || '-'}</div>
                )}
              </div>
            </div>
          </div>

          {/* Header */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Header Section</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
              {renderField('Subtitle', data.header.subtitle, (val) => setData({ ...data, header: { ...data.header, subtitle: val } }))}
              {renderField('Title', data.header.title, (val) => setData({ ...data, header: { ...data.header, title: val } }))}
              {renderField('Accent Color (Hex)', data.header.accentColor, (val) => setData({ ...data, header: { ...data.header, accentColor: val } }))}
              {renderField('Lead Tracker ID', data.header.leadId, (val) => setData({ ...data, header: { ...data.header, leadId: val } }))}
            </div>
            <div>
              <label style={labelStyle}>Header Background Image</label>
              <div style={{ marginTop: 8 }}>
                <ImageUploader 
                  image={data.header.image} 
                  onChange={(file) => handleImageUpload(file, (base64) => setData({ ...data, header: { ...data.header, image: { url: base64, public_id: '' } } }))}
                  onRemove={() => setData({ ...data, header: { ...data.header, image: undefined } })}
                />
              </div>
            </div>
          </div>

          {/* Hero */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Hero Section</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
              {renderField('Mission Text', data.hero.missionText, (val) => setData({ ...data, hero: { ...data.hero, missionText: val } }))}
              {renderField('Timeline Title', data.hero.timelineTitle, (val) => setData({ ...data, hero: { ...data.hero, timelineTitle: val } }))}
            </div>
            <div>
              <label style={labelStyle}>Hero Image (60% width)</label>
              <div style={{ marginTop: 8 }}>
                <ImageUploader 
                  image={data.hero.image} 
                  onChange={(file) => handleImageUpload(file, (base64) => setData({ ...data, hero: { ...data.hero, image: { url: base64, public_id: '' } } }))}
                  onRemove={() => setData({ ...data, hero: { ...data.hero, image: undefined } })}
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={sectionTitleStyle}>Timeline / Stages (40% width)</div>
              {isEditing && (
                <button onClick={() => setData({ ...data, timeline: [...data.timeline, { phase: '', label: '', iconName: 'Circle', color: '#5FC1D1' }] })} style={{ background: 'none', border: 'none', color: theme.colors.adminAccent, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Plus size={14} /> Add Stage
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.timeline.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-end', background: 'white', padding: 12, borderRadius: 8, border: `1px solid ${theme.colors.adminBorder}` }}>
                  {renderField('Phase (e.g. Week 1)', t.phase, (val) => { const nt = [...data.timeline]; nt[i] = { ...nt[i], phase: val }; setData({ ...data, timeline: nt }); })}
                  {renderField('Label', t.label, (val) => { const nt = [...data.timeline]; nt[i] = { ...nt[i], label: val }; setData({ ...data, timeline: nt }); })}
                  {renderField('Icon Name (Lucide)', t.iconName, (val) => { const nt = [...data.timeline]; nt[i] = { ...nt[i], iconName: val }; setData({ ...data, timeline: nt }); })}
                  {renderField('Color', t.color, (val) => { const nt = [...data.timeline]; nt[i] = { ...nt[i], color: val }; setData({ ...data, timeline: nt }); })}
                  {isEditing && (
                    <button onClick={() => { const nt = [...data.timeline]; nt.splice(i, 1); setData({ ...data, timeline: nt }); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 8 }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Impact Metrics (3 items recommended)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.metrics.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'white', padding: 16, borderRadius: 8, border: `1px solid ${theme.colors.adminBorder}` }}>
                  <div>
                    <label style={labelStyle}>Background Image</label>
                    <div style={{ marginTop: 8 }}>
                      <ImageUploader 
                        image={m.image} 
                        onChange={(file) => handleImageUpload(file, (base64) => { const nm = [...data.metrics]; nm[i] = { ...nm[i], image: { url: base64, public_id: '' } }; setData({ ...data, metrics: nm }); })}
                        onRemove={() => { const nm = [...data.metrics]; nm[i] = { ...nm[i], image: undefined }; setData({ ...data, metrics: nm }); }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, flex: 1 }}>
                    {renderField('Target (Number)', m.target.toString(), (val) => { const nm = [...data.metrics]; nm[i] = { ...nm[i], target: Number(val) }; setData({ ...data, metrics: nm }); }, 'number')}
                    {renderField('Suffix (e.g. % or +)', m.suffix, (val) => { const nm = [...data.metrics]; nm[i] = { ...nm[i], suffix: val }; setData({ ...data, metrics: nm }); })}
                    {renderField('Label', m.label, (val) => { const nm = [...data.metrics]; nm[i] = { ...nm[i], label: val }; setData({ ...data, metrics: nm }); })}
                    {renderField('Accent Color', m.color, (val) => { const nm = [...data.metrics]; nm[i] = { ...nm[i], color: val }; setData({ ...data, metrics: nm }); })}
                  </div>
                  {isEditing && (
                    <button onClick={() => { const nm = [...data.metrics]; nm.splice(i, 1); setData({ ...data, metrics: nm }); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 8 }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && data.metrics.length < 3 && (
                <button onClick={() => setData({ ...data, metrics: [...data.metrics, { target: 100, suffix: '+', label: '', color: '#5FC1D1' }] })} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: theme.colors.adminAccent, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Plus size={14} /> Add Metric
                </button>
              )}
            </div>
          </div>

          {/* Features / Scope */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={sectionTitleStyle}>Scope of Work / Checklist</div>
              {isEditing && (
                <button onClick={() => setData({ ...data, features: [...data.features, { title: '', short: '', iconName: 'Circle' }] })} style={{ background: 'none', border: 'none', color: theme.colors.adminAccent, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Plus size={14} /> Add Feature
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'white', padding: 16, borderRadius: 8, border: `1px solid ${theme.colors.adminBorder}` }}>
                  <div>
                    <label style={labelStyle}>Preview Image</label>
                    <div style={{ marginTop: 8 }}>
                      <ImageUploader 
                        image={f.image} 
                        onChange={(file) => handleImageUpload(file, (base64) => { const nf = [...data.features]; nf[i] = { ...nf[i], image: { url: base64, public_id: '' } }; setData({ ...data, features: nf }); })}
                        onRemove={() => { const nf = [...data.features]; nf[i] = { ...nf[i], image: undefined }; setData({ ...data, features: nf }); }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, flex: 1 }}>
                    {renderField('Title', f.title, (val) => { const nf = [...data.features]; nf[i] = { ...nf[i], title: val }; setData({ ...data, features: nf }); })}
                    {renderField('Short Description', f.short, (val) => { const nf = [...data.features]; nf[i] = { ...nf[i], short: val }; setData({ ...data, features: nf }); })}
                    {renderField('Icon Name (Lucide)', f.iconName, (val) => { const nf = [...data.features]; nf[i] = { ...nf[i], iconName: val }; setData({ ...data, features: nf }); })}
                  </div>
                  {isEditing && (
                    <button onClick={() => { const nf = [...data.features]; nf.splice(i, 1); setData({ ...data, features: nf }); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 8 }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={sectionTitleStyle}>Bento Gallery (Max 4 recommended)</div>
              {isEditing && (
                <button onClick={() => setData({ ...data, gallery: [...data.gallery, { title: '', tag: '' }] })} style={{ background: 'none', border: 'none', color: theme.colors.adminAccent, cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Plus size={14} /> Add Gallery Image
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.gallery.map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'white', padding: 16, borderRadius: 8, border: `1px solid ${theme.colors.adminBorder}` }}>
                  <div>
                    <label style={labelStyle}>Image</label>
                    <div style={{ marginTop: 8 }}>
                      <ImageUploader 
                        image={g.image} 
                        onChange={(file) => handleImageUpload(file, (base64) => { const ng = [...data.gallery]; ng[i] = { ...ng[i], image: { url: base64, public_id: '' } }; setData({ ...data, gallery: ng }); })}
                        onRemove={() => { const ng = [...data.gallery]; ng[i] = { ...ng[i], image: undefined }; setData({ ...data, gallery: ng }); }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, flex: 1 }}>
                    {renderField('Title (Bottom Text)', g.title, (val) => { const ng = [...data.gallery]; ng[i] = { ...ng[i], title: val }; setData({ ...data, gallery: ng }); })}
                    {renderField('Tag (Optional Top Text)', g.tag || '', (val) => { const ng = [...data.gallery]; ng[i] = { ...ng[i], tag: val }; setData({ ...data, gallery: ng }); })}
                  </div>
                  {isEditing && (
                    <button onClick={() => { const ng = [...data.gallery]; ng.splice(i, 1); setData({ ...data, gallery: ng }); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 8 }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cross Link */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Bottom Cross Link</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {renderField('Description Text', data.crossLink?.text || '', (val) => setData({ ...data, crossLink: { ...data.crossLink, text: val } }))}
              {renderField('Button Text', data.crossLink?.buttonText || '', (val) => setData({ ...data, crossLink: { ...data.crossLink, buttonText: val } }))}
              {renderField('Button Link (URL)', data.crossLink?.buttonLink || '', (val) => setData({ ...data, crossLink: { ...data.crossLink, buttonLink: val } }))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
