import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { theme } from '../../../../theme';
import { User, Mail, Shield, Key, Bell, LogOut } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
                  defaultValue={user?.name || 'Administrator'}
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
                  defaultValue={user?.email || 'admin@bowlingplanet.com'}
                  disabled
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.colors.adminBorder}`,
                    backgroundColor: '#F3F4F6', // Slightly darker to show disabled
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
              <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${theme.colors.adminBorder}`, backgroundColor: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                Update
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: `${theme.colors.teal}20`, borderRadius: '8px' }}>
                  <Bell size={18} color={theme.colors.tealMid} />
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: theme.colors.adminText, fontSize: '14px' }}>Notification Preferences</div>
                  <div style={{ color: theme.colors.adminTextMuted, fontSize: '12px' }}>Manage alerts for new leads and system updates</div>
                </div>
              </div>
              <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${theme.colors.adminBorder}`, backgroundColor: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                Configure
              </button>
            </div>
          </div>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${theme.colors.adminBorder}`, display: 'flex', justifyContent: 'space-between' }}>
            <button 
              onClick={() => {
                if(window.confirm('Are you sure you want to log out?')) {
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
            
            <button style={{ 
              padding: '8px 24px', borderRadius: '8px', border: 'none', 
              backgroundColor: theme.colors.prussianBlue, color: '#fff', cursor: 'pointer',
              fontSize: '14px', fontWeight: 600
            }}>
              Save Changes
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
