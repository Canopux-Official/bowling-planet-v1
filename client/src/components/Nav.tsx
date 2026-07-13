import { useState, useEffect, type FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLeadTracker } from '../context/LeadTrackerContext'

const NAV_LINKS = [
  { label: 'Home',      path: '/'          },
  { label: 'About',     path: '/about'     },
  { label: 'Projects',  path: '/projects'  },
  { label: 'Products',  path: '/products'  },
  { label: 'Franchise', path: '/franchise' },
  { label: 'Careers',   path: '/careers'   },
  { label: 'Blog',      path: '/blog'      },
  { label: 'Contact',   path: '/contact'   },
]

const Nav: FC = () => {
  const [solid,    setSolid]    = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const { logCTAEvent } = useLeadTracker()

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 56)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault()
      const id = path.replace('/#', '')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    } else {
      setMenuOpen(false)
    }
    logCTAEvent(`Navigated to ${path}`)
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
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Bowling Planet — Home"
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
            <span
              className="nav-wordmark"
              style={{
                fontFamily: '"Sora", sans-serif', fontWeight: 700,
                fontSize: 22, letterSpacing: '-0.02em', color: '#F5F5F7',
              }}
            >
              Bowling Planet
            </span>
          </Link>

          {/* Desktop links */}
          <ul
            className="nav-desktop-links"
            style={{ gap: 32, listStyle: 'none', padding: 0, margin: 0 }}
          >
            {NAV_LINKS.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  onClick={(e) => handleLinkClick(e, path)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: '"Inter", sans-serif', fontSize: 14, fontWeight: 500,
                    color: 'rgba(245,245,247,0.65)', letterSpacing: '0.01em',
                    padding: '4px 0', transition: 'color 0.2s ease', textDecoration: 'none'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F7' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,245,247,0.65)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* CTA's */}
            <Link
              to={isAuthenticated ? "/admin" : "/login"}
              className="btn nav-desktop-cta"
              style={{
                padding: '10px 22px', fontSize: 14, textDecoration: 'none',
                background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: 8, transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              {isAuthenticated ? "Admin Portal" : "Login"}
            </Link>
            
            <Link
              to="/contact"
              onClick={() => logCTAEvent('Header: Get in Touch')}
              className="btn btn-primary nav-desktop-cta"
              style={{ padding: '10px 22px', fontSize: 14, textDecoration: 'none' }}
              aria-label="Get in touch"
            >
              Get in Touch
            </Link>

            {/* Hamburger */}
            <button
              className="nav-hamburger"
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
        {NAV_LINKS.map(({ label, path }) => (
          <Link
            key={label}
            to={path}
            onClick={(e) => handleLinkClick(e, path)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: 22,
              letterSpacing: '-0.02em', color: '#F5F5F7', padding: '14px 0',
              textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)',
              transition: 'color 0.2s ease', textDecoration: 'none', display: 'block'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#5FC1D1' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#F5F5F7' }}
          >
            {label}
          </Link>
        ))}
        {/* Mobile CTA */}
        <Link
          to="/contact"
          className="btn btn-primary"
          style={{ marginTop: 28, justifyContent: 'center', textDecoration: 'none' }}
          onClick={() => {
            setMenuOpen(false)
            logCTAEvent('Mobile Nav: Get in Touch')
          }}
        >
          Get in Touch
        </Link>
        <Link
          to={isAuthenticated ? "/admin" : "/login"}
          style={{
            display: 'block', padding: '16px', marginTop: 14, background: 'rgba(255,255,255,0.05)',
            color: '#fff', textAlign: 'center', borderRadius: 8,
            textDecoration: 'none', fontWeight: 600, fontSize: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}
          onClick={() => setMenuOpen(false)}
        >
          {isAuthenticated ? "Admin Portal" : "Login"}
        </Link>
      </div>
    </>
  )
}

export default Nav
