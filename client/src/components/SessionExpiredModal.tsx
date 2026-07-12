import React, { useState } from 'react'
import { theme } from '../theme'
import { authApi } from '../pages/Auth/services/authApi'
import { OtpInput } from '../pages/Auth/components/OtpInput'
import { PasswordInput } from '../pages/Auth/components/PasswordInput'
import { ResendOtpButton } from '../pages/Auth/components/ResendOtpButton'

interface SessionExpiredModalProps {
  userEmail: string
  onRenewSuccess: (userData: any) => void
  onForceLogout: () => void
}

export const SessionExpiredModal = ({ userEmail, onRenewSuccess, onForceLogout }: SessionExpiredModalProps) => {
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState(userEmail || '')
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''))
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.login({ email, password })
      setStep('otp')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const otp = otpDigits.join('')
    try {
      const data = await authApi.verifyOtp({ email, otp, purpose: 'login' })
      onRenewSuccess(data.user)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  }

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '24px',
    border: `1px solid rgba(0,0,0,0.05)`,
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 24px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.02)',
    color: '#111827',
    fontFamily: theme.typography.fontBody,
    position: 'relative',
    overflow: 'hidden',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    border: `1px solid #e5e7eb`,
    borderRadius: '12px',
    color: '#111827',
    fontSize: '15px',
    marginBottom: '1.5rem',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
  }

  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    background: `linear-gradient(135deg, ${theme.colors.teal}, ${theme.colors.green})`,
    color: theme.colors.void,
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1,
    marginBottom: '1rem',
    boxShadow: `0 10px 20px rgba(95,193,209,0.2)`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${theme.colors.teal}, ${theme.colors.green})` }} />
        <h2 style={{ marginBottom: '0.5rem', marginTop: 0, fontFamily: theme.typography.fontDisplay, fontWeight: 800, fontSize: '24px' }}>Session Expired</h2>
        <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '2rem', lineHeight: 1.6 }}>
          For your security, your session has expired. Please log in again to continue where you left off without losing any data.
        </p>

        {error && (
          <div style={{ padding: '10px', backgroundColor: 'rgba(255,0,0,0.1)', color: '#ff4444', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleSendOtp}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
            
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              role="SuperAdmin" // Defaulting to teal color styling for the modal
              lightMode={true}
            />
            
            <button type="submit" style={btnStyle} disabled={loading || !password}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center' }}>
              Enter OTP sent to <span style={{ color: theme.colors.teal }}>{email}</span>
            </label>
            <div style={{ marginBottom: '2rem', marginTop: '1.5rem' }}>
              <OtpInput value={otpDigits} onChange={setOtpDigits} role="SuperAdmin" lightMode={true} />
              <ResendOtpButton 
                email={email}
                purpose="login"
                role="SuperAdmin"
                onResendSuccess={(_msg) => { setError(''); }}
                onResendError={(err) => setError(err)}
                lightMode={true}
              />
            </div>
            <button type="submit" style={btnStyle} disabled={loading || otpDigits.join('').length < 6}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button 
              type="button" 
              onClick={() => { setStep('email'); setOtpDigits(Array(6).fill('')) }}
              style={{ ...btnStyle, background: 'transparent', color: '#4b5563', border: `1px solid #d1d5db`, boxShadow: 'none', marginBottom: 0 }}
            >
              ← Back
            </button>
          </form>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
          <button 
            onClick={onForceLogout}
            style={{ background: 'none', border: 'none', color: theme.colors.teal, cursor: 'pointer', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
          >
            Log out completely
          </button>
        </div>
      </div>
    </div>
  )
}
