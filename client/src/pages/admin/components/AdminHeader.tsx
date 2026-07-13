import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Menu, ChevronDown, Globe } from 'lucide-react';
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
          className="flex lg:hidden"
          style={{ 
            background: 'none', border: `1px solid ${theme.colors.adminBorder}`, cursor: 'pointer', 
            padding: '7px', color: theme.colors.adminTextMuted,
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

        {/* Desktop Greeting */}
        <div className="hidden lg:block">
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.adminText, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Admin'} <span style={{ fontSize: '18px' }}>👋</span>
          </h2>
          <div style={{ fontSize: '12px', color: theme.colors.adminTextMuted, marginTop: '2px', fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Right: Actions + User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* View Website Button */}
        <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px',
            backgroundColor: theme.colors.adminBg,
            border: `1px solid ${theme.colors.adminBorder}`,
            borderRadius: '8px',
            color: theme.colors.adminText,
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.adminSurfaceHover;
            e.currentTarget.style.borderColor = theme.colors.adminBorderStrong;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.adminBg;
            e.currentTarget.style.borderColor = theme.colors.adminBorder;
          }}
        >
          <Globe size={14} color={theme.colors.adminTextMuted} />
          <span className="hidden sm:inline">View Website</span>
        </a>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', backgroundColor: theme.colors.adminBorder, margin: '0 4px' }} />

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
