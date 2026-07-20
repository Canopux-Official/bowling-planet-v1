/**
 * ServicesSection — Three-pillar toggle with layoutId morphing card.
 * Tabs: Pre-Opening | Operations | Equipment
 * Active card expands with shared layout animation.
 */

import { type FC } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { useNavigate } from 'react-router-dom'

interface Pillar {
  id: string
  icon: string
  title: string
  eyebrow: string
  desc: string
  bullets: string[]
  color: string
  rgb: string
}

const PILLARS: Pillar[] = [
  {
    id: 'pre-opening',
    icon: '◎',
    eyebrow: 'Phase One',
    title: 'Pre-Opening Consulting',
    desc: 'We partner with you before a single brick is laid — running location analytics, modeling your ROI, designing the optimal floor layout, and building the team that will make your opening day unforgettable.',
    bullets: [
      'Location analytics & feasibility studies',
      'ROI projections & financial modeling',
      'Optimal layout design & space planning',
      'Game selection & equipment sourcing',
      'Staffing structure & training programs',
      'Agency & regulatory liaison',
    ],
    color: '#5FC1D1',
    rgb: '95,193,209',
  },
  {
    id: 'operations',
    icon: '⊕',
    eyebrow: 'Phase Two',
    title: 'Operations Management',
    desc: 'Running a profitable FEC demands operational excellence every day. We design your SOPs, HR frameworks, finance structures, and data-driven marketing engines — then monitor KPIs continuously.',
    bullets: [
      'SOP design & process documentation',
      'HR frameworks & team structure',
      'Finance structuring & cost optimization',
      'Marketing strategy & digital execution',
      'Safety systems & compliance',
      'Real-time KPI monitoring & reporting',
    ],
    color: '#6DBD4E',
    rgb: '109,189,78',
  },
  {
    id: 'equipment',
    icon: '⬡',
    eyebrow: 'Distribution',
    title: 'Equipment Supply',
    desc: 'We source and distribute world-class FEC equipment globally — from a single arcade cabinet to a complete multi-zone entertainment destination, turnkey. ROI-modeled game selection included.',
    bullets: [
      'Bowling lanes & pinsetters',
      'VR & immersive technology',
      'Arcade & redemption games (700+ titles)',
      'Trampoline & soft play systems',
      'Outdoor adventure equipment',
      'Turnkey project management',
    ],
    color: '#FFAA33',
    rgb: '255,170,51',
  },
]

const ServicesSection: FC = () => {
  const titleRef = useReveal()
  const { logCTAEvent } = useLeadTracker()
  const [active, setActive] = useState('pre-opening')
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => {
        const currentIndex = PILLARS.findIndex(p => p.id === prev)
        const nextIndex = (currentIndex + 1) % PILLARS.length
        return PILLARS[nextIndex].id
      })
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  const activePillar = PILLARS.find(p => p.id === active)!

  return (
    <section
      id="services"
      style={{ 
        backgroundColor: `rgba(${activePillar.rgb}, 0.05)`, 
        transition: 'background-color 1.5s ease',
        padding: '40px 28px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Background orbs */}
      <div className="orb orb-teal" style={{ width: 500, height: 500, top: '-10%', left: '-8%', opacity: 0.35 }} />
      <div className="orb orb-green" style={{ width: 450, height: 450, bottom: '-8%', right: '-6%', opacity: 0.3 }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 64, alignItems: 'center' }}>
        {/* Left Column: Context & Timeline */}
        <div ref={titleRef} className="reveal" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="label" style={{ marginBottom: 20 }}>What We Do</div>
          <h2 className="font-display text-metallic" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Three Pillars.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-2)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, marginBottom: 48 }}>
            One seamless partner — from site selection to compounding ROI.
          </p>

          <LayoutGroup>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 30, bottom: 30, left: 24, width: 2, background: 'rgba(255,255,255,0.05)' }} />
              {PILLARS.map(p => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                    opacity: active === p.id ? 1 : 0.4,
                    transition: 'opacity 0.5s',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActive(p.id)}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: active === p.id ? p.color : '#222',
                    border: `4px solid #000`,
                    zIndex: 1,
                    transition: 'all 0.5s',
                    boxShadow: active === p.id ? `0 0 20px ${p.color}80` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#000', fontWeight: 'bold'
                  }}>
                    {p.icon}
                  </div>
                  <div style={{
                    padding: '16px 28px',
                    borderRadius: 16,
                    background: active === p.id ? `${p.color}15` : 'transparent',
                    border: `1px solid ${active === p.id ? p.color + '40' : 'transparent'}`,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: active === p.id ? p.color : 'rgba(255,255,255,0.8)',
                    transition: 'all 0.5s var(--ease-out)',
                  }}>
                    {p.eyebrow}
                  </div>
                </div>
              ))}
            </div>
          </LayoutGroup>
        </div>

        {/* Right Column: Active Card content */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              layoutId="service-card"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 28,
                background: `rgba(255,255,255,0.02)`,
                border: `1px solid ${activePillar.color}25`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header section */}
              <div style={{
                padding: '48px 48px 32px 48px',
                borderBottom: `1px solid ${activePillar.color}15`,
                background: `linear-gradient(135deg, rgba(${activePillar.rgb},0.08) 0%, transparent 100%)`,
              }}>
                <div style={{ height: 3, width: 64, background: `linear-gradient(90deg, ${activePillar.color}, transparent)`, borderRadius: 2, marginBottom: 24 }} />
                
                <h3 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 400, color: '#F5F5F7', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 16 }}>
                  {activePillar.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.7, color: 'var(--text-2)' }}>
                  {activePillar.desc}
                </p>
              </div>

              {/* Bullets section */}
              <div style={{ padding: '32px 48px 48px 48px' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 24 }}>
                  What's included
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
                  {activePillar.bullets.map((b) => (
                    <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: activePillar.color,
                        flexShrink: 0, marginTop: 8,
                        boxShadow: `0 0 8px ${activePillar.color}60`,
                      }} />
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6 }}>{b}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-primary"
                  style={{ marginTop: 40, background: `linear-gradient(135deg, ${activePillar.color}, ${activePillar.color}cc)`, color: '#000', fontSize: 15, padding: '14px 28px', width: '100%', display: 'flex', justifyContent: 'center' }}
                  onClick={() => { logCTAEvent(`Services CTA: ${activePillar.title}`); navigate('/contact') }}
                >
                  Get Free Consultation
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
