import { useState, type FC } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { theme } from '../../theme'
import { useReveal } from '../../hooks/useReveal'
import { authApi } from './services/authApi'
import { useAuth } from '../../context/AuthContext'
import { AuthHero } from './components/AuthHero'
import { AuthOverlay } from './components/AuthOverlay'
import { OtpInput } from './components/OtpInput'
import { PasswordInput } from './components/PasswordInput'
import { ResendOtpButton } from './components/ResendOtpButton'
import { Turnstile } from '@marsidev/react-turnstile'

const ForgotPasswordPage: FC = () => {
  const containerRef = useReveal()
  const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL')
  const [email, setEmail] = useState('')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!captchaToken) {
      return setError('Please complete the captcha')
    }
    setLoading(true)
    try {
      const data = await authApi.forgotPassword({ email, captchaToken })
      setSuccess(data.message || 'OTP sent to your email.')
      setStep('OTP')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    const otp = otpDigits.join('')
    try {
      const data = await authApi.resetPassword({ email, otp, newPassword })
      setSuccess(data.message || 'Password reset successfully! Redirecting to login...')
      setTimeout(() => { window.location.href = '/login' }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // We'll just default to SuperAdmin style coloring for the forgot password generic page
  const activeColor = theme.colors.teal
  const activeColorRgba = 'rgba(95,193,209,0.2)'

  const inputStyle = (isFocused: boolean) => ({
    width: '100%',
    background: 'rgba(0,0,0,0.4)',
    border: `1px solid ${isFocused ? activeColor : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 12,
    padding: '16px 20px',
    color: theme.colors.text1,
    fontSize: 15,
    fontFamily: theme.typography.fontBody,
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: isFocused ? `0 0 0 3px ${activeColor}33` : 'inset 0 2px 4px rgba(0,0,0,0.5)',
  })

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: theme.colors.text2,
    marginBottom: 10,
  }

  return (
    <>
      <AuthOverlay loading={loading} />

      <div style={{
        background: '#090b10',
        transition: 'background 0.5s ease',
        minHeight: '100vh',
        display: 'flex'
      }}>

        {/* ── Left Side: Brand ──────────────────────── */}
        <AuthHero role="SuperAdmin" type="login" />

        {/* ── Right Side: Form ──────────────────────── */}
        <div className="auth-form-side" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative',
          background: `radial-gradient(circle at center, ${activeColorRgba} 0%, rgba(20,20,24,0.9) 60%, #000 100%)`,
        }}>

          <div ref={containerRef} className="reveal" style={{
            width: '100%',
            maxWidth: 480,
            padding: '48px',
            borderRadius: 24,
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}>
            <h2 className="font-display text-metallic" style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, textAlign: 'center' }}>
              {step === 'OTP' ? 'Reset Password' : 'Forgot Password'}
            </h2>

            <p style={{ color: theme.colors.text2, textAlign: 'center', marginBottom: 32, fontSize: 14, lineHeight: 1.5 }}>
              {step === 'EMAIL'
                ? "Enter your email address and we'll send you a 6-digit OTP to reset your password."
                : `Enter the OTP sent to ${email} and your new password.`}
            </p>

            {error && <div style={{ color: '#ff4d4f', marginBottom: 16, textAlign: 'center', fontSize: 14 }}>{error}</div>}
            {success && <div style={{ color: theme.colors.teal, marginBottom: 16, textAlign: 'center', fontSize: 14 }}>{success}</div>}

            {step === 'EMAIL' && (
              <form onSubmit={handleSendEmail}>
                <div style={{ marginBottom: 32 }}>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@bowlingplanet.in"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle(focused === 'email')}
                  />
                </div>

                <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
                  <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setCaptchaToken(token)}
                    onExpire={() => setCaptchaToken(null)}
                    onError={() => setCaptchaToken(null)}
                    options={{ theme: 'dark' }}
                  />
                </div>

                <button type="submit" style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${activeColor}, ${theme.colors.tealMid})`,
                  color: theme.colors.void,
                  fontWeight: 700,
                  fontSize: 16,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: `0 10px 20px ${activeColorRgba}, inset 0 1px 0 rgba(255,255,255,0.4)`
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                  disabled={loading}
                >
                  {loading || !captchaToken ? 'Sending OTP...' : 'Send Recovery OTP'}
                </button>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <Link to="/login" style={{ color: theme.colors.text2, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                    ← Back to Login
                  </Link>
                </div>
              </form>
            )}

            {step === 'OTP' && (
              <form onSubmit={handleResetPassword}>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>6-Digit OTP</label>
                  <OtpInput value={otpDigits} onChange={setOtpDigits} role="SuperAdmin" />
                  <ResendOtpButton
                    email={email}
                    purpose="reset-password"
                    role="SuperAdmin"
                    onResendSuccess={(msg) => { setSuccess(msg); setError(''); }}
                    onResendError={(err) => { setError(err); setSuccess(''); }}
                  />
                </div>

                <PasswordInput
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  role="SuperAdmin"
                />

                <button
                  type="submit"
                  disabled={loading || otpDigits.join('').length < 6 || !newPassword}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: 12,
                    background: (otpDigits.join('').length === 6 && newPassword)
                      ? 'linear-gradient(135deg, #5FC1D1, #4ade80)'
                      : 'rgba(255,255,255,0.05)',
                    color: (otpDigits.join('').length === 6 && newPassword) ? '#000' : theme.colors.text2,
                    fontWeight: 700,
                    fontSize: 16,
                    border: 'none',
                    cursor: (otpDigits.join('').length === 6 && newPassword) ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    boxShadow: (otpDigits.join('').length === 6 && newPassword)
                      ? '0 10px 30px rgba(95,193,209,0.3), inset 0 1px 0 rgba(255,255,255,0.4)'
                      : 'none',
                    letterSpacing: '0.03em',
                    marginTop: 8
                  }}
                >
                  {loading ? 'Resetting Password...' : 'Set New Password'}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep('EMAIL'); setOtpDigits(['', '', '', '', '', '']); setError(''); setSuccess(''); setNewPassword(''); }}
                  style={{
                    width: '100%',
                    marginTop: 12,
                    padding: '12px',
                    borderRadius: 10,
                    background: 'transparent',
                    color: theme.colors.text2,
                    fontWeight: 500,
                    fontSize: 14,
                    border: '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = theme.colors.text1 }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = theme.colors.text2 }}
                >
                  ← Change Email
                </button>
              </form>
            )}

          </div>
        </div>

        <style>{`
        @media (max-width: 900px) {
          .auth-brand-side { display: none !important; }
          .auth-form-side { padding: 80px 20px !important; justify-content: flex-start !important; }
        }
        @media (max-width: 500px) {
          .auth-form-side .glass-card { padding: 32px 24px !important; }
        }
      `}</style>
      </div>
    </>
  )
}

export default ForgotPasswordPage
