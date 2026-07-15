import { useState, type FC } from 'react'
import { Send } from 'lucide-react'
import SEO from '../../components/SEO'
import { theme } from '../../theme'
import { useReveal } from '../../hooks/useReveal'
import { apiClient } from '../../services/apiClient'
import { useLeadTracker } from '../../context/LeadTrackerContext'

const ContactPage: FC = () => {
  const headRef = useReveal()
  const infoRef = useReveal()
  const formRef = useReveal()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const { state, logCTAEvent } = useLeadTracker()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.name || !form.email || !form.message) {
      alert("Please provide your Name, Email, and a Message so our team knows how best to assist you.")
      return
    }

    setIsSubmitting(true)
    
    const submitEvent = { label: 'Contact Form Submitted', timestamp: new Date().toISOString(), path: window.location.pathname }
    logCTAEvent('Contact Form Submitted')

    try {
      await apiClient('/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessDetails: form.company ? `Company: ${form.company}\nMessage: ${form.message}` : form.message,
          utm: state.utm,
          device: state.deviceInfo,
          sessionId: state.sessionId,
          behavior: {
            isReturningVisitor: state.isReturningVisitor,
            eventLog: [...state.eventLog, submitEvent],
          },
          enquiryItems: state.enquiryCart,
        }),
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit contact form', err)
      alert('Something went wrong, please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: theme.colors.text2,
    marginBottom: 8,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  }

  const inputStyle = (isFocused: boolean) => ({
    width: '100%',
    background: 'rgba(0,0,0,0.2)',
    border: `1px solid ${isFocused ? theme.colors.teal : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 8,
    padding: '16px',
    color: theme.colors.text1,
    fontSize: 15,
    fontFamily: theme.typography.fontBody,
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: isFocused ? `0 0 0 2px ${theme.colors.teal}33` : 'none',
  })

  return (
    <div style={{ background: theme.colors.void, minHeight: '100vh', paddingTop: 80, paddingBottom: 120, position: 'relative', overflow: 'hidden' }}>
      <SEO 
        title="Contact Us" 
        description="Get in touch with Bowling Planet for franchise inquiries, turnkey FEC solutions, and equipment purchases."
      />
      {/* Background Elements */}
      <div className="orb orb-teal" style={{ width: 600, height: 600, top: '10%', left: '-10%', opacity: 0.5 }} />
      <div className="orb orb-purple" style={{ width: 800, height: 800, top: '40%', right: '-20%', opacity: 0.3 }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 80, marginTop: 40 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>
            Get in Touch
          </div>
          <h1 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: 24,
          }}>
            <span className="text-metallic" style={{ display: 'block' }}>Let's Build Something</span>
            <span className="text-metallic" style={{ display: 'block' }}>Extraordinary.</span>
          </h1>
          <p style={{ color: theme.colors.text2, fontSize: 18, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>
            Whether you're looking to launch a turnkey FEC, upgrade your existing venue, or inquire about franchise opportunities—our team is ready.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <button
              type="button"
              onClick={() => {
                logCTAEvent('Contact Page: Direct WhatsApp');
                const customMessage = `Hi Bowling Planet,\nI'd like to get in touch to discuss a project.`;
                window.open(`https://api.whatsapp.com/send?phone=919512545959&text=${encodeURIComponent(customMessage)}`, '_blank');
              }}
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                backgroundColor: '#25D366',
                color: '#fff',
                fontWeight: 700,
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
            >
              Direct WhatsApp Us
              <Send size={18} />
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
          
          {/* Contact Info Column */}
          <div ref={infoRef} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            <div className="contact-card glass-card" style={{ padding: '32px', borderRadius: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `linear-gradient(135deg, ${theme.colors.teal}20, transparent)`,
                border: `1px solid ${theme.colors.teal}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 20,
              }}>
                📍
              </div>
              <h3 className="font-display text-metallic" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Headquarters</h3>
              <p style={{ color: theme.colors.text2, fontSize: 15, lineHeight: 1.6, fontFamily: theme.typography.fontBody }}>
                Bowling Planet India<br/>
                Level 4, Innovator Building<br/>
                Cyber City, Gurugram, 122002<br/>
                India
              </p>
            </div>

            <div className="contact-card glass-card" style={{ padding: '32px', borderRadius: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `linear-gradient(135deg, ${theme.colors.green}20, transparent)`,
                border: `1px solid ${theme.colors.green}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 20,
              }}>
                ✉️
              </div>
              <h3 className="font-display text-metallic" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Sales & Inquiries</h3>
              <p style={{ color: theme.colors.text2, fontSize: 15, lineHeight: 1.6, fontFamily: theme.typography.fontBody }}>
                Drop us a line anytime. We aim to respond to all inquiries within 24 hours.
              </p>
              <a href="mailto:sales@bowlingplanet.in" onClick={() => logCTAEvent('Contact Page: Email Sales')} style={{ 
                color: theme.colors.green, 
                textDecoration: 'none', 
                fontWeight: 600, 
                marginTop: 16, 
                display: 'inline-block',
                fontFamily: theme.typography.fontDisplay,
              }}>
                sales@bowlingplanet.in
              </a>
            </div>

            <div className="contact-card glass-card" style={{ padding: '32px', borderRadius: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `linear-gradient(135deg, ${theme.colors.purple}20, transparent)`,
                border: `1px solid ${theme.colors.purple}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, marginBottom: 20,
              }}>
                📞
              </div>
              <h3 className="font-display text-metallic" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Direct Support</h3>
              <p style={{ color: theme.colors.text2, fontSize: 15, lineHeight: 1.6, fontFamily: theme.typography.fontBody }}>
                Available Monday - Friday, 9:00 AM to 6:00 PM (IST).
              </p>
              <a href="tel:+919876543210" onClick={() => logCTAEvent('Contact Page: Call Support')} style={{ 
                color: theme.colors.purple, 
                textDecoration: 'none', 
                fontWeight: 600, 
                marginTop: 16, 
                display: 'inline-block',
                fontFamily: theme.typography.fontDisplay,
              }}>
                +91 98765 43210
              </a>
            </div>
            
          </div>

          {/* Form Column */}
          <div ref={formRef} className="reveal">
            <div className="glass-card contact-form-card" style={{ padding: '48px', borderRadius: 24 }}>
              {submitted ? (
                <div style={{
                  padding: '40px 0',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 64, marginBottom: 20 }}>📬</div>
                  <h3 className="font-display text-metallic" style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: theme.colors.text2, fontSize: 16, margin: '0 auto' }}>
                    Thank you for reaching out. A specialist from our team will be in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display text-metallic" style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>
                    Send a Message
                  </h3>

                  
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Rahul Sharma"
                      value={form.name}
                      onChange={update('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'name')}
                    />
                  </div>
                  
                  <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
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
                      <label style={labelStyle}>Phone Number</label>
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

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Company / Project Name</label>
                    <input
                      type="text"
                      placeholder="Optional"
                      value={form.company}
                      onChange={update('company')}
                      onFocus={() => setFocused('company')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(focused === 'company')}
                    />
                  </div>
                  
                  <div style={{ marginBottom: 32 }}>
                    <label style={labelStyle}>How can we help? *</label>
                    <textarea
                      placeholder="Tell us about your project, timeline, or any questions you have..."
                      value={form.message}
                      onChange={update('message')}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle(focused === 'message'),
                        minHeight: 120,
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer', borderRadius: '12px' }}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        .contact-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-2px);
          border-color: ${theme.colors.teal}60;
          box-shadow: 0 10px 30px ${theme.colors.teal}15;
        }
        
        @media (max-width: 600px) {
          .contact-form-card { padding: 32px 20px !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default ContactPage

