import { type FC } from 'react'
import { useReveal } from '../hooks/useReveal'

const CONTACTS = [
  { label: 'Email',    value: 'pr@bowlingplanet.co.in', href: 'mailto:pr@bowlingplanet.co.in' },
  { label: 'Phone',    value: '+91 95125 45959',         href: 'tel:+919512545959'             },
  { label: 'Location', value: 'Surat, Gujarat, India',   href: undefined                       },
]

const NAV_COLS = [
  {
    heading: 'Company',
    links: [
      { l: 'About',     a: '#about'     },
      { l: 'Portfolio', a: '#portfolio' },
      { l: 'Careers',   a: '#careers'   },
      { l: 'Contact',   a: '#contact'   },
    ],
  },
  {
    heading: 'Services',
    links: [
      { l: 'Consulting', a: '#services'  },
      { l: 'Products',   a: '#products'  },
      { l: 'Franchise',  a: '#franchise' },
    ],
  },
]

const SOCIALS = [
  { label: 'Facebook',  href: 'https://facebook.com',  txt: 'f' },
  { label: 'Instagram', href: 'https://instagram.com', txt: '◎' },
  { label: 'LinkedIn',  href: 'https://linkedin.com',  txt: 'in' },
]

const ContactFooter: FC = () => {
  const ctaRef = useReveal()

  return (
    <>
      {/* ── Contact / CTA ─────────────────────────────────── */}
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
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
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
          <div style={{ display: 'flex', gap: 56, justifyContent: 'center', flexWrap: 'wrap' }}>
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

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 28px 40px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>

          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap', marginBottom: 56 }}>

            {/* Brand */}
            <div style={{ maxWidth: 260 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <img src="/logo.avif" alt="Bowling Planet" style={{ height: 48, width: 'auto' }}
                  onError={e => { const t = e.currentTarget; if (!t.dataset.fb2) { t.dataset.fb2='1'; t.src='/logo.avif' } }} />
                <div>
                  <div style={{ fontFamily: '"Sora",sans-serif', fontWeight: 700, fontSize: 20, color: '#F5F5F7', letterSpacing: '-0.01em' }}>Bowling Planet</div>
                  <div className="label" style={{ fontSize: 10, marginBottom: 0 }}>FEC Consulting</div>
                </div>
              </div>
              <p style={{ color: '#48484A', fontSize: 13, lineHeight: 1.65, fontFamily: 'Inter,sans-serif' }}>
                FEC consulting, equipment distribution, and franchise development.
                Based in Surat, Gujarat — building entertainment destinations across India and beyond.
              </p>
            </div>

            {/* Nav cols */}
            <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
              {NAV_COLS.map(col => (
                <div key={col.heading}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#48484A', marginBottom: 20, fontFamily: 'Inter,sans-serif' }}>
                    {col.heading}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {col.links.map(link => (
                      <li key={link.l}>
                        <button
                          onClick={() => document.querySelector(link.a)?.scrollIntoView({ behavior: 'smooth' })}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Sora",sans-serif', fontWeight: 600, fontSize: 14, color: '#48484A', padding: 0, transition: 'color 0.2s ease', letterSpacing: '-0.01em' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#86868B' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#48484A' }}
                        >
                          {link.l}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#48484A', marginBottom: 20, fontFamily: 'Inter,sans-serif' }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={`Bowling Planet on ${s.label}`}
                    style={{
                      width: 38, height: 38, borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#48484A', fontSize: 13, fontWeight: 700, textDecoration: 'none',
                      transition: 'all 0.2s ease', fontFamily: 'Inter,sans-serif',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(95,193,209,0.4)'; el.style.color = '#5FC1D1'; el.style.background = 'rgba(95,193,209,0.07)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.color = '#48484A'; el.style.background = 'transparent' }}
                  >
                    {s.txt}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="divider" style={{ marginBottom: 24 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: '#48484A', fontSize: 12, fontFamily: 'Inter,sans-serif' }}>
              © {new Date().getFullYear()} Bowling Planet. All rights reserved.
            </p>
            <p style={{ color: '#48484A', fontSize: 12, fontFamily: 'Inter,sans-serif' }}>
              Surat, Gujarat, India · pr@bowlingplanet.co.in
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ContactFooter
