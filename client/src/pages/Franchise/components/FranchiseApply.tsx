/**
 * FranchiseApply — The conversion moment
 * High-stakes CTA section with application form
 */
import { type FC, useState } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  investment: string
  message: string
}

const INVESTMENT_OPTIONS = [
  'Economy (₹35 Lakhs)',
  'Value (₹65 Lakhs)',
  'Basic (₹2.5 Crore)',
  'Standard (₹7 Crore)',
  'Premium (₹12 Crore)',
  'Deluxe (₹20 Crore)',
  'Not Sure Yet',
]

const inputStyle = (focused: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '14px 18px',
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${focused ? theme.colors.teal : theme.colors.border}`,
  borderRadius: 12,
  color: theme.colors.text1,
  fontFamily: theme.typography.fontBody,
  fontSize: 15,
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
})

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: theme.colors.text3,
  marginBottom: 8,
  fontFamily: theme.typography.fontBody,
}

const FranchiseApply: FC = () => {
  const headRef = useReveal()
  const formRef = useReveal()
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', investment: '', message: '',
  })

  const update = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate with backend / email service
    console.log('Franchise application:', form)
    setSubmitted(true)
  }

  return (
    <section
      id="apply"
      style={{
        background: theme.colors.surface,
        padding: '120px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="orb orb-teal" style={{ width: 700, height: 600, top: '-20%', left: '50%', transform: 'translateX(-50%)' }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>
            Apply Now
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            <span className="text-metallic" style={{ display: 'block' }}>Your City Needs This.</span>
            <span className="text-metallic" style={{ display: 'block' }}>Be the One to Build It.</span>
          </h2>
          <p style={{ color: theme.colors.text2, fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            Fill in your details and our franchise development team will reach out within 24 hours.
          </p>
        </div>

        <div ref={formRef} className="reveal">
          {submitted ? (
            <div className="glass-card" style={{
              padding: '72px 48px',
              borderRadius: 24,
              textAlign: 'center',
              borderColor: 'rgba(109,189,78,0.3)',
              boxShadow: '0 0 60px rgba(109,189,78,0.1)',
            }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
              <h3 className="font-display text-metallic" style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
                Application Received!
              </h3>
              <p style={{ color: theme.colors.text2, fontSize: 16, maxWidth: 400, margin: '0 auto' }}>
                Thank you for your interest in partnering with Bowling Planet. Our team will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="glass-card apply-card" style={{ padding: '48px', borderRadius: 24 }}>
              <form onSubmit={handleSubmit}>
                {/* Name row */}
                <div className="apply-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Rahul"
                      value={form.firstName}
                      onChange={update('firstName')}
                      onFocus={() => setFocused('firstName')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'firstName')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Sharma"
                      value={form.lastName}
                      onChange={update('lastName')}
                      onFocus={() => setFocused('lastName')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'lastName')}
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="apply-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={update('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'email')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={update('phone')}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'phone')}
                    />
                  </div>
                </div>

                {/* City + Investment */}
                <div className="apply-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Your City *</label>
                    <input
                      type="text"
                      required
                      placeholder="Mumbai, Delhi, Pune..."
                      value={form.city}
                      onChange={update('city')}
                      onFocus={() => setFocused('city')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'city')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Investment Range *</label>
                    <select
                      required
                      value={form.investment}
                      onChange={update('investment')}
                      onFocus={() => setFocused('investment')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle(focused === 'investment'), cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select a tier...</option>
                      {INVESTMENT_OPTIONS.map(o => (
                        <option key={o} value={o} style={{ background: theme.colors.surface2 }}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 32 }}>
                  <label style={labelStyle}>Tell Us About Your Vision</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your location idea, timeline, or any questions..."
                    value={form.message}
                    onChange={update('message')}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle(focused === 'message'), resize: 'vertical', minHeight: 110 }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: 16, padding: '18px 32px', justifyContent: 'center' }}
                >
                  Submit Application — We'll Reply in 24 Hours →
                </button>
                <p style={{ textAlign: 'center', color: theme.colors.text3, fontSize: 12, marginTop: 16, fontFamily: theme.typography.fontBody }}>
                  Your information is kept strictly confidential. No spam, ever.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .apply-form-grid { grid-template-columns: 1fr !important; }
          .apply-card { padding: 24px !important; border-radius: 16px !important; }
        }
      `}</style>
    </section>
  )
}

export default FranchiseApply

