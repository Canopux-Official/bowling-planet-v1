import React from 'react';
import { theme } from '../../../theme';

interface AuthOverlayProps {
  loading: boolean;
  message?: string;
}

export const AuthOverlay: React.FC<AuthOverlayProps> = ({ loading, message = 'Authenticating Securely...' }) => {
  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.teal
    }}>
      <div style={{
        width: 60,
        height: 60,
        border: `4px solid rgba(95,193,209,0.2)`,
        borderTopColor: theme.colors.teal,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: 24
      }} />
      <div style={{ 
        fontFamily: theme.typography.fontDisplay, 
        fontSize: 22, 
        fontWeight: 700,
        letterSpacing: '0.05em',
        textShadow: '0 0 20px rgba(95,193,209,0.5)'
      }}>
        {message}
      </div>
      <p style={{ color: theme.colors.text2, fontSize: 14, marginTop: 12, opacity: 0.8 }}>
        Please do not refresh or close the page.
      </p>
    </div>
  );
};
