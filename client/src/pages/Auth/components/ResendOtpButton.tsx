import React, { useState, useEffect } from 'react';
import { theme } from '../../../theme';
import { authApi } from '../services/authApi';
import { AuthOverlay } from './AuthOverlay';

interface ResendOtpButtonProps {
  email: string;
  purpose: 'signup' | 'login' | 'reset-password';
  role: 'SuperAdmin' | 'Admin';
  onResendSuccess: (message: string) => void;
  onResendError: (error: string) => void;
  lightMode?: boolean;
}

export const ResendOtpButton: React.FC<ResendOtpButtonProps> = ({ email, purpose, role, onResendSuccess, onResendError, lightMode = false }) => {
  const [countdown, setCountdown] = useState(90);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || loading) return;
    
    setLoading(true);
    try {
      const data = await authApi.resendOtp({ email, purpose });
      onResendSuccess(data.message || 'OTP resent successfully');
      setCountdown(90);
    } catch (err: any) {
      onResendError(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const activeColor = role === 'SuperAdmin' ? theme.colors.teal : theme.colors.green;
  const activeColorRgba = role === 'SuperAdmin' ? 'rgba(95,193,209,0.2)' : 'rgba(74,222,128,0.2)';

  return (
    <>
      {loading && <AuthOverlay loading={true} />}
      <div style={{ textAlign: 'center', marginTop: -12, marginBottom: 24 }}>
        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || loading}
          style={{
            background: countdown > 0 
              ? (lightMode ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)')
              : activeColorRgba,
            border: `1px solid ${countdown > 0 
              ? (lightMode ? '#e5e7eb' : 'rgba(255,255,255,0.08)') 
              : activeColor}`,
            color: countdown > 0 
              ? (lightMode ? theme.colors.text3 : theme.colors.text2) 
              : activeColor,
            fontSize: 12,
            fontWeight: 700,
            cursor: countdown > 0 ? 'not-allowed' : 'pointer',
            padding: '6px 16px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'all 0.3s ease',
            opacity: countdown > 0 ? 0.7 : 1,
            boxShadow: countdown === 0 ? `0 4px 12px ${activeColorRgba}` : 'none'
          }}
          onMouseEnter={e => {
            if (countdown === 0) {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          {loading 
            ? 'RESENDING...' 
            : countdown > 0 
              ? `RESEND IN ${countdown}S` 
              : 'RESEND CODE'}
        </button>
      </div>
    </>
  );
};
