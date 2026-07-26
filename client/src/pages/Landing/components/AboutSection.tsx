/**
 * AboutSection — Chalk/light section with scroll-scrubbed timeline,
 * authority badges at top, and click-to-expand founder pull-quote.
 */

import { type FC, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { ChevronDown } from 'lucide-react'

const TIMELINE = [
  { year: '2006',  event: 'Ranjith Pillai begins career in India\'s cinema & FEC industry', icon: '◎' },
  { year: '2012',  event: 'Leads operations for Cinemax & Inox FEC annexe rollouts',        icon: '◉' },
  { year: '2017',  event: 'Consulting mandate for KidZania, Essel World, and Woop',          icon: '◉' },
  { year: '2020',  event: 'Bowling Planet founded — full-stack FEC consulting firm',          icon: '⬤' },
  { year: 'Today', event: '50+ venues across PAN-India & the Middle East',                   icon: '★' },
]

const VALUE_PROPS = [
  { icon: '🎯', title: 'Industry Expertise',    desc: 'Deep operational knowledge, not just theory.'       },
  { icon: '📊', title: 'Data-Driven Insights',  desc: 'Every decision backed by real footfall metrics.'    },
  { icon: '💰', title: 'ROI-Focused',            desc: 'We measure success by your venue\'s profitability.' },
  { icon: '⚙️', title: 'End-to-End',             desc: 'From layout design to grand opening and beyond.'    },
  { icon: '🤝', title: 'Personalized',           desc: 'No cookie-cutter blueprints — ever.'               },
  { icon: '🔄', title: 'Continuous Support',     desc: 'KPI monitoring and improvement after opening.'      },
]

const AboutSection: FC = () => {
  const titleRef  = useReveal()
  const rightRef  = useReveal()
  const { logCTAEvent } = useLeadTracker()
  const [quoteExpanded, setQuoteExpanded] = useState(false)

  /* Scroll-scrubbed timeline */
  const sectionRef = useRef<HTMLElement>(null)
  const [timelineProgress, setTimelineProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowH = window.innerHeight
      // Progress: 0 when top of section hits bottom of viewport, 1 when bottom of section hits top
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height * 0.5)))
      setTimelineProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeTimelineDots = Math.round(timelineProgress * TIMELINE.length)

  return (
    <section
      id="about"
      ref={sectionRef}
      
      style={{ background: '#000', padding: '100px 28px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Grid */}
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section Heading ──────────────────────────────────── */}
        <div ref={titleRef} className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 100,
            border: '1.5px solid rgba(95,193,209,0.3)',
            background: 'rgba(95,193,209,0.08)',
            marginBottom: 24,
          }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5FC1D1' }}>
              About
            </span>
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: '#F5F5F7', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Our Story.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'rgba(245,245,247,0.6)', marginTop: 16, maxWidth: 480, margin: '16px auto 0', lineHeight: 1.7 }}>
            Seventeen years of building India's entertainment industry, one venue at a time.
          </p>
        </div>

        {/* ── Two-col: Timeline left + Copy right ─────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'flex-start' }}>

          {/* ── Left: Scroll-scrubbed timeline ─────────────────── */}
          <div>
            <div className="timeline-track" style={{ background: '#000', paddingLeft: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {/* Animated fill bar */}
              <div
                className="timeline-fill"
                style={{ height: `${timelineProgress * 100}%`, maxHeight: '100%' }}
              />

              {TIMELINE.map((item, i) => {
                const isActive = i < activeTimelineDots
                return (
                  <div key={item.year} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '20px 0', position: 'relative' }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: -21, top: 24,
                      width: 10, height: 10, borderRadius: '50%',
                      background: isActive ? (i === TIMELINE.length - 1 ? '#FFAA33' : '#5FC1D1') : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${isActive ? (i === TIMELINE.length - 1 ? '#FFAA33' : '#5FC1D1') : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isActive ? `0 0 12px ${i === TIMELINE.length - 1 ? 'rgba(255,170,51,0.5)' : 'rgba(95,193,209,0.5)'}` : 'none',
                      transition: 'all 0.4s ease',
                      zIndex: 1,
                    }} />
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-data)',
                        fontSize: 13,
                        fontWeight: 800,
                        color: isActive ? '#5FC1D1' : 'rgba(245,245,247,0.6)',
                        letterSpacing: '0.05em',
                        marginBottom: 4,
                        transition: 'color 0.3s ease',
                      }}>
                        {item.year}
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14,
                        color: isActive ? '#F5F5F7' : 'rgba(245,245,247,0.6)',
                        lineHeight: 1.55,
                        fontWeight: isActive ? 500 : 400,
                        transition: 'color 0.3s ease',
                      }}>
                        {item.event}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Right: Copy ─────────────────────────────────────── */}
          <div ref={rightRef} className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Click-to-expand pull quote */}
            <button
              onClick={() => setQuoteExpanded(!quoteExpanded)}
              aria-expanded={quoteExpanded}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                width: '100%',
              }}
            >
              <div style={{
                position: 'relative',
                padding: '28px 28px 28px 32px',
                borderRadius: 16,
                background: 'rgba(95,193,209,0.05)',
                border: '1px solid rgba(95,193,209,0.15)',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(95,193,209,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(95,193,209,0.15)' }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
                  borderRadius: '3px 0 0 3px',
                  background: 'linear-gradient(to bottom, #5FC1D1, #6DBD4E)',
                }} />
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                  color: '#F5F5F7',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  "Great entertainment centers don't happen by accident. They are engineered —
                  with data, design, and seventeen years of hard-won insight."
                </p>
                <AnimatePresence>
                  {quoteExpanded && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(245,245,247,0.8)', lineHeight: 1.7, marginTop: 16, overflow: 'hidden' }}
                    >
                      Ranjith Pillai founded Bowling Planet in 2020 after two decades at the center of India's
                      cinema and FEC expansion. He's advised on site selection, revenue modeling, and daily
                      operations for some of the country's most recognizable entertainment brands — and now
                      brings that full-stack expertise to every client engagement.
                    </motion.p>
                  )}
                </AnimatePresence>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, color: '#5FC1D1' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>
                    {quoteExpanded ? 'Read less' : 'Read more'}
                  </span>
                  <motion.div animate={{ rotate: quoteExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                </div>
                <div style={{ marginTop: 16, borderTop: '1px solid rgba(95,193,209,0.15)', paddingTop: 16 }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: '#F5F5F7' }}>Ranjith Pillai</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#5FC1D1', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Founder & Managing Director</p>
                </div>
              </div>
            </button>

            {/* Value props grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {VALUE_PROPS.map(vp => (
                <motion.div
                  key={vp.title}
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
                  style={{
                    padding: '18px 16px',
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'default',
                    transition: 'border-color 0.25s ease',
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{vp.icon}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: '#F5F5F7', marginBottom: 4 }}>{vp.title}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(245,245,247,0.6)', lineHeight: 1.5 }}>{vp.desc}</div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              onClick={() => logCTAEvent('Landing: Meet the Team')}
              className="btn btn-ghost"
              aria-label="Meet the Bowling Planet team"
              style={{ alignSelf: 'flex-start', color: '#F5F5F7', borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
            >
              Meet the Team →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
