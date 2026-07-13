import React, { useState, useEffect } from 'react';
import { theme } from '../../../../../theme';
import {
  ArrowLeft, Plus, Trash2, Save, Loader2, Edit2, X,
  Briefcase, MessageCircle, BarChart2, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { franchisePageApi, type FranchisePageData } from '../../../../../services/franchisePageApi';

// ─── Style Constants (matching admin light theme) ─────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

const CmsFranchiseView: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FranchisePageData | null>(null);
  const [liveData, setLiveData] = useState<FranchisePageData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'valueProps' | 'tiers' | 'faqs'>('valueProps');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await franchisePageApi.getFranchisePageData();
      if (response.success && response.data) {
        setData(response.data);
        setLiveData(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch franchise page data:', error);
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
      const response = await franchisePageApi.updateFranchisePageData(data);
      if (response.success) {
        setData(response.data);
        setLiveData(response.data);
        setIsEditing(false);
        showToast('Franchise page updated successfully!', 'success');
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
    if (liveData) setData(liveData);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 16 }}>
        <Loader2 size={36} color={theme.colors.prussianBlue} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ color: theme.colors.adminTextMuted, fontSize: 15 }}>Loading Franchise CMS…</p>
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
          {toast.type === 'success'
            ? <CheckCircle2 size={18} color="#059669" />
            : <AlertCircle size={18} color="#DC2626" />
          }
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
              Franchise Page
            </h1>
            <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0', fontSize: 14 }}>
              Manage value propositions, investment tiers, and FAQs.
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

      {/* Status Banner */}
      {!isEditing && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px',
          backgroundColor: '#F0FDFA', border: '1px solid #A7F3D0',
          borderRadius: 12, marginBottom: 24, color: '#065F46',
        }}>
          <CheckCircle2 size={18} color="#059669" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            Viewing <strong>live configuration</strong>. Click <em>Edit Page</em> to make changes.
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

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${theme.colors.adminBorder}`, marginBottom: 24 }}>
        <div onClick={() => setActiveTab('valueProps')} style={tabStyle(activeTab === 'valueProps')}>
          <BarChart2 size={16} /> Value Props
        </div>
        <div onClick={() => setActiveTab('tiers')} style={tabStyle(activeTab === 'tiers')}>
          <Briefcase size={16} /> Investment Tiers
        </div>
        <div onClick={() => setActiveTab('faqs')} style={tabStyle(activeTab === 'faqs')}>
          <MessageCircle size={16} /> FAQs
        </div>
      </div>

      {/* Content */}
      {activeTab === 'valueProps' && (
        <ValuePropsEditor data={data} setData={setData} isEditing={isEditing} />
      )}
      {activeTab === 'tiers' && (
        <TiersEditor data={data} setData={setData} isEditing={isEditing} />
      )}
      {activeTab === 'faqs' && (
        <FaqsEditor data={data} setData={setData} isEditing={isEditing} />
      )}

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

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// VALUE PROPS TAB
// ──────────────────────────────────────────────────────────────────────────────

const ValuePropsEditor = ({ data, setData, isEditing }: any) => {
  const addProp = () =>
    setData({ ...data, valueProps: [...data.valueProps, { icon: '✨', label: 'New Prop', sub: 'Details here' }] });

  const removeProp = (index: number) => {
    const n = [...data.valueProps];
    n.splice(index, 1);
    setData({ ...data, valueProps: n });
  };

  const updateProp = (index: number, field: string, value: string) => {
    const n = [...data.valueProps];
    n[index] = { ...n[index], [field]: value };
    setData({ ...data, valueProps: n });
  };

  return (
    <div style={card}>
      <SectionHeader
        icon={<BarChart2 size={20} color={theme.colors.prussianBlue} />}
        title="Hero Value Propositions"
        subtitle="The 8 cards shown below the main headline on the Franchise page."
        badge={`${data.valueProps.length} items`}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {data.valueProps.map((vp: any, i: number) => (
          <div key={i} style={{
            backgroundColor: '#F8FAFC',
            border: `1.5px solid ${theme.colors.adminBorder}`,
            borderRadius: 12, padding: 16, position: 'relative',
          }}>
            {isEditing && (
              <button onClick={() => removeProp(i)} style={{ ...deleteBtn, position: 'absolute', top: 10, right: 10, height: 30, padding: '0 8px', background: 'rgba(239,68,68,0.08)' }}>
                <Trash2 size={13} />
              </button>
            )}

            {/* Preview emoji + label */}
            {!isEditing && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28 }}>{vp.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: theme.colors.adminText, fontSize: 14 }}>{vp.label}</div>
                  <div style={{ fontSize: 12, color: theme.colors.adminTextMuted, marginTop: 2 }}>{vp.sub}</div>
                </div>
              </div>
            )}

            {/* Edit form */}
            {isEditing && (
              <div style={{ paddingRight: 28 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{ flexShrink: 0 }}>
                    <label style={labelStyle}>Icon</label>
                    <input
                      value={vp.icon}
                      onChange={e => updateProp(i, 'icon', e.target.value)}
                      style={{ ...inputStyle, width: 52, padding: '8px', textAlign: 'center', fontSize: 18 }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Label</label>
                    <input value={vp.label} onChange={e => updateProp(i, 'label', e.target.value)} style={inputStyle} />
                  </div>
                </div>
                <label style={labelStyle}>Subtext</label>
                <input value={vp.sub} onChange={e => updateProp(i, 'sub', e.target.value)} style={inputStyle} placeholder="Short description…" />
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <button onClick={addProp} style={addRowBtn}>
          <Plus size={16} /> Add Value Prop
        </button>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// INVESTMENT TIERS TAB
// ──────────────────────────────────────────────────────────────────────────────

const TIER_FIELDS = [
  { key: 'size', label: 'Store Size' },
  { key: 'totalInvestment', label: 'Total Investment' },
  { key: 'majorAttractions', label: 'Major Attractions' },
  { key: 'arcadeGames', label: 'Arcade Games' },
  { key: 'otherHorizons', label: 'Other Horizons' },
  { key: 'gamesCost', label: 'Games Cost' },
  { key: 'interiorCost', label: 'Interior Cost' },
  { key: 'franchiseFee', label: 'Franchise Fee' },
  { key: 'consultingFee', label: 'Consulting Fee' },
  { key: 'ideal', label: 'Ideal Location' },
];

const TiersEditor = ({ data, setData, isEditing }: any) => {
  const [openTier, setOpenTier] = useState<number | null>(null);

  const updateTier = (index: number, field: string, value: any) => {
    const n = [...data.investmentTiers];
    n[index] = { ...n[index], [field]: value };
    setData({ ...data, investmentTiers: n });
  };

  return (
    <div style={card}>
      <SectionHeader
        icon={<Briefcase size={20} color={theme.colors.prussianBlue} />}
        title="Investment Tiers"
        subtitle="Six scalable business models from Economy to Deluxe."
        badge={`${data.investmentTiers.length} tiers`}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.investmentTiers.map((tier: any, i: number) => {
          const isOpen = openTier === i;
          return (
            <div key={i} style={{
              border: `1.5px solid ${isOpen ? tier.color + '60' : theme.colors.adminBorder}`,
              borderRadius: 12,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
              boxShadow: isOpen ? `0 0 0 3px ${tier.color}18` : 'none',
            }}>
              {/* Tier accordion header */}
              <button
                onClick={() => setOpenTier(isOpen ? null : i)}
                style={{
                  width: '100%', background: isOpen ? `${tier.color}08` : '#F8FAFC',
                  border: 'none', borderBottom: isOpen ? `1px solid ${theme.colors.adminBorder}` : 'none',
                  padding: '16px 20px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: tier.color, flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, color: theme.colors.adminText, fontSize: 15 }}>{tier.name}</span>
                  {tier.popular && (
                    <span style={{ background: tier.color, color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, letterSpacing: '0.05em' }}>
                      POPULAR
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: tier.color }}>{tier.totalInvestment}</span>
                  <span style={{ color: theme.colors.adminTextMuted, fontSize: 18, fontWeight: 300, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </div>
              </button>

              {/* Expandable content */}
              {isOpen && (
                <div style={{ padding: '20px 20px 24px', background: '#fff' }}>
                  {isEditing && (
                    <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', padding: '12px 16px', background: '#F8FAFC', borderRadius: 8, border: `1px solid ${theme.colors.adminBorder}` }}>
                      <label style={{ ...labelStyle, marginBottom: 0, flexShrink: 0 }}>Theme Color</label>
                      <input
                        type="color"
                        value={tier.color}
                        onChange={e => updateTier(i, 'color', e.target.value)}
                        style={{ width: 40, height: 32, border: 'none', cursor: 'pointer', borderRadius: 4, background: 'none' }}
                      />
                      <span style={{ fontSize: 13, color: theme.colors.adminTextMuted, fontFamily: 'monospace' }}>{tier.color}</span>
                      <label style={{ ...labelStyle, marginBottom: 0, marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                          type="checkbox"
                          checked={!!tier.popular}
                          onChange={e => updateTier(i, 'popular', e.target.checked)}
                        />
                        Show "Popular" badge
                      </label>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                    {TIER_FIELDS.map(({ key, label }) => (
                      <div key={key}>
                        <label style={labelStyle}>{label}</label>
                        {isEditing ? (
                          <input
                            value={(tier as any)[key] ?? ''}
                            onChange={e => updateTier(i, key, e.target.value)}
                            style={inputStyle}
                          />
                        ) : (
                          <div style={{
                            padding: '10px 14px', background: '#F8FAFC',
                            border: `1.5px solid ${theme.colors.adminBorder}`,
                            borderRadius: 8, fontSize: 14, color: theme.colors.adminText, fontWeight: 600,
                          }}>
                            {(tier as any)[key] ?? '—'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// FAQS TAB
// ──────────────────────────────────────────────────────────────────────────────

const FaqsEditor = ({ data, setData, isEditing }: any) => {
  const addFaq = () =>
    setData({ ...data, faqs: [...data.faqs, { q: 'New question?', a: 'Answer here.' }] });

  const removeFaq = (index: number) => {
    const n = [...data.faqs];
    n.splice(index, 1);
    setData({ ...data, faqs: n });
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const n = [...data.faqs];
    n[index] = { ...n[index], [field]: value };
    setData({ ...data, faqs: n });
  };

  return (
    <div style={card}>
      <SectionHeader
        icon={<MessageCircle size={20} color={theme.colors.prussianBlue} />}
        title="Frequently Asked Questions"
        subtitle="The FAQ accordion at the bottom of the Franchise page."
        badge={`${data.faqs.length} questions`}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.faqs.map((faq: any, i: number) => (
          <div key={i} style={{
            border: `1.5px solid ${theme.colors.adminBorder}`,
            borderRadius: 10,
            padding: '16px 20px',
            background: '#F8FAFC',
            position: 'relative',
          }}>
            {isEditing && (
              <button onClick={() => removeFaq(i)} style={{ ...deleteBtn, position: 'absolute', top: 12, right: 12, height: 32, padding: '0 8px' }}>
                <Trash2 size={14} />
              </button>
            )}

            <div style={{ paddingRight: isEditing ? 40 : 0 }}>
              <label style={labelStyle}>Question {i + 1}</label>
              {isEditing ? (
                <input
                  value={faq.q}
                  onChange={e => updateFaq(i, 'q', e.target.value)}
                  style={{ ...inputStyle, marginBottom: 12 }}
                />
              ) : (
                <div style={{ fontWeight: 600, color: theme.colors.adminText, fontSize: 14, marginBottom: 8 }}>{faq.q}</div>
              )}

              <label style={{ ...labelStyle, marginTop: isEditing ? 0 : 4 }}>Answer</label>
              {isEditing ? (
                <textarea
                  value={faq.a}
                  onChange={e => updateFaq(i, 'a', e.target.value)}
                  style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                />
              ) : (
                <div style={{ fontSize: 13, color: theme.colors.adminTextMuted, lineHeight: 1.6 }}>{faq.a}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <button onClick={addFaq} style={addRowBtn}>
          <Plus size={16} /> Add FAQ
        </button>
      )}
    </div>
  );
};

export default CmsFranchiseView;
