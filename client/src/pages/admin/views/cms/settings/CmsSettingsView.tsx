import React, { useState, useEffect } from 'react';
import { theme } from '../../../../../theme';
import {
  ArrowLeft, Plus, Trash2, Save, Loader2, Edit2,
  Globe, Mail, Phone, MapPin, MessageCircle,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { globalSettingsApi, type GlobalSettingsData } from '../../../../../services/globalSettingsApi';

// ─── Style Constants (matching admin light theme) ────────────────────────────

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
  border: '1px solid #E2E8F0',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#0F172A',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#475569',
  marginBottom: '6px',
  fontFamily: 'Inter, sans-serif',
};

// ─── Component ────────────────────────────────────────────────────────────────

const CmsSettingsView: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Data
  const [data, setData] = useState<GlobalSettingsData | null>(null);
  
  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await globalSettingsApi.getSettings();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      setSaving(true);
      const res = await globalSettingsApi.updateSettings(data);
      if (res.success) {
        showToast('Settings saved successfully', 'success');
        setIsEditMode(false);
      } else {
        showToast('Failed to save settings', 'error');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      showToast('An error occurred while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    fetchData(); // Reset to live data
  };

  // ─── Render Helpers ─────────────────────────────────────────────────────────

  const renderField = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    placeholder?: string,
    isTextArea?: boolean
  ) => {
    if (!isEditMode) {
      return (
        <div style={{ marginBottom: '16px' }}>
          <span style={{ ...labelStyle, marginBottom: '2px', color: '#64748B' }}>{label}</span>
          <div style={{ fontSize: '15px', color: '#0F172A', fontWeight: 500 }}>
            {value || <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>Not set</span>}
          </div>
        </div>
      );
    }

    return (
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>{label}</label>
        {isTextArea ? (
          <textarea
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        ) : (
          <input
            style={inputStyle}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '400px' }}>
        <Loader2 className="animate-spin" size={32} color={theme.colors.prussianBlue} />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div style={{ padding: '0 0 80px 0', maxWidth: '900px', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 100,
          backgroundColor: toast.type === 'success' ? '#10B981' : '#EF4444',
          color: 'white', padding: '12px 24px', borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px',
          animation: 'fade-in-down 0.3s ease-out'
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminTextMuted, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.borderColor = '#CBD5E1' }}
            onMouseLeave={e => { e.currentTarget.style.color = theme.colors.adminTextMuted; e.currentTarget.style.borderColor = theme.colors.adminBorder }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0, fontFamily: 'Sora, sans-serif' }}>
              Global Settings
            </h1>
            <p style={{ color: theme.colors.adminTextMuted, fontSize: '14px', margin: '4px 0 0 0' }}>
              Manage contact info, social links, and footer details across the site.
            </p>
          </div>
        </div>

        {!isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: theme.colors.prussianBlue, color: 'white', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = theme.colors.prussianBlue2}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = theme.colors.prussianBlue}
          >
            <Edit2 size={16} /> Edit Settings
          </button>
        )}
      </div>

      {/* Status Banner */}
      <div style={{
        backgroundColor: isEditMode ? '#FEF3C7' : '#D1FAE5',
        border: `1px solid ${isEditMode ? '#FDE68A' : '#A7F3D0'}`,
        color: isEditMode ? '#92400E' : '#065F46',
        padding: '12px 20px', borderRadius: '8px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500
      }}>
        {isEditMode ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
        {isEditMode 
          ? "You are in Edit Mode. Unsaved changes will be lost if you leave this page." 
          : "Viewing live configuration. Click Edit Settings to make changes."}
      </div>

      {/* 1. Company Info */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${theme.colors.adminBorder}` }}>
          <div style={{ padding: '8px', backgroundColor: '#F1F5F9', borderRadius: '8px', color: '#3B82F6' }}>
            <Globe size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#0F172A' }}>Company Information</h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0 0' }}>Displayed in the footer branding.</p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {renderField('Company Name', data.company.name, (val) => setData({ ...data, company: { ...data.company, name: val } }))}
          {renderField('Tagline / Bio', data.company.tagline, (val) => setData({ ...data, company: { ...data.company, tagline: val } }), 'Short description...', true)}
        </div>
      </div>

      {/* 2. Contact Info */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${theme.colors.adminBorder}` }}>
          <div style={{ padding: '8px', backgroundColor: '#F1F5F9', borderRadius: '8px', color: '#10B981' }}>
            <Mail size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#0F172A' }}>Contact Details</h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0 0' }}>Used on the Contact page and Footer.</p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#475569' }}><Mail size={14} /></div>
            {renderField('Email Address', data.contact.email, (val) => setData({ ...data, contact: { ...data.contact, email: val } }), 'pr@bowlingplanet.co.in')}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#475569' }}><Phone size={14} /></div>
            {renderField('Phone Number (Display)', data.contact.phoneDisplay, (val) => setData({ ...data, contact: { ...data.contact, phoneDisplay: val } }), '+91 95125 45959')}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#475569' }}><MapPin size={14} /></div>
          {renderField('Location', data.contact.location, (val) => setData({ ...data, contact: { ...data.contact, location: val } }), 'Surat, Gujarat, India')}
        </div>
      </div>

      {/* 3. Social Media & WhatsApp */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${theme.colors.adminBorder}` }}>
          <div style={{ padding: '8px', backgroundColor: '#F1F5F9', borderRadius: '8px', color: '#8B5CF6' }}>
            <MessageCircle size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#0F172A' }}>Social Media & WhatsApp</h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0 0' }}>Manage links and floating chat widget.</p>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '12px' }}>Floating WhatsApp Widget</h3>
          {renderField('WhatsApp Number (No spaces or +)', data.socials.whatsappNumber, (val) => setData({ ...data, socials: { ...data.socials, whatsappNumber: val } }), '919512545959')}
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '-12px' }}>
            Must include country code without '+'. Example: 919876543210
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '12px' }}>Social Links</h3>
          
          {!isEditMode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.socials.links.length === 0 ? (
                <span style={{ color: '#94A3B8', fontStyle: 'italic', fontSize: '14px' }}>No social links added.</span>
              ) : (
                data.socials.links.map((link, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontWeight: 600, fontSize: '12px' }}>
                      {link.platform.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>{link.platform}</div>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#3B82F6', textDecoration: 'none' }}>
                        {link.url}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div>
              {data.socials.links.map((link, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                  <div style={{ flex: '1' }}>
                    <input
                      style={inputStyle}
                      value={link.platform}
                      onChange={(e) => {
                        const newLinks = [...data.socials.links];
                        newLinks[idx].platform = e.target.value;
                        setData({ ...data, socials: { ...data.socials, links: newLinks } });
                      }}
                      placeholder="Platform (e.g. Facebook)"
                    />
                  </div>
                  <div style={{ flex: '2' }}>
                    <input
                      style={inputStyle}
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...data.socials.links];
                        newLinks[idx].url = e.target.value;
                        setData({ ...data, socials: { ...data.socials, links: newLinks } });
                      }}
                      placeholder="https://..."
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newLinks = data.socials.links.filter((_, i) => i !== idx);
                      setData({ ...data, socials: { ...data.socials, links: newLinks } });
                    }}
                    style={{ padding: '10px', backgroundColor: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FECACA'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => {
                  setData({ ...data, socials: { ...data.socials, links: [...data.socials.links, { platform: '', url: '' }] } });
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#475569', border: '1px dashed #CBD5E1', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginTop: '12px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E2E8F0'; e.currentTarget.style.color = '#0F172A' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.color = '#475569' }}
              >
                <Plus size={16} /> Add Social Link
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Save Bar */}
      {isEditMode && (
        <div style={{
          position: 'fixed', bottom: 0, left: '260px', right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderTop: `1px solid ${theme.colors.adminBorder}`,
          padding: '16px 40px',
          display: 'flex', justifyContent: 'flex-end', gap: '12px',
          zIndex: 50,
        }}>
          <button
            onClick={handleCancel}
            disabled={saving}
            style={{ padding: '10px 24px', backgroundColor: 'transparent', border: '1px solid #CBD5E1', borderRadius: '8px', color: '#475569', fontSize: '14px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', backgroundColor: theme.colors.prussianBlue, color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, transition: 'background-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = theme.colors.prussianBlue2}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = theme.colors.prussianBlue}
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

    </div>
  );
};

export default CmsSettingsView;
