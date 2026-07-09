import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import { theme } from '../../../theme';

interface AdminHeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'A';

  return (
    <header style={{
      height: '64px',
      backgroundColor: theme.colors.adminSurface,
      borderBottom: `1px solid ${theme.colors.adminBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 900,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      {/* Left: Toggle + Mobile Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={toggleSidebar}
          style={{ 
            background: 'none', border: `1px solid ${theme.colors.adminBorder}`, cursor: 'pointer', 
            padding: '7px', color: theme.colors.adminTextMuted, display: 'flex',
            borderRadius: '8px', transition: 'all 0.15s ease'
          }}
        >
          <Menu size={18} />
        </button>

        {/* Mobile Branding */}
        <div className="flex lg:hidden items-center gap-2">
          <img src="/logo.avif" alt="Logo" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, fontSize: '15px', color: theme.colors.adminText }}>
            {user?.role === 'SuperAdmin' ? 'SuperAdmin' : 'Admin'}
          </span>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex" style={{ position: 'relative', alignItems: 'center' }}>
          <Search size={15} color={theme.colors.adminTextLight} style={{ position: 'absolute', left: '12px' }} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            style={{
              padding: '8px 16px 8px 36px',
              borderRadius: '8px',
              border: `1px solid ${theme.colors.adminBorder}`,
              backgroundColor: theme.colors.adminBg,
              fontSize: '14px',
              width: '260px',
              outline: 'none',
              color: theme.colors.adminText,
              transition: 'border-color 0.15s ease'
            }}
          />
        </div>
      </div>

      {/* Right: Actions + User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Notifications */}
        <button style={{ 
          background: 'none', border: `1px solid ${theme.colors.adminBorder}`, 
          cursor: 'pointer', position: 'relative', color: theme.colors.adminTextMuted, 
          display: 'flex', padding: '7px', borderRadius: '8px', transition: 'all 0.15s ease'
        }}>
          <Bell size={18} />
          <span style={{ 
            position: 'absolute', top: '6px', right: '6px', 
            width: '7px', height: '7px', 
            backgroundColor: theme.colors.teal, 
            borderRadius: '50%',
            border: `2px solid ${theme.colors.adminSurface}`
          }} />
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', backgroundColor: theme.colors.adminBorder, margin: '0 8px' }} />

        {/* User Pill */}
        <Link
          to="/admin/profile"
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '6px 12px 6px 6px',
            borderRadius: '10px',
            border: `1px solid ${theme.colors.adminBorder}`,
            backgroundColor: theme.colors.adminBg,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <div style={{ 
            width: '30px', height: '30px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.colors.teal}, ${theme.colors.tealMid})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '12px', color: theme.colors.prussianBlue,
            flexShrink: 0
          }}>
            {initials}
          </div>
          <div className="hidden sm:block">
            <div style={{ fontSize: '13px', fontWeight: 600, color: theme.colors.adminText, lineHeight: 1.2 }}>{user?.name || 'Admin'}</div>
            <div style={{ fontSize: '11px', color: theme.colors.adminTextMuted }}>{user?.role || 'SuperAdmin'}</div>
          </div>
          <ChevronDown size={14} color={theme.colors.adminTextMuted} className="hidden sm:block" />
        </Link>
      </div>
    </header>
  );
};
