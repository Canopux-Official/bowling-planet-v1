import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { theme } from '../../../../theme';
import { User, Mail, Shield, Key, LogOut, X as XIcon, Loader2, Check } from 'lucide-react';
import { authApi } from '../../../Auth/services/authApi';
import { useToast } from '../../components/Toast';
import { Turnstile } from '@marsidev/react-turnstile'

export const ProfileView: React.FC = () => {
  const { user, logout, login } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [isSavingName, setIsSavingName] = useState(false);

  // Password Reset Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordStep, setPasswordStep] = useState<'initial' | 'otp'>('initial');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const handleSaveProfile = async () => {
    if (!name.trim()) return showToast('error', 'Name cannot be empty');
    if (name === user?.name) return; // No changes

    setIsSavingName(true);
    try {
      const res = await authApi.updateProfile({ name });
      if (user) {
        login({ ...user, name: res.user.name }); // update context user
      }
      showToast('success', 'Profile updated successfully');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update profile');
    } finally {
      setIsSavingName(false);
    }
  };

  const handleRequestPasswordReset = async () => {
    if (!user?.email) return;
    if (!captchaToken) {
      return showToast('error', 'Please complete the captcha');
    }

    setIsSendingOtp(true);

    try {
      await authApi.forgotPassword({ email: user.email, captchaToken });
      setPasswordStep('otp');
      showToast('success', 'OTP sent to your email');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    if (!otp.trim() || !newPassword.trim()) {
      return showToast('error', 'OTP and new password are required');
    }
    if (newPassword.length < 8) {
      return showToast('error', 'Password must be at least 8 characters');
    }
    setIsResetting(true);
    try {
      await authApi.resetPassword({ email: user.email, otp, newPassword });
      showToast('success', 'Password updated successfully');
      closeModal();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update password');
    } finally {
      setIsResetting(false);
    }
  };

  const closeModal = () => {
    setIsPasswordModalOpen(false);
    setPasswordStep('initial');
    setOtp('');
    setNewPassword('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>My Profile</h1>
        <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Manage your personal information and security settings.</p>
      </div>

      <div style={{
        backgroundColor: theme.colors.adminSurface,
        borderRadius: '12px',
        border: `1px solid ${theme.colors.adminBorder}`,
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>

        {/* Profile Header section */}
        <div style={{ padding: '32px 24px', borderBottom: `1px solid ${theme.colors.adminBorder}`, display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: theme.colors.teal,
            color: theme.colors.prussianBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '32px'
          }}>
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: theme.colors.adminText, margin: '0 0 4px 0' }}>{user?.name || 'Administrator'}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.colors.adminTextMuted, fontSize: '14px' }}>
              <Shield size={14} />
              <span>{user?.role || 'Super Admin'}</span>
            </div>
          </div>
        </div>

        {/* Profile Form Details */}
        <div style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.adminText, margin: '0 0 16px 0' }}>Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: theme.colors.adminTextMuted, marginBottom: '6px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.colors.adminBorder}`,
                    backgroundColor: theme.colors.adminBg,
                    fontSize: '14px',
                    color: theme.colors.adminText,
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: theme.colors.adminTextMuted, marginBottom: '6px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.colors.adminBorder}`,
                    backgroundColor: '#F3F4F6',
                    fontSize: '14px',
                    color: '#9CA3AF',
                    outline: 'none',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.adminText, margin: '0 0 16px 0' }}>Security Settings</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: `${theme.colors.prussianBlue}10`, borderRadius: '8px' }}>
                  <Key size={18} color={theme.colors.prussianBlue} />
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: theme.colors.adminText, fontSize: '14px' }}>Change Password</div>
                  <div style={{ color: theme.colors.adminTextMuted, fontSize: '12px' }}>Update your password regularly to keep your account secure</div>
                </div>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${theme.colors.adminBorder}`, backgroundColor: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                Update
              </button>
            </div>
          </div>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${theme.colors.adminBorder}`, display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  logout();
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '8px', border: '1px solid #FECACA',
                backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer',
                fontSize: '14px', fontWeight: 500
              }}>
              <LogOut size={16} /> Sign Out
            </button>

            <button
              onClick={handleSaveProfile}
              disabled={isSavingName || name === user?.name || !name.trim()}
              style={{
                padding: '8px 24px', borderRadius: '8px', border: 'none',
                backgroundColor: (isSavingName || name === user?.name || !name.trim()) ? '#9CA3AF' : theme.colors.prussianBlue,
                color: '#fff', cursor: (isSavingName || name === user?.name || !name.trim()) ? 'not-allowed' : 'pointer',
                fontSize: '14px', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
              {isSavingName ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Changes'}
            </button>
          </div>

        </div>
      </div>

      {/* Password Reset Modal */}
      {isPasswordModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: theme.colors.adminSurface, width: '100%', maxWidth: '400px',
            borderRadius: '16px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            position: 'relative'
          }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
              <XIcon size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: `${theme.colors.prussianBlue}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Key size={24} color={theme.colors.prussianBlue} />
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: theme.colors.adminText, margin: '0 0 8px 0' }}>Update Password</h2>
              <p style={{ fontSize: '14px', color: theme.colors.adminTextMuted, margin: 0 }}>
                {passwordStep === 'initial'
                  ? 'We will send a secure OTP to your registered email address to verify your identity.'
                  : `Enter the OTP sent to ${user?.email} and your new password.`}
              </p>
            </div>

            {passwordStep === 'initial' ? (
              <>
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                    onError={() => setCaptchaToken(null)}
                  />
                </div>
                <button
                  onClick={handleRequestPasswordReset}
                  disabled={isSendingOtp}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
                    backgroundColor: theme.colors.prussianBlue, color: '#fff', fontSize: '14px', fontWeight: 600,
                    cursor: isSendingOtp ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                  }}
                >
                  {isSendingOtp ? <><Loader2 size={16} className="animate-spin" /> Sending OTP...</> : 'Send OTP to Email'}
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: theme.colors.adminTextMuted, marginBottom: '6px' }}>One-Time Password (OTP)</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${theme.colors.adminBorder}`,
                      fontSize: '14px', color: theme.colors.adminText, outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: theme.colors.adminTextMuted, marginBottom: '6px' }}>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${theme.colors.adminBorder}`,
                      fontSize: '14px', color: theme.colors.adminText, outline: 'none'
                    }}
                  />
                </div>

                <button
                  onClick={handleResetPassword}
                  disabled={isResetting || !otp || !newPassword}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
                    backgroundColor: theme.colors.teal, color: '#000', fontSize: '14px', fontWeight: 600,
                    cursor: (isResetting || !otp || !newPassword) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px'
                  }}
                >
                  {isResetting ? <><Loader2 size={16} className="animate-spin" /> Updating...</> : <><Check size={16} /> Confirm New Password</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
