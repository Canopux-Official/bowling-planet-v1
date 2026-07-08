import { useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../../theme'
import { useReveal } from '../../hooks/useReveal'

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
)

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
)

const SignupPage: FC = () => {
  const containerRef = useReveal()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const [form, setForm] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '', 
    adminSecret: '' 
  })
  const [focused, setFocused] = useState<string | null>(null)

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup submitted:', form)
  }

  const inputStyle = (isFocused: boolean) => ({
    width: '100%',
    background: 'rgba(0,0,0,0.4)',
    border: `1px solid ${isFocused ? theme.colors.green : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 12,
    padding: '16px 20px',
    color: theme.colors.text1,
    fontSize: 15,
    fontFamily: theme.typography.fontBody,
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: isFocused ? `0 0 0 3px rgba(109,189,78,0.2)` : 'inset 0 2px 4px rgba(0,0,0,0.5)',
  })

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: theme.colors.text2,
    marginBottom: 10,
  }

  return (
    <div style={{ background: theme.colors.void, minHeight: '100vh', display: 'flex' }}>
      
      {/* ── Left Side: Brand (Desktop Only) ──────────────────────── */}
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

        {/* Ambient Brand Colors (Teal + Green) */}
        <div className="orb orb-green" style={{ width: 800, height: 800, top: '-10%', left: '-20%', opacity: 0.25 }} />
        <div className="orb orb-teal" style={{ width: 600, height: 600, bottom: '-10%', right: '-10%', opacity: 0.2 }} />
        
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
          <div style={{ 
            display: 'inline-block', padding: '6px 14px', borderRadius: 20, 
            background: 'rgba(109,189,78,0.15)', color: theme.colors.green, 
            fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 24, border: `1px solid rgba(109,189,78,0.3)`
          }}>
            Admin Registration Portal
          </div>
          <h1 className="font-display text-metallic" style={{
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 24,
          }}>
            Join the Admin Network.
          </h1>
          <p style={{ color: theme.colors.text2, fontSize: 16, lineHeight: 1.6 }}>
            Create an administrator account. Note: You must possess a valid Admin Secret provided by a SuperAdmin to register.
          </p>
        </div>
      </div>

      {/* ── Right Side: Form ──────────────────────── */}
      <div className="auth-form-side" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        background: 'radial-gradient(circle at center, rgba(26,26,36,0.5) 0%, #000 100%)'
      }}>
        
        {/* Mobile Logo (hidden on desktop) */}
        <div className="auth-mobile-logo" style={{ marginBottom: 40, display: 'none', textAlign: 'center' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 16 }}>
            <img src="/logo.avif" alt="Bowling Planet" style={{ height: 52, width: 'auto' }} />
            <span style={{
              fontFamily: theme.typography.fontDisplay,
              fontWeight: 800,
              fontSize: 24,
              letterSpacing: '-0.02em',
              color: theme.colors.text1,
            }}>
              Bowling Planet
            </span>
          </Link>
          <div>
            <div style={{ 
              display: 'inline-block', padding: '6px 14px', borderRadius: 20, 
              background: 'rgba(109,189,78,0.15)', color: theme.colors.green, 
              fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', 
              border: `1px solid rgba(109,189,78,0.3)`
            }}>
              Admin Registration Portal
            </div>
          </div>
        </div>

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
          <h2 className="font-display text-metallic" style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, textAlign: 'center' }}>
            Sign Up
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                required
                placeholder="newadmin@bowlingplanet.in"
                value={form.email}
                onChange={update('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={inputStyle(focused === 'email')}
              />
            </div>

            <div style={{ marginBottom: 20, position: 'relative' }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={update('password')}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle(focused === 'password'), paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: theme.colors.text2,
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.7,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 20, position: 'relative' }}>
              <label style={labelStyle}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle(focused === 'confirmPassword'), paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: theme.colors.text2,
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.7,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Admin Secret</label>
              <input
                type="password"
                required
                placeholder="SuperAdmin provided token"
                value={form.adminSecret}
                onChange={update('adminSecret')}
                onFocus={() => setFocused('adminSecret')}
                onBlur={() => setFocused(null)}
                style={inputStyle(focused === 'adminSecret')}
              />
            </div>

            <button type="submit" style={{ 
              width: '100%', 
              padding: '16px', 
              borderRadius: 12,
              background: `linear-gradient(135deg, ${theme.colors.green}, ${theme.colors.greenMid})`,
              color: theme.colors.void,
              fontWeight: 700,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: `0 10px 20px rgba(109,189,78,0.2), inset 0 1px 0 rgba(255,255,255,0.4)`
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
            >
              Create Account
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <p style={{ color: theme.colors.text2, fontSize: 14 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: theme.colors.teal, textDecoration: 'none', fontWeight: 600 }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .auth-brand-side { display: none !important; }
          .auth-form-side { padding: 80px 20px !important; justify-content: flex-start !important; }
          .auth-mobile-logo { display: block !important; }
        }
        @media (max-width: 500px) {
          .auth-form-side .glass-card { padding: 32px 24px !important; }
        }
      `}</style>
    </div>
  )
}

export default SignupPage

