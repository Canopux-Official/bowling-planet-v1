import React, { useState, useEffect } from 'react';
import { theme } from '../../../../../theme';
import {
  ArrowLeft, Plus, Trash2, Save, Loader2, Edit2, X,
  Activity, BarChart2, Star, Target, CheckCircle2, AlertCircle,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { homePageApi, type HomePageData } from '../../../../../services/homePageApi';
import { projectService, type IProject } from '../projects/services/index';

// ─── Style Constants (matching admin light theme) ────────────────────────────

const card: React.CSSProperties = {
  backgroundColor: theme.colors.adminSurface,
  borderRadius: '16px',
  border: `1px solid ${theme.colors.adminBorder}`,
  padding: '28px 32px',
  marginBottom: '20px',
};

const input: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  backgroundColor: '#F8FAFC',
  border: `1.5px solid ${theme.colors.adminBorder}`,
  borderRadius: '8px',
  color: theme.colors.adminText,
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const tagChip: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 14px',
  backgroundColor: '#F1F5F9',
  border: `1px solid rgba(3,13,26,0.1)`,
  borderRadius: '100px',
  color: theme.colors.prussianBlue,
  fontSize: '13px',
  fontWeight: 600,
};

const metricCard = (highlight = false): React.CSSProperties => ({
  backgroundColor: highlight ? 'rgba(95,193,209,0.06)' : '#F8FAFC',
  border: `1.5px solid ${highlight ? 'rgba(95,193,209,0.3)' : theme.colors.adminBorder}`,
  borderRadius: '12px',
  padding: '20px 24px',
  textAlign: 'center',
});

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

const deleteBtn: React.CSSProperties = {
  background: 'rgba(239,68,68,0.07)',
  border: 'none',
  color: theme.colors.adminDanger,
  cursor: 'pointer',
  padding: '0 14px',
  borderRadius: '8px',
  height: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const emptyData: HomePageData = {
  hero: { rotatingActivities: [] },
  stats: { yearsOfExperience: '', productsAndEquip: '', projectsDelivered: '', citiesServed: '' },
  trustedBrands: [],
  featuredProjects: { projectIds: [] },
  productInventory: { arcadeGamesCount: '', majorAttractionsCount: '', redemptionGamesCount: '' },
};

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
}> = ({ icon, title, subtitle, badge }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
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
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: theme.colors.adminText }}>{title}</h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: theme.colors.adminTextMuted }}>{subtitle}</p>
      </div>
    </div>
    {badge && (
      <span style={{
        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.05em', padding: '4px 10px', borderRadius: '100px',
        backgroundColor: '#F1F5F9', color: theme.colors.prussianBlue,
        border: '1px solid rgba(3,13,26,0.1)', alignSelf: 'center',
      }}>
        {badge}
      </span>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const CmsHomeView: React.FC = () => {
  const navigate = useNavigate();
  const [liveData, setLiveData] = useState<HomePageData>(emptyData);
  const [editData, setEditData] = useState<HomePageData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => { fetchData(); fetchProjects(); }, []);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await homePageApi.getHomePageData();
      if (res) {
        const pIds = (res.featuredProjects?.projectIds || []).map((p: any) =>
          typeof p === 'string' ? p : p._id
        );
        const formatted = { ...res, featuredProjects: { projectIds: pIds } };
        setLiveData(formatted);
        setEditData(formatted);
      }
    } catch (err) {
      showToast('Failed to load home page data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const response = await projectService.getAll({ page: 1, limit: 100 });
      if (response.success) setProjects(response.data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await homePageApi.updateHomePageData(editData);
      const pIds = (res.data?.featuredProjects?.projectIds || []).map((p: any) =>
        typeof p === 'string' ? p : p._id
      );
      const saved = { ...(res.data || editData), featuredProjects: { projectIds: pIds } };
      setLiveData(saved);
      setEditData(saved);
      setIsEditing(false);
      showToast('Home page updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to save changes. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => { setEditData(liveData); setIsEditing(false); };

  // ── Edit data handlers ───────────────────────────────────────────────────
  const setActivity = (i: number, v: string) => {
    const a = [...editData.hero.rotatingActivities]; a[i] = v;
    setEditData(p => ({ ...p, hero: { rotatingActivities: a } }));
  };
  const removeActivity = (i: number) =>
    setEditData(p => ({ ...p, hero: { rotatingActivities: p.hero.rotatingActivities.filter((_, x) => x !== i) } }));
  const addActivity = () =>
    setEditData(p => ({ ...p, hero: { rotatingActivities: [...p.hero.rotatingActivities, ''] } }));

  const setBrand = (i: number, v: string) => {
    const b = [...editData.trustedBrands]; b[i] = v;
    setEditData(p => ({ ...p, trustedBrands: b }));
  };
  const removeBrand = (i: number) =>
    setEditData(p => ({ ...p, trustedBrands: p.trustedBrands.filter((_, x) => x !== i) }));
  const addBrand = () =>
    setEditData(p => ({ ...p, trustedBrands: [...p.trustedBrands, ''] }));

  const setStat = (k: keyof HomePageData['stats'], v: string) =>
    setEditData(p => ({ ...p, stats: { ...p.stats, [k]: v } }));

  const setInventory = (k: keyof HomePageData['productInventory'], v: string) =>
    setEditData(p => ({ ...p, productInventory: { ...p.productInventory, [k]: v } }));

  const toggleProject = (id: string) => {
    const current = editData.featuredProjects.projectIds;
    if (current.includes(id)) {
      setEditData(p => ({ ...p, featuredProjects: { projectIds: current.filter(x => x !== id) } }));
    } else {
      if (current.length >= 4) return showToast('Maximum 4 featured projects allowed.', 'error');
      setEditData(p => ({ ...p, featuredProjects: { projectIds: [...current, id] } }));
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 16 }}>
      <Loader2 size={36} color={theme.colors.prussianBlue} style={{ animation: 'spin 1s linear infinite' }} />
      <p style={{ color: theme.colors.adminTextMuted, fontSize: 15 }}>Loading page configuration…</p>
    </div>
  );

  const d = isEditing ? editData : liveData;

  return (
    <div style={{ paddingBottom: 80 }}>

      {/* ── TOAST ── */}
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
          {toast.type === 'success'
            ? <CheckCircle2 size={18} color="#059669" />
            : <AlertCircle size={18} color="#DC2626" />
          }
          {toast.msg}
        </div>
      )}

      {/* ── PAGE HEADER ── */}
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
              Home Page
            </h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0', fontSize: 14 }}>
              Configure dynamic content displayed on the public landing page.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {isEditing ? (
            <>
              <button onClick={cancelEdit} style={{
                padding: '10px 20px', borderRadius: 9, border: `1px solid ${theme.colors.adminBorder}`,
                backgroundColor: theme.colors.adminSurface, color: theme.colors.adminText,
                cursor: 'pointer', fontWeight: 600, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <X size={16} /> Cancel
              </button>
              <button onClick={handleSave} disabled={saving} style={{
                padding: '10px 22px', borderRadius: 9, border: 'none',
                backgroundColor: theme.colors.prussianBlue, color: '#fff',
                cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 8,
                opacity: saving ? 0.75 : 1,
                boxShadow: '0 4px 12px rgba(3,13,26,0.15)',
              }}>
                {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                {saving ? 'Saving…' : 'Save Changes'}
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

      {/* ── STATUS BANNER (View mode) ── */}
      {!isEditing && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px',
          backgroundColor: '#F0FDFA', border: '1px solid #A7F3D0',
          borderRadius: 12, marginBottom: 24, color: '#065F46',
        }}>
          <CheckCircle2 size={18} color="#059669" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            You are viewing the <strong>live configuration</strong>. Click <em>Edit Page</em> to make changes.
          </span>
        </div>
      )}
      {isEditing && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px',
          backgroundColor: '#FFFBEB', border: '1px solid #FDE68A',
          borderRadius: 12, marginBottom: 24, color: '#92400E',
        }}>
          <AlertCircle size={18} color="#D97706" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            You are in <strong>edit mode</strong>. Changes are not saved until you click <em>Save Changes</em>.
          </span>
        </div>
      )}

      {/* ─────────────── SECTION 1 — HERO ACTIVITIES ─────────────── */}
      <div style={card}>
        <SectionHeader
          icon={<Activity size={20} color={theme.colors.prussianBlue} />}
          title="Hero Activities"
          subtitle="Rotating words in the main headline — e.g. 'Bowling Lanes', 'VR Gaming'."
        />
        {!isEditing ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {d.hero.rotatingActivities.length === 0
              ? <p style={{ color: theme.colors.adminTextMuted, fontSize: 14 }}>No activities configured yet.</p>
              : d.hero.rotatingActivities.map((a, i) => (
                <span key={i} style={tagChip}>{a}</span>
              ))
            }
          </div>
        ) : (
          <>
            {editData.hero.rotatingActivities.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  style={input}
                  value={a}
                  onChange={e => setActivity(i, e.target.value)}
                  placeholder="e.g. Trampoline Parks"
                />
                <button onClick={() => removeActivity(i)} style={deleteBtn}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button onClick={addActivity} style={addRowBtn}>
              <Plus size={16} /> Add Activity
            </button>
          </>
        )}
      </div>

      {/* ─────────────── SECTION 2 — KEY STATISTICS ─────────────── */}
      <div style={card}>
        <SectionHeader
          icon={<BarChart2 size={20} color={theme.colors.prussianBlue} />}
          title="Key Statistics"
          subtitle="The 4 headline metrics shown in the stats bar below the hero."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {(
            [
              { key: 'yearsOfExperience', label: 'Years of Experience', placeholder: 'e.g. 15+' },
              { key: 'productsAndEquip', label: 'Products & Equipment', placeholder: 'e.g. 500+' },
              { key: 'projectsDelivered', label: 'Projects Delivered', placeholder: 'e.g. 200+' },
              { key: 'citiesServed', label: 'Cities Served', placeholder: 'e.g. 10+' },
            ] as const
          ).map(({ key, label, placeholder }) => (
            <div key={key} style={metricCard(!isEditing)}>
              {!isEditing ? (
                <>
                  <div style={{ fontSize: 32, fontWeight: 800, color: theme.colors.adminText, letterSpacing: '-1px' }}>
                    {d.stats[key] || '—'}
                  </div>
                  <div style={{ fontSize: 12, color: theme.colors.adminTextMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>
                    {label}
                  </div>
                </>
              ) : (
                <>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.colors.adminTextMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {label}
                  </label>
                  <input style={input} value={editData.stats[key]} onChange={e => setStat(key, e.target.value)} placeholder={placeholder} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────── SECTION 3 — TRUSTED BRANDS ─────────────── */}
      <div style={card}>
        <SectionHeader
          icon={<Star size={20} color={theme.colors.prussianBlue} />}
          title="Trusted Brands"
          subtitle="Client names scrolling in the marquee strip on the landing page."
        />
        {!isEditing ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {d.trustedBrands.length === 0
              ? <p style={{ color: theme.colors.adminTextMuted, fontSize: 14 }}>No brands configured yet.</p>
              : d.trustedBrands.map((b, i) => (
                <span key={i} style={{ ...tagChip, backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', color: '#0C4A6E' }}>
                  {b}
                </span>
              ))
            }
          </div>
        ) : (
          <>
            {editData.trustedBrands.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input style={input} value={b} onChange={e => setBrand(i, e.target.value)} placeholder="e.g. Fun City" />
                <button onClick={() => removeBrand(i)} style={deleteBtn}><Trash2 size={16} /></button>
              </div>
            ))}
            <button onClick={addBrand} style={addRowBtn}><Plus size={16} /> Add Brand</button>
          </>
        )}
      </div>

      {/* ─────────────── SECTION 4 — FEATURED PROJECTS ─────────────── */}
      <div style={card}>
        <SectionHeader
          icon={<Target size={20} color={theme.colors.prussianBlue} />}
          title="Featured Projects"
          subtitle="Pick up to 4 projects to spotlight in the 'Our Work' section."
          badge={`${d.featuredProjects.projectIds.length} / 4 selected`}
        />

        {projectsLoading ? (
          <div style={{ textAlign: 'center', padding: '24px', color: theme.colors.adminTextMuted, fontSize: 14 }}>
            Loading projects…
          </div>
        ) : projects.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: theme.colors.adminTextMuted, fontSize: 14 }}>
            No projects found. Add projects in the Projects CMS first.
          </div>
        ) : !isEditing ? (
          // VIEW MODE — show selected projects as cards
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {d.featuredProjects.projectIds.length === 0 && (
              <p style={{ color: theme.colors.adminTextMuted, fontSize: 14, gridColumn: '1/-1' }}>No featured projects selected yet.</p>
            )}
            {d.featuredProjects.projectIds.map(id => {
              const p = projects.find(x => x._id === id);
              if (!p) return null;
              return (
                <div key={id} style={{ borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${theme.colors.prussianBlue}`, backgroundColor: theme.colors.adminSurface }}>
                  <div style={{ height: 120, backgroundColor: theme.colors.adminBorder, position: 'relative' }}>
                    {p.media?.[0]?.url
                      ? <img src={p.media[0].url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: theme.colors.adminTextLight, fontSize: 12 }}>No image</div>
                    }
                    <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', backgroundColor: theme.colors.prussianBlue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={14} color="white" />
                    </div>
                  </div>
                  <div style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: theme.colors.adminText }}>{p.title}</div>
                </div>
              );
            })}
          </div>
        ) : (
          // EDIT MODE — toggleable grid of all projects
          <>
            <p style={{ fontSize: 13, color: theme.colors.adminTextMuted, marginBottom: 16, marginTop: 0 }}>
              Click a project to select / deselect it. Maximum 4 can be selected at once.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 14 }}>
              {projects.map(p => {
                const isSelected = editData.featuredProjects.projectIds.includes(p._id);
                const isDisabled = !isSelected && editData.featuredProjects.projectIds.length >= 4;
                return (
                  <div
                    key={p._id}
                    onClick={() => !isDisabled && toggleProject(p._id)}
                    style={{
                      borderRadius: 12, overflow: 'hidden', cursor: isDisabled ? 'not-allowed' : 'pointer',
                      border: `2px solid ${isSelected ? theme.colors.prussianBlue : theme.colors.adminBorder}`,
                      opacity: isDisabled ? 0.45 : 1,
                      transition: 'all 0.18s ease',
                      boxShadow: isSelected ? `0 0 0 3px rgba(3,13,26,0.15)` : 'none',
                      position: 'relative',
                    }}
                  >
                    <div style={{ height: 100, backgroundColor: '#F1F5F9', position: 'relative' }}>
                      {p.media?.[0]?.url
                        ? <img src={p.media[0].url} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isSelected ? 'none' : 'saturate(0.6)' }} />
                        : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: theme.colors.adminTextLight, fontSize: 12 }}>No image</div>
                      }
                      {isSelected && (
                        <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', backgroundColor: theme.colors.prussianBlue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle2 size={13} color="white" />
                        </div>
                      )}
                    </div>
                    <div style={{
                      padding: '10px 12px', fontSize: 12, fontWeight: 600,
                      color: isSelected ? theme.colors.prussianBlue : theme.colors.adminText,
                      backgroundColor: isSelected ? '#F1F5F9' : theme.colors.adminSurface,
                    }}>
                      {p.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ─────────────── SECTION 5 — PRODUCT INVENTORY ─────────────── */}
      <div style={card}>
        <SectionHeader
          icon={<Layers size={20} color={theme.colors.prussianBlue} />}
          title="Product Inventory Metrics"
          subtitle="Scale numbers displayed in the Products section (e.g. '200+ Titles')."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {(
            [
              { key: 'arcadeGamesCount', label: 'Arcade Games', icon: '🕹', placeholder: 'e.g. 200+ Titles' },
              { key: 'majorAttractionsCount', label: 'Major Attractions', icon: '🎳', placeholder: 'e.g. 30+ Categories' },
              { key: 'redemptionGamesCount', label: 'Redemption Games', icon: '🎫', placeholder: 'e.g. 500+ SKUs' },
            ] as const
          ).map(({ key, label, icon, placeholder }) => (
            <div key={key} style={metricCard(!isEditing)}>
              {!isEditing ? (
                <>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: theme.colors.adminText }}>{d.productInventory[key] || '—'}</div>
                  <div style={{ fontSize: 12, color: theme.colors.adminTextMuted, marginTop: 4 }}>{label}</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.colors.adminTextMuted, marginBottom: 8 }}>{label}</label>
                  <input
                    style={input}
                    value={editData.productInventory[key]}
                    onChange={e => setInventory(key, e.target.value)}
                    placeholder={placeholder}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA when editing ── */}
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
          <button onClick={cancelEdit} style={{
            padding: '10px 20px', borderRadius: 9, border: `1px solid ${theme.colors.adminBorder}`,
            backgroundColor: theme.colors.adminSurface, color: theme.colors.adminText,
            cursor: 'pointer', fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <X size={16} /> Cancel
          </button>
          <button onClick={handleSave} disabled={saving} style={{
            padding: '10px 24px', borderRadius: 9, border: 'none',
            backgroundColor: theme.colors.prussianBlue, color: '#fff',
            cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: saving ? 0.75 : 1,
            boxShadow: '0 4px 12px rgba(3,13,26,0.15)',
          }}>
            {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
