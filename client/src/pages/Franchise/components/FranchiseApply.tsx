/**
 * FranchiseApply — The conversion moment
 * High-stakes CTA section with application form
 */
import { type FC, useState } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { apiClient } from '../../../services/apiClient'

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
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', investment: '', message: '',
  })
  
  const { state, logCTAEvent } = useLeadTracker()

  const update = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      alert("Please fill in your complete details (Name, Email, and Phone) so our team can reach out to you properly.")
      return
    }

    setIsSubmitting(true)
    const submitEvent = { label: 'Franchise Form Step 1 Completed', timestamp: new Date().toISOString(), path: window.location.pathname }
    logCTAEvent('Franchise Form Step 1 Completed')

    try {
      await apiClient('/leads/partial', {
        method: 'POST',
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          email: form.email,
          utm: state.utm,
          device: state.deviceInfo,
          sessionId: state.sessionId,
          behavior: {
            isReturningVisitor: state.isReturningVisitor,
            eventLog: [...state.eventLog, submitEvent],
          }
        }),
      })
    } catch (err) {
      console.error('Failed to save partial lead', err)
    } finally {
      setIsSubmitting(false)
      setStep(2)
    }
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.city || !form.investment) {
      alert("Please let us know your City and Investment Range so we can tailor the best franchise opportunity for you.")
      return
    }

    setIsSubmitting(true)
    const submitEvent = { label: 'Franchise Form Step 2 Completed', timestamp: new Date().toISOString(), path: window.location.pathname }
    logCTAEvent('Franchise Form Step 2 Completed')

    try {
      await apiClient('/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          email: form.email,
          city: form.city,
          businessDetails: `Investment: ${form.investment} | Message: ${form.message}`,
          utm: state.utm,
          device: state.deviceInfo,
          sessionId: state.sessionId,
          behavior: {
            isReturningVisitor: state.isReturningVisitor,
            eventLog: [...state.eventLog, submitEvent],
          }
        }),
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit full lead', err)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
          ) : step === 1 ? (
            <div className="glass-card apply-card" style={{ padding: '48px', borderRadius: 24 }}>
              <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: theme.colors.teal, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step 1 of 2</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: theme.colors.text1, marginTop: 8, marginBottom: 0 }}>Basic Details</h3>
              </div>
              <form onSubmit={handleStep1Submit}>
                {/* Name row */}
                <div className="apply-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <input
                      type="text"
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
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={update('phone')}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'phone')}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: 16, padding: '18px 32px', justifyContent: 'center' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Next Step →'}
                </button>
              </form>
            </div>
          ) : (
            <div className="glass-card apply-card" style={{ padding: '48px', borderRadius: 24, animation: 'fadeIn 0.3s ease' }}>
              <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: theme.colors.teal, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step 2 of 2</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: theme.colors.text1, marginTop: 8, marginBottom: 0 }}>Business Requirements</h3>
              </div>
              <form onSubmit={handleStep2Submit}>
                {/* City + Investment */}
                <div className="apply-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Your City *</label>
                    <input
                      type="text"
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

                <div style={{ display: 'flex', gap: 16 }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      padding: '18px 24px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.05)',
                      color: theme.colors.text1,
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: 16, padding: '18px 32px', justifyContent: 'center' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application — We\'ll Reply in 24 Hours →'}
                  </button>
                </div>
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

