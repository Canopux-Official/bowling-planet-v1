import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../../theme';

interface AuthHeroProps {
  role: 'SuperAdmin' | 'Admin';
  type: 'login' | 'signup';
}

export const AuthHero: React.FC<AuthHeroProps> = ({ role, type }) => {
  const activeColor = role === 'SuperAdmin' ? theme.colors.teal : theme.colors.green;
  const activeColorRgba = role === 'SuperAdmin' ? 'rgba(95,193,209,0.2)' : 'rgba(74,222,128,0.2)';

  return (
    <div className="auth-brand-side" style={{
      flex: 1,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '60px',
      overflow: 'hidden',
      borderRight: `1px solid ${theme.colors.border}`,
    }}>
      {/* Brand Logo - Top Left */}
      <Link to="/" style={{ position: 'absolute', top: 40, left: 60, zIndex: 10, display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
        <img src="/logo.avif" alt="Bowling Planet" style={{ height: 64, width: 'auto' }} />
        <span style={{
          fontFamily: theme.typography.fontDisplay,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: '-0.02em',
          color: theme.colors.text1,
        }}>
          Bowling Planet
        </span>
      </Link>

      {/* Ambient Brand Colors */}
      <div className={`orb ${role === 'SuperAdmin' ? 'orb-teal' : 'orb-green'}`} style={{ width: 800, height: 800, top: '-10%', left: '-20%', opacity: 0.25, transition: 'background 0.5s ease' }} />
      <div className={`orb ${role === 'SuperAdmin' ? 'orb-green' : 'orb-teal'}`} style={{ width: 600, height: 600, bottom: '-10%', right: '-10%', opacity: 0.2, transition: 'background 0.5s ease' }} />
      
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none', zIndex: 0 }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
        <div style={{ 
          display: 'inline-block', padding: '6px 14px', borderRadius: 20, 
          background: role === 'SuperAdmin' ? 'rgba(95,193,209,0.15)' : 'rgba(74,222,128,0.15)', 
          color: activeColor, 
          fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 24, 
          border: `1px solid ${activeColorRgba}`,
          transition: 'all 0.3s ease'
        }}>
          {role === 'SuperAdmin' ? '⬡ SuperAdmin Access' : '⬡ Admin Portal'}
        </div>
        <h1 className="font-display text-metallic" style={{
          fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: 24,
        }}>
          {type === 'signup' 
            ? 'Join the Bowling Planet Network.' 
            : (role === 'SuperAdmin' ? 'System Oversight & Control.' : 'Welcome Back to Command Center.')}
        </h1>
        <p style={{ color: theme.colors.text2, fontSize: 16, lineHeight: 1.6 }}>
          {type === 'signup'
            ? 'Apply for an administrative account to manage your franchise, view analytics, and connect with the global network.'
            : (role === 'SuperAdmin' 
                ? 'Access the master control plane to manage system settings, security configurations, and global platform metrics.'
                : 'Access the Bowling Planet administrative dashboard to manage franchises, review applications, and monitor network performance.')}
        </p>
      </div>
    </div>
  );
};
