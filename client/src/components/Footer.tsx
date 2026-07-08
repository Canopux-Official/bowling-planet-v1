import { type FC } from 'react'
import { Link } from 'react-router-dom'

const NAV_COLS = [
  {
    heading: 'Company',
    links: [
      { l: 'About',     path: '/about'     },
      { l: 'Portfolio', path: '/portfolio' },
      { l: 'Careers',   path: '/careers'   },
      { l: 'Contact',   path: '/'          },
    ],
  },
  {
    heading: 'Services',
    links: [
      { l: 'Consulting', path: '/services'  },
      { l: 'Projects',   path: '/projects'  },
      { l: 'Franchise',  path: '/franchise' },
    ],
  },
]

const SOCIALS = [
  { label: 'Facebook',  href: 'https://facebook.com',  txt: 'f' },
  { label: 'Instagram', href: 'https://instagram.com', txt: '◎' },
  { label: 'LinkedIn',  href: 'https://linkedin.com',  txt: 'in' },
]

const Footer: FC = () => {
  return (
    <>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 28px 40px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>

          {/* Top row */}
          <div className="footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap', marginBottom: 56 }}>

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
            <div className="footer-nav-cols" style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
              {NAV_COLS.map(col => (
                <div key={col.heading}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#48484A', marginBottom: 20, fontFamily: 'Inter,sans-serif' }}>
                    {col.heading}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {col.links.map(link => (
                      <li key={link.l}>
                        <Link
                          to={link.path}
                          style={{ textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Sora",sans-serif', fontWeight: 600, fontSize: 14, color: '#48484A', padding: 0, transition: 'color 0.2s ease', letterSpacing: '-0.01em' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#86868B' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#48484A' }}
                        >
                          {link.l}
                        </Link>
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
          <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
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

export default Footer
