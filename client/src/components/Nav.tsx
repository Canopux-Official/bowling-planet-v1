import { useState, useEffect, type FC } from 'react'

const NAV_LINKS = [
  { label: 'About',     anchor: '#about'     },
  { label: 'Services',  anchor: '#services'  },
  { label: 'Products',  anchor: '#products'  },
  { label: 'Franchise', anchor: '#franchise' },
  { label: 'Portfolio', anchor: '#portfolio' },
  { label: 'Careers',   anchor: '#careers'   },
]

const Nav: FC = () => {
  const [solid,    setSolid]    = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 56)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const goto = (anchor: string) => {
    setMenuOpen(false)
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Main nav bar ─────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`nav-wrap ${solid ? 'solid' : ''}`}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        <div style={{
          maxWidth: 1320, margin: '0 auto', padding: '0 28px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            aria-label="Bowling Planet — back to top"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <img
              src="/logo.avif"
              alt="Bowling Planet"
              style={{ height: 52, width: 'auto' }}
              onError={e => {
                const t = e.currentTarget
                if (!t.dataset.fb) { t.dataset.fb = '1'; t.src = '/logo.avif' }
              }}
            />
            <span style={{
              fontFamily: '"Sora", sans-serif', fontWeight: 700,
              fontSize: 22, letterSpacing: '-0.02em', color: '#F5F5F7',
            }}>
              Bowling Planet
            </span>
          </a>

          {/* Desktop links */}
          <ul
            style={{ display: 'flex', gap: 32, listStyle: 'none', padding: 0, margin: 0 }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map(({ label, anchor }) => (
              <li key={label}>
                <button
                  onClick={() => goto(anchor)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 500,
                    color: 'rgba(245,245,247,0.65)', letterSpacing: '0.01em',
                    padding: '4px 0', transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F7' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,245,247,0.65)' }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* TODO: connect to /contact route */}
            <button
              className="btn btn-primary hidden md:inline-flex"
              style={{ padding: '10px 22px', fontSize: 14 }}
              onClick={() => {
                console.log('TODO: connect to contact page')
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="Get in touch"
            >
              Get in Touch
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 1.5,
                  background: '#F5F5F7', borderRadius: 1,
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                    : i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)'
                    : 'none'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────── */}
      <div
        className={`mobile-drawer ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed', top: 64, right: 0, bottom: 0,
          width: 'min(300px, 88vw)', zIndex: 99,
          background: 'rgba(0,0,0,0.97)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          padding: '28px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}
      >
        {NAV_LINKS.map(({ label, anchor }) => (
          <button
            key={label}
            onClick={() => goto(anchor)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: 22,
              letterSpacing: '-0.02em', color: '#F5F5F7', padding: '14px 0',
              textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#5FC1D1' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#F5F5F7' }}
          >
            {label}
          </button>
        ))}
        {/* TODO: connect to /contact route */}
        <button
          className="btn btn-primary"
          style={{ marginTop: 28, justifyContent: 'center' }}
          onClick={() => { setMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
        >
          Get in Touch
        </button>
      </div>
    </>
  )
}

export default Nav
