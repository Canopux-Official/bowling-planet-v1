import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  LayoutTemplate, 
  Image, 
  ShieldCheck,
  User,
  X,
  ChevronRight
} from 'lucide-react';
import { theme } from '../../../theme';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'CRM & Leads', path: '/admin/leads', icon: Users, exact: false },
  { label: 'Content (CMS)', path: '/admin/cms', icon: LayoutTemplate, exact: false },
  { label: 'Media Library', path: '/admin/media', icon: Image, exact: false },
  { label: 'Admin Directory', path: '/admin/directory', icon: ShieldCheck, exact: false },
  { label: 'Profile Settings', path: '/admin/profile', icon: User, exact: false },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const portalName = user?.role === 'SuperAdmin' ? 'SuperAdmin Portal' : 'Admin Portal';
  void user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: isOpen ? 0 : '-260px',
        width: '260px',
        height: '100vh',
        background: `linear-gradient(180deg, ${theme.colors.prussianBlue} 0%, ${theme.colors.prussianBlue2} 100%)`,
        color: '#ffffff',
        transition: 'left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isOpen ? '8px 0 32px rgba(0,0,0,0.18)' : 'none',
        overflow: 'hidden'
      }}
    >
      {/* Sidebar Header */}
      <div style={{
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        borderBottom: `1px solid ${theme.colors.prussianBlueBorder}`,
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.avif" alt="Logo" style={{ width: '34px', height: '34px', objectFit: 'contain', borderRadius: '6px' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.3px', lineHeight: '1.2' }}>Bowling Planet</div>
            <div style={{ fontSize: '11px', color: theme.colors.teal, fontWeight: 500, letterSpacing: '0.3px', opacity: 0.9 }}>{portalName}</div>
          </div>
        </div>
        
        {/* Mobile close button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden"
          style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Section label */}
      <div style={{ padding: '20px 20px 8px', flexShrink: 0 }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
          Navigation
        </span>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '0 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path 
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth <= 1024 && setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? '#ffffff' : theme.colors.prussianBlueText,
                background: isActive 
                  ? `linear-gradient(135deg, rgba(95,193,209,0.18), rgba(95,193,209,0.08))`
                  : 'transparent',
                border: isActive ? `1px solid rgba(95,193,209,0.2)` : '1px solid transparent',
                transition: 'all 0.18s ease',
                fontWeight: isActive ? 600 : 500,
                fontSize: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '32px', height: '32px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '7px',
                  background: isActive ? 'rgba(95,193,209,0.15)' : 'rgba(255,255,255,0.05)',
                }}>
                  <item.icon size={16} color={isActive ? theme.colors.teal : 'rgba(255,255,255,0.5)'} />
                </div>
                {item.label}
              </div>
              {isActive && <ChevronRight size={14} color={theme.colors.teal} style={{ opacity: 0.7 }} />}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div style={{
        padding: '20px',
        borderTop: `1px solid ${theme.colors.prussianBlueBorder}`,
        fontSize: '12px',
        color: 'rgba(255,255,255,0.4)',
        textAlign: 'center',
        flexShrink: 0
      }}>
        © {new Date().getFullYear()} Bowling Planet
      </div>
    </aside>
  );
};
