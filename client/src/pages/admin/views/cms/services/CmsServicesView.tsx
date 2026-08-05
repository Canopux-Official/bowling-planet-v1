import React, { useState, useEffect } from 'react';
import { theme } from '../../../../../theme';
import {
  ArrowLeft, Plus, Trash2, Save, Loader2, Edit2, X,
  CheckCircle2, AlertCircle, Layout, Layers, Image as ImageIcon, PieChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { servicesPageApi, type ServicesPageData } from '../../../../../services/servicesPageApi';
import { useQueryClient } from '@tanstack/react-query';

// ─── Style Constants ─────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  backgroundColor: theme.colors.adminSurface,
  borderRadius: '16px',
  border: `1px solid ${theme.colors.adminBorder}`,
  padding: '28px 32px',
  marginBottom: '20px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  backgroundColor: '#F8FAFC',
  border: `1.5px solid ${theme.colors.adminBorder}`,
  borderRadius: '8px',
  color: theme.colors.adminText,
  fontSize: '14px',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  color: theme.colors.adminTextMuted,
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const deleteBtn: React.CSSProperties = {
  background: 'rgba(239,68,68,0.07)',
  border: 'none',
  color: theme.colors.adminDanger,
  cursor: 'pointer',
  padding: '0 12px',
  borderRadius: '8px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const addRowBtn: React.CSSProperties = {
  background: 'none',
  border: `1.5px dashed ${theme.colors.adminBorder}`,
  color: theme.colors.prussianBlue,
  padding: '10px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  justifyContent: 'center',
  fontWeight: 600,
  fontSize: '14px',
  marginTop: '8px',
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
}> = ({ icon, title, subtitle, badge }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${theme.colors.adminBorder}` }}>
    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
      <div style={{
        width: 44, height: 44, borderRadius: '12px',
        backgroundColor: '#F1F5F9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: theme.colors.adminText }}>{title}</h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: theme.colors.adminTextMuted }}>{subtitle}</p>
      </div>
    </div>
    {badge && (
      <span style={{
        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.05em', padding: '4px 10px', borderRadius: '100px',
        backgroundColor: 'rgba(95,193,209,0.1)', color: '#0E7490',
        border: '1px solid rgba(95,193,209,0.25)', alignSelf: 'center',
      }}>
        {badge}
      </span>
    )}
  </div>
);

export const CmsServicesView: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState<ServicesPageData | null>(null);
  const [liveData, setLiveData] = useState<ServicesPageData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'processSteps' | 'gallery' | 'results'>('services');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [filesToUpload, setFilesToUpload] = useState<{ [key: string]: File }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await servicesPageApi.getServicesPageData();
      if (response) {
        setData(response);
        setLiveData(response);
      } else {
        // Initialize empty data if not exists
        const emptyData: ServicesPageData = { services: [], processSteps: [], galleryImages: [], results: [] };
        setData(emptyData);
        setLiveData(emptyData);
      }
    } catch (error) {
      console.error('Failed to fetch services page data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const response = await servicesPageApi.updateServicesPageData(data, filesToUpload);
      if (response.success && response.data) {
        setData(response.data);
        setLiveData(response.data);
        setFilesToUpload({});
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ['cms-services-page'] });
        showToast('Services page updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      showToast('Failed to save changes. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFilesToUpload({});
    if (liveData) setData(JSON.parse(JSON.stringify(liveData))); // deep copy to restore
  };

  const handleFileChange = (fileKey: string, file: File | null) => {
    setFilesToUpload(prev => {
      const newFiles = { ...prev };
      if (file) {
        newFiles[fileKey] = file;
      } else {
        delete newFiles[fileKey];
      }
      return newFiles;
    });
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 16 }}>
        <Loader2 size={36} color={theme.colors.prussianBlue} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ color: theme.colors.adminTextMuted, fontSize: 15 }}>Loading Services CMS…</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!data) return <div style={{ padding: 32, color: 'red' }}>Error loading data.</div>;

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    background: isActive ? '#F1F5F9' : 'transparent',
    color: isActive ? theme.colors.prussianBlue : theme.colors.adminTextMuted,
    borderBottom: `2px solid ${isActive ? theme.colors.prussianBlue : 'transparent'}`,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    userSelect: 'none',
  });

  return (
    <div style={{ paddingBottom: 100, maxWidth: 1100 }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 20px', borderRadius: 12, maxWidth: 380,
          backgroundColor: toast.type === 'success' ? '#ECFDF5' : '#FEF2F2',
          border: `1px solid ${toast.type === 'success' ? '#A7F3D0' : '#FECACA'}`,
          color: toast.type === 'success' ? '#065F46' : '#991B1B',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          fontWeight: 500, fontSize: 14,
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={18} color="#059669" /> : <AlertCircle size={18} color="#DC2626" />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => navigate('/admin/cms')}
            style={{
              background: theme.colors.adminSurface,
              border: `1px solid ${theme.colors.adminBorder}`,
              borderRadius: 10, padding: '9px 10px', cursor: 'pointer',
              color: theme.colors.adminText, display: 'flex',
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: theme.colors.adminText, margin: 0, letterSpacing: '-0.4px' }}>
              Manage Services
            </h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0', fontSize: 14 }}>
              Add, edit, or remove services from the website.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {isEditing ? (
            <>
              <button onClick={handleCancel} style={{
                padding: '10px 20px', borderRadius: 9, border: `1px solid ${theme.colors.adminBorder}`,
                backgroundColor: theme.colors.adminSurface, color: theme.colors.adminText,
                cursor: 'pointer', fontWeight: 600, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <X size={16} /> Cancel
              </button>
              <button onClick={handleSave} disabled={isSaving} style={{
                padding: '10px 22px', borderRadius: 9, border: 'none',
                backgroundColor: theme.colors.prussianBlue, color: '#fff',
                cursor: isSaving ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 8,
                opacity: isSaving ? 0.75 : 1,
                boxShadow: '0 4px 12px rgba(3,13,26,0.15)',
              }}>
                {isSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                {isSaving ? 'Saving…' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} style={{
              padding: '10px 22px', borderRadius: 9, border: 'none',
              backgroundColor: theme.colors.prussianBlue, color: '#fff',
              cursor: 'pointer', fontWeight: 700, fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 12px rgba(3,13,26,0.15)',
            }}>
              <Edit2 size={16} /> Edit Page
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${theme.colors.adminBorder}`, marginBottom: 24 }}>
        <div onClick={() => setActiveTab('services')} style={tabStyle(activeTab === 'services')}>
          <Layout size={16} /> Services
        </div>
        <div onClick={() => setActiveTab('processSteps')} style={tabStyle(activeTab === 'processSteps')}>
          <Layers size={16} /> Process Steps
        </div>
        <div onClick={() => setActiveTab('gallery')} style={tabStyle(activeTab === 'gallery')}>
          <ImageIcon size={16} /> Gallery
        </div>
        <div onClick={() => setActiveTab('results')} style={tabStyle(activeTab === 'results')}>
          <PieChart size={16} /> Results
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'services' && <ServicesEditor data={data} setData={setData} isEditing={isEditing} filesToUpload={filesToUpload} handleFileChange={handleFileChange} />}
      {activeTab === 'processSteps' && <ProcessStepsEditor data={data} setData={setData} isEditing={isEditing} />}
      {activeTab === 'gallery' && <GalleryEditor data={data} setData={setData} isEditing={isEditing} handleFileChange={handleFileChange} />}
      {activeTab === 'results' && <ResultsEditor data={data} setData={setData} isEditing={isEditing} handleFileChange={handleFileChange} />}

      {/* Sticky Save Bar */}
      {isEditing && (
        <div style={{
          position: 'sticky', bottom: 24,
          display: 'flex', justifyContent: 'flex-end', gap: 12,
          backgroundColor: 'rgba(244,246,249,0.92)',
          backdropFilter: 'blur(8px)',
          padding: '16px 24px',
          borderRadius: 14,
          border: `1px solid ${theme.colors.adminBorder}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}>
          <button onClick={handleCancel} style={{
            padding: '10px 20px', borderRadius: 9, border: `1px solid ${theme.colors.adminBorder}`,
            backgroundColor: theme.colors.adminSurface, color: theme.colors.adminText,
            cursor: 'pointer', fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <X size={16} /> Cancel
          </button>
          <button onClick={handleSave} disabled={isSaving} style={{
            padding: '10px 24px', borderRadius: 9, border: 'none',
            backgroundColor: theme.colors.prussianBlue, color: '#fff',
            cursor: isSaving ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: isSaving ? 0.75 : 1,
            boxShadow: '0 4px 12px rgba(3,13,26,0.15)',
          }}>
            {isSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
            {isSaving ? 'Saving…' : 'Save All Changes'}
          </button>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// SERVICES TAB
// ──────────────────────────────────────────────────────────────────────────────

const ServicesEditor = ({ data, setData, isEditing, filesToUpload, handleFileChange }: any) => {
  const addService = () => {
    const newService = { tag: 'New', title: 'New Service', subtitle: 'Description', accentColor: '#5FC1D1', stats: [], features: [] };
    setData({ ...data, services: [...(data.services || []), newService] });
  };

  const removeService = (index: number) => {
    const n = [...data.services];
    n.splice(index, 1);
    setData({ ...data, services: n });
  };

  const updateService = (index: number, field: string, value: any) => {
    const n = [...data.services];
    n[index] = { ...n[index], [field]: value };
    setData({ ...data, services: n });
  };

  return (
    <div style={card}>
      <SectionHeader
        icon={<Layout size={20} color={theme.colors.prussianBlue} />}
        title="Services"
        subtitle="Manage the core services provided."
        badge={`${data.services?.length || 0} items`}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {data.services?.map((svc: any, i: number) => (
          <div key={i} style={{ border: `1.5px solid ${theme.colors.adminBorder}`, borderRadius: 12, padding: 20, position: 'relative' }}>
            {isEditing && (
              <button onClick={() => removeService(i)} style={{ ...deleteBtn, position: 'absolute', top: 16, right: 16, height: 32, padding: '0 8px' }}>
                <Trash2 size={16} />
              </button>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingRight: isEditing ? 40 : 0 }}>
              <div>
                <label style={labelStyle}>Title</label>
                {isEditing ? <input value={svc.title} onChange={e => updateService(i, 'title', e.target.value)} style={inputStyle} /> : <div style={{ fontSize: 14, fontWeight: 600 }}>{svc.title}</div>}
              </div>
              <div>
                <label style={labelStyle}>Tag</label>
                {isEditing ? <input value={svc.tag} onChange={e => updateService(i, 'tag', e.target.value)} style={inputStyle} /> : <div style={{ fontSize: 14 }}>{svc.tag}</div>}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Subtitle</label>
                {isEditing ? <input value={svc.subtitle} onChange={e => updateService(i, 'subtitle', e.target.value)} style={inputStyle} /> : <div style={{ fontSize: 14, color: theme.colors.adminTextMuted }}>{svc.subtitle}</div>}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Page Link / URL</label>
                {isEditing ? <input value={svc.link || ''} onChange={e => updateService(i, 'link', e.target.value)} style={inputStyle} placeholder="/services/your-page-slug or /contact" /> : <div style={{ fontSize: 14, color: theme.colors.prussianBlue }}>{svc.link || 'None'}</div>}
              </div>
              <div>
                <label style={labelStyle}>Accent Color</label>
                {isEditing ? (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="color" value={svc.accentColor} onChange={e => updateService(i, 'accentColor', e.target.value)} style={{ width: 40, height: 40, border: 'none', cursor: 'pointer', background: 'none' }} />
                    <input value={svc.accentColor} onChange={e => updateService(i, 'accentColor', e.target.value)} style={inputStyle} />
                  </div>
                ) : <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: '50%', background: svc.accentColor }}></div> {svc.accentColor}</div>}
              </div>
              <div>
                <label style={labelStyle}>Image</label>
                {isEditing ? (
                  <div>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(`serviceImage_${i}`, e.target.files?.[0] || null)} />
                    {filesToUpload[`serviceImage_${i}`] && <span style={{ fontSize: 12, color: 'green', marginLeft: 8 }}>Ready to upload</span>}
                  </div>
                ) : (
                  svc.image?.url ? <img src={svc.image.url} alt="Service" style={{ height: 40, borderRadius: 4 }} /> : <span style={{ fontSize: 12, color: theme.colors.adminTextMuted }}>No Image</span>
                )}
              </div>
            </div>

            {isEditing ? (
              <div style={{ gridColumn: '1 / -1', marginTop: 16 }}>
                <div style={{ display: 'flex', gap: 24 }}>
                  {/* Stats Editor */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label style={labelStyle}>Stats</label>
                      <button 
                        onClick={() => {
                          const newStats = [...(svc.stats || []), { label: 'New Stat', value: '0' }];
                          updateService(i, 'stats', newStats);
                        }}
                        style={{ ...addRowBtn, width: 'auto', padding: '4px 8px', marginTop: 0, fontSize: 12 }}
                      >
                        <Plus size={12} /> Add Stat
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(svc.stats || []).map((stat: any, si: number) => (
                        <div key={si} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <input 
                            placeholder="Value (e.g. 150+)"
                            value={stat.value} 
                            onChange={e => {
                              const newStats = [...svc.stats];
                              newStats[si] = { ...newStats[si], value: e.target.value };
                              updateService(i, 'stats', newStats);
                            }} 
                            style={{ ...inputStyle, flex: 1 }} 
                          />
                          <input 
                            placeholder="Label (e.g. Projects)"
                            value={stat.label} 
                            onChange={e => {
                              const newStats = [...svc.stats];
                              newStats[si] = { ...newStats[si], label: e.target.value };
                              updateService(i, 'stats', newStats);
                            }} 
                            style={{ ...inputStyle, flex: 2 }} 
                          />
                          <button 
                            onClick={() => {
                              const newStats = [...svc.stats];
                              newStats.splice(si, 1);
                              updateService(i, 'stats', newStats);
                            }}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features Editor */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label style={labelStyle}>Features</label>
                      <button 
                        onClick={() => {
                          const newFeatures = [...(svc.features || []), 'New Feature'];
                          updateService(i, 'features', newFeatures);
                        }}
                        style={{ ...addRowBtn, width: 'auto', padding: '4px 8px', marginTop: 0, fontSize: 12 }}
                      >
                        <Plus size={12} /> Add Feature
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {(svc.features || []).map((feat: string, fi: number) => (
                        <div key={fi} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <input 
                            placeholder="Feature name"
                            value={feat} 
                            onChange={e => {
                              const newFeatures = [...svc.features];
                              newFeatures[fi] = e.target.value;
                              updateService(i, 'features', newFeatures);
                            }} 
                            style={{ ...inputStyle, flex: 1 }} 
                          />
                          <button 
                            onClick={() => {
                              const newFeatures = [...svc.features];
                              newFeatures.splice(fi, 1);
                              updateService(i, 'features', newFeatures);
                            }}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ gridColumn: '1 / -1', marginTop: 16, display: 'flex', gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Stats</label>
                  {svc.stats?.length > 0 ? (
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      {svc.stats.map((stat: any, si: number) => (
                        <div key={si} style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: 4, fontSize: 13 }}>
                          <strong>{stat.value}</strong> <span style={{ color: theme.colors.adminTextMuted }}>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : <div style={{ fontSize: 13, color: theme.colors.adminTextMuted }}>No stats added</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Features</label>
                  {svc.features?.length > 0 ? (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {svc.features.map((feat: string, fi: number) => (
                        <div key={fi} style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: 4, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <CheckCircle2 size={12} color={svc.accentColor} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  ) : <div style={{ fontSize: 13, color: theme.colors.adminTextMuted }}>No features added</div>}
                </div>
              </div>
            )}          </div>
        ))}
      </div>

      {isEditing && (
        <button onClick={addService} style={addRowBtn}>
          <Plus size={16} /> Add Service
        </button>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// PROCESS STEPS TAB
// ──────────────────────────────────────────────────────────────────────────────

const ProcessStepsEditor = ({ data, setData, isEditing, handleFileChange }: any) => {
  const addStep = () => {
    setData({ ...data, processSteps: [...(data.processSteps || []), { num: '01', title: 'New Step', desc: 'Step details' }] });
  };

  const removeStep = (index: number) => {
    const n = [...data.processSteps];
    n.splice(index, 1);
    setData({ ...data, processSteps: n });
  };

  const updateStep = (index: number, field: string, value: string) => {
    const n = [...data.processSteps];
    n[index] = { ...n[index], [field]: value };
    setData({ ...data, processSteps: n });
  };

  return (
    <div style={card}>
      <SectionHeader icon={<Layers size={20} color={theme.colors.prussianBlue} />} title="Process Steps" subtitle="Manage step-by-step processes." badge={`${data.processSteps?.length || 0} steps`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.processSteps?.map((step: any, i: number) => (
          <div key={i} style={{ border: `1.5px solid ${theme.colors.adminBorder}`, borderRadius: 10, padding: '16px 20px', background: '#F8FAFC', position: 'relative' }}>
            {isEditing && <button onClick={() => removeStep(i)} style={{ ...deleteBtn, position: 'absolute', top: 12, right: 12, height: 32, padding: '0 8px' }}><Trash2 size={14} /></button>}
            <div style={{ paddingRight: isEditing ? 40 : 0 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 80 }}>
                  <label style={labelStyle}>Number</label>
                  {isEditing ? <input value={step.num} onChange={e => updateStep(i, 'num', e.target.value)} style={inputStyle} /> : <div style={{ fontWeight: 600, fontSize: 14 }}>{step.num}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Title</label>
                  {isEditing ? <input value={step.title} onChange={e => updateStep(i, 'title', e.target.value)} style={inputStyle} /> : <div style={{ fontWeight: 600, fontSize: 14 }}>{step.title}</div>}
                </div>
              </div>
              <label style={{ ...labelStyle, marginTop: 12 }}>Description</label>
              {isEditing ? <textarea value={step.desc} onChange={e => updateStep(i, 'desc', e.target.value)} style={{ ...inputStyle, minHeight: 60 }} /> : <div style={{ fontSize: 13, color: theme.colors.adminTextMuted }}>{step.desc}</div>}
              
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>Image</label>
                {isEditing ? (
                  <div>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(`processSteps_${i}`, e.target.files?.[0] || null)} />
                  </div>
                ) : (
                  step.image?.url ? <img src={step.image.url} alt="Step" style={{ height: 60, borderRadius: 6 }} /> : <span style={{ fontSize: 12, color: theme.colors.adminTextMuted }}>No Image</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isEditing && <button onClick={addStep} style={addRowBtn}><Plus size={16} /> Add Process Step</button>}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// GALLERY TAB
// ──────────────────────────────────────────────────────────────────────────────

const GalleryEditor = ({ data, setData, isEditing, handleFileChange }: any) => {
  const addImage = () => {
    setData({ ...data, galleryImages: [...(data.galleryImages || []), { label: 'New Image' }] });
  };

  const removeImage = (index: number) => {
    const n = [...data.galleryImages];
    n.splice(index, 1);
    setData({ ...data, galleryImages: n });
  };

  const updateImage = (index: number, field: string, value: string) => {
    const n = [...data.galleryImages];
    n[index] = { ...n[index], [field]: value };
    setData({ ...data, galleryImages: n });
  };

  return (
    <div style={card}>
      <SectionHeader icon={<ImageIcon size={20} color={theme.colors.prussianBlue} />} title="Gallery Images" subtitle="Manage gallery showcased on the services page." badge={`${data.galleryImages?.length || 0} images`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {data.galleryImages?.map((img: any, i: number) => (
          <div key={i} style={{ border: `1.5px solid ${theme.colors.adminBorder}`, borderRadius: 10, padding: 12, position: 'relative', background: '#F8FAFC' }}>
            {isEditing && <button onClick={() => removeImage(i)} style={{ ...deleteBtn, position: 'absolute', top: 8, right: 8, height: 28, padding: '0 6px' }}><Trash2 size={14} /></button>}
            <div style={{ marginBottom: 12, height: 100, backgroundColor: '#E2E8F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {img.image?.url ? <img src={img.image.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gallery" /> : <ImageIcon size={24} color="#94A3B8" />}
            </div>
            <label style={labelStyle}>Label</label>
            {isEditing ? <input value={img.label} onChange={e => updateImage(i, 'label', e.target.value)} style={inputStyle} /> : <div style={{ fontSize: 13 }}>{img.label}</div>}
            
            {isEditing && (
              <div style={{ marginTop: 12 }}>
                <input type="file" accept="image/*" onChange={e => handleFileChange(`galleryImage_${i}`, e.target.files?.[0] || null)} style={{ fontSize: 12, width: '100%' }} />
              </div>
            )}
          </div>
        ))}
      </div>
      {isEditing && <button onClick={addImage} style={addRowBtn}><Plus size={16} /> Add Gallery Image</button>}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// RESULTS TAB
// ──────────────────────────────────────────────────────────────────────────────

const ResultsEditor = ({ data, setData, isEditing, handleFileChange }: any) => {
  const addResult = () => {
    setData({ ...data, results: [...(data.results || []), { raw: 100, suffix: '+', label: 'New Metric', sublabel: 'Detail' }] });
  };

  const removeResult = (index: number) => {
    const n = [...(data.results || [])];
    n.splice(index, 1);
    setData({ ...data, results: n });
  };

  const updateResult = (index: number, field: string, value: any) => {
    const n = [...(data.results || [])];
    n[index] = { ...n[index], [field]: value };
    setData({ ...data, results: n });
  };

  return (
    <div style={card}>
      <SectionHeader icon={<PieChart size={20} color={theme.colors.prussianBlue} />} title="Results That Speak" subtitle="Manage impact metrics." badge={`${data.results?.length || 0} metrics`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
        {data.results?.map((res: any, i: number) => (
          <div key={i} style={{ border: `1.5px solid ${theme.colors.adminBorder}`, borderRadius: 10, padding: 16, position: 'relative', background: '#F8FAFC' }}>
            {isEditing && <button onClick={() => removeResult(i)} style={{ ...deleteBtn, position: 'absolute', top: 12, right: 12, height: 28, padding: '0 6px' }}><Trash2 size={14} /></button>}
            
            <div style={{ paddingRight: isEditing ? 32 : 0 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 80 }}>
                  <label style={labelStyle}>Number</label>
                  {isEditing ? <input type="number" value={res.raw} onChange={e => updateResult(i, 'raw', Number(e.target.value))} style={inputStyle} /> : <div style={{ fontSize: 16, fontWeight: 700 }}>{res.raw}</div>}
                </div>
                <div style={{ width: 60 }}>
                  <label style={labelStyle}>Suffix</label>
                  {isEditing ? <input value={res.suffix} onChange={e => updateResult(i, 'suffix', e.target.value)} style={inputStyle} /> : <div style={{ fontSize: 16, fontWeight: 700 }}>{res.suffix}</div>}
                </div>
              </div>
              <label style={labelStyle}>Label</label>
              {isEditing ? <input value={res.label} onChange={e => updateResult(i, 'label', e.target.value)} style={{ ...inputStyle, marginBottom: 12 }} /> : <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{res.label}</div>}
              <label style={labelStyle}>Sublabel</label>
              {isEditing ? <input value={res.sublabel} onChange={e => updateResult(i, 'sublabel', e.target.value)} style={inputStyle} /> : <div style={{ fontSize: 13, color: theme.colors.adminTextMuted }}>{res.sublabel}</div>}
              
              <div style={{ marginTop: 12, height: 80, backgroundColor: '#E2E8F0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {res.image?.url ? <img src={res.image.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Result background" /> : <ImageIcon size={24} color="#94A3B8" />}
              </div>
              <label style={{ ...labelStyle, marginTop: 12 }}>Background Image</label>
              {isEditing && (
                <div>
                  <input type="file" accept="image/*" onChange={e => handleFileChange(`results_${i}`, e.target.files?.[0] || null)} style={{ fontSize: 12, width: '100%' }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isEditing && <button onClick={addResult} style={addRowBtn}><Plus size={16} /> Add Metric</button>}
    </div>
  );
};

export default CmsServicesView;
