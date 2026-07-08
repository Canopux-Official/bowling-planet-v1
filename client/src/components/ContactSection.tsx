import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

const CONTACTS = [
  { label: 'Email',    value: 'pr@bowlingplanet.co.in', href: 'mailto:pr@bowlingplanet.co.in' },
  { label: 'Phone',    value: '+91 95125 45959',         href: 'tel:+919512545959'             },
  { label: 'Location', value: 'Surat, Gujarat, India',   href: undefined                       },
]

const ContactSection: FC = () => {
  const ctaRef = useReveal()

  return (
    <section
      id="contact"
      style={{ background: '#0A0A0F', padding: '160px 28px 120px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background grid + orbs */}
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
      <div className="orb orb-teal"  style={{ width: 700, height: 600, top: '-20%', left: '50%', transform: 'translateX(-50%)' }} />
      <div className="orb orb-green" style={{ width: 400, height: 400, bottom: '-10%', right: '-5%' }} />

      <div className="divider-teal" style={{ marginBottom: 100 }} />

      <div
        ref={ctaRef}
        className="reveal"
        style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <div className="label" style={{ justifyContent: 'center', marginBottom: 24 }}>
          Let's Work Together
        </div>

        <h2 className="font-display" style={{
          fontWeight: 800,
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: 28,
        }}>
          <span className="text-metallic" style={{ display: 'block' }}>Start the</span>
          <span className="text-gradient-brand" style={{ display: 'block' }}>Conversation.</span>
        </h2>

        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#86868B', maxWidth: 540, margin: '0 auto 56px' }}>
          Whether you're opening your first entertainment center or scaling a chain,
          Bowling Planet brings the expertise, equipment, and energy your project deserves.
          We respond within 24 hours.
        </p>

        {/* CTAs */}
        <div className="btn-group" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
          {/* TODO: connect to contact form */}
          <a
            href="mailto:pr@bowlingplanet.co.in"
            className="btn btn-primary"
            style={{ fontSize: 16, padding: '16px 36px' }}
            aria-label="Email Bowling Planet"
          >
            Send Us a Message
          </a>
          <a
            href="https://wa.me/919512545959"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ fontSize: 16, padding: '15px 36px' }}
            aria-label="Chat on WhatsApp"
          >
            WhatsApp Us →
          </a>
        </div>

        {/* Contact info row */}
        <div className="contact-info-row" style={{ display: 'flex', gap: 56, justifyContent: 'center', flexWrap: 'wrap' }}>
          {CONTACTS.map(c => (
            <div key={c.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#48484A', fontWeight: 600, marginBottom: 6, fontFamily: 'Inter,sans-serif' }}>
                {c.label}
              </p>
              {c.href
                ? <a href={c.href} style={{ color: '#F5F5F7', fontWeight: 600, fontSize: 15, textDecoration: 'none', fontFamily: '"Sora",sans-serif', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#5FC1D1' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#F5F5F7' }}>
                    {c.value}
                  </a>
                : <p style={{ color: '#F5F5F7', fontWeight: 600, fontSize: 15, fontFamily: '"Sora",sans-serif' }}>{c.value}</p>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
