/**
 * SectionProgressNav — Fixed right-rail dot navigation.
 * 12 dots, one per section. Active dot morphs to pill shape.
 * Click to jump to that section. Shows tooltip label on hover.
 */

import { useState, useEffect, type FC } from 'react'

const SECTIONS = [
  { id: 'hero',         label: 'Hero'          },
  { id: 'credibility',  label: 'Credibility'   },
  { id: 'trusted',      label: 'Trusted By'    },
  { id: 'services',     label: 'Services'      },
  { id: 'portfolio',    label: 'Our Work'      },
  { id: 'case-studies', label: 'Case Studies'  },
  { id: 'products',     label: 'Products'      },
  { id: 'blog',         label: 'Blog'          },
  { id: 'franchise',    label: 'Franchise'     },
  { id: 'careers',      label: 'Careers'       },
]

const SectionProgressNav: FC = () => {
  const [active, setActive]       = useState('hero')
  const [tooltip, setTooltip]     = useState<string | null>(null)
  const [visible, setVisible]     = useState(false)

  useEffect(() => {
    // Show after scrolling past the first screen
    const onScroll = () => setVisible(window.scrollY > 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -40% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      aria-label="Section navigation"
      className="section-progress-nav"
      style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: `translateY(-50%) translateX(${visible ? 0 : 24}px)`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        zIndex: 180,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {SECTIONS.map(({ id, label }) => (
        <div key={id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Tooltip */}
          {tooltip === id && (
            <div
              style={{
                position: 'absolute',
                right: 20,
                whiteSpace: 'nowrap',
                background: 'rgba(10,10,15,0.92)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#F5F5F7',
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.04em',
                padding: '5px 10px',
                borderRadius: 6,
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
              }}
            >
              {label}
            </div>
          )}
          <button
            className={`section-nav-dot ${active === id ? 'active' : ''}`}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setTooltip(id)}
            onMouseLeave={() => setTooltip(null)}
            aria-label={`Jump to ${label} section`}
          />
        </div>
      ))}
    </div>
  )
}

export default SectionProgressNav
