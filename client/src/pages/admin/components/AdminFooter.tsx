import React from 'react';
import { theme } from '../../../theme';

export const AdminFooter: React.FC = () => {
  return (
    <footer style={{
      padding: '18px 24px',
      marginTop: 'auto',
      borderTop: `1px solid ${theme.colors.adminBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: theme.colors.adminTextLight,
      backgroundColor: theme.colors.adminSurface,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/logo.avif" alt="Bowling Planet" style={{ width: '22px', height: '22px', objectFit: 'contain', opacity: 0.85 }} />
        <span>
          &copy; {new Date().getFullYear()} <span style={{ fontWeight: 600, color: theme.colors.adminTextMuted }}>Bowling Planet</span>. All rights reserved.
        </span>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <a href="#" style={{ color: theme.colors.adminTextLight, textDecoration: 'none', transition: 'color 0.15s' }}>Support</a>
        <a href="#" style={{ color: theme.colors.adminTextLight, textDecoration: 'none', transition: 'color 0.15s' }}>Documentation</a>
        <span style={{ 
          color: theme.colors.adminTextLight, 
          background: theme.colors.adminBg,
          border: `1px solid ${theme.colors.adminBorder}`,
          padding: '2px 8px', borderRadius: '20px',
          fontSize: '11px', fontWeight: 600
        }}>
          v1.0.0
        </span>
      </div>
    </footer>
  );
};
