/**
 * FranchiseSection — Franchise opportunities highlighting ROI and data.
 * Features an interactive "ROI Calculator Teaser" with a draggable slider.
 */

import { type FC, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { Plus, Check, IndianRupee } from 'lucide-react'

const HIGHLIGHTS = [
  {
    id: 'feat-1',
    num: '01',
    title: 'Attractive ROI',
    subtitle: 'Transparent financial models backed by real venue data — know exactly what to expect before you invest.',
    color: '#5FC1D1', // Teal
  },
  {
    id: 'feat-2',
    num: '02',
    title: 'Less Competition',
    subtitle: 'Premium FEC franchises in high-growth tier-2 and tier-3 cities with wide-open, first-mover opportunity.',
    color: '#6DBD4E', // Green
  },
  {
    id: 'feat-3',
    num: '03',
    title: 'Long-Term Support',
    subtitle: 'Our partnership doesn\'t end at opening. Ongoing coaching, co-branding, and growing network benefits.',
    color: '#C084FC', // Purple
  },
  {
    id: 'feat-4',
    num: '04',
    title: 'Full-Stack Partner',
    subtitle: 'Site selection to grand opening and beyond — we are your operational backbone at every stage of growth.',
    color: '#FFAA33', // Orange
  },
]

/* ── Interactive ROI Slider Teaser ────────────────────────────── */
const ROITeaser: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)
  
  // Map drag x (0 to 100%) to values
  // Let's assume max drag is ~300px
  // const sqft = useTransform(dragX, [0, 300], [5000, 20000])
  // const revenue = useTransform(dragX, [0, 300], [15, 60]) // in Lakhs/mo
  
  const [currentSqft, setSqft] = useState(5000)
  const [currentRev, setRev] = useState(15)

  // Update states on drag
  dragX.on('change', (v) => {
    // Clamp values
    const progress = Math.max(0, Math.min(1, v / 300))
    setSqft(Math.round(5000 + progress * 15000))
    setRev(Math.round(15 + progress * 45))
  })

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 24, padding: 32,
      marginTop: 48,
    }}>
      <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: '#5FC1D1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>
        Interactive Projection Teaser
      </h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>Area (Sq. Ft.)</div>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: 32, fontWeight: 700, color: '#F5F5F7' }}>
            {currentSqft.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>Est. Monthly Revenue</div>
          <div style={{ fontFamily: 'var(--font-data)', fontSize: 32, fontWeight: 700, color: '#6DBD4E', display: 'flex', alignItems: 'center' }}>
            <IndianRupee size={24} style={{ marginRight: 2 }} /> {currentRev}L
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 12, fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-2)' }}>
        Drag to adjust venue size:
      </div>
      
      <div ref={containerRef} style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, position: 'relative', width: '100%', maxWidth: 300, marginBottom: 24 }}>
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          style={{
            x: dragX,
            position: 'absolute', top: -10, left: 0,
            width: 24, height: 24, borderRadius: '50%',
            background: '#5FC1D1', cursor: 'grab',
            boxShadow: '0 0 12px rgba(95,193,209,0.5)'
          }}
          whileTap={{ cursor: 'grabbing', scale: 1.1 }}
        />
        {/* Fill track */}
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            background: '#5FC1D1', borderRadius: 2,
            width: useTransform(dragX, x => x + 12) // + half knob width
          }}
        />
      </div>

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5, fontStyle: 'italic' }}>
        *Projections based on average tier-2 city performance data. Requires detailed feasibility study for accurate modeling.
      </p>
    </div>
  )
}

/* ── FranchiseSection ─────────────────────────────────────────── */
const FranchiseSection: FC = () => {
  const ref = useReveal()
  const { state, addToEnquiry, logCTAEvent } = useLeadTracker()
  const isAdded = (id: string) => state.enquiryCart.some(item => item.id === id);

  return (
    <section id="franchise" style={{ background: '#0A0A0F', padding: '100px 28px', position: 'relative', overflow: 'hidden' }}>

      {/* Glow orbs */}
      <div className="orb orb-green" style={{ width: 700, height: 600, top: '-20%', right: '-10%', opacity: 0.2 }} />
      <div className="orb orb-teal" style={{ width: 500, height: 500, bottom: '-15%', left: '-8%', opacity: 0.15 }} />

      {/* Grid pattern */}
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />

      <div
        ref={ref}
        className="reveal"
        style={{
          maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1,
        }}
      >
        {/* ── Title ──────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>Ownership</div>
          <h2 className="font-display text-metallic" style={{
            fontWeight: 400, fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            letterSpacing: '-0.02em', lineHeight: 1.05,
          }}>
            Franchise Opportunities.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 80, alignItems: 'start',
          }}>

          {/* ── Left: Copy & Interactive Element ──────────── */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)', maxWidth: 480, marginBottom: 40 }}>
              Join a growing network of family entertainment entrepreneurs. We provide
              everything — from site selection and financial modeling to the operational playbook that
              makes your venue thrive from day one.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/franchise" onClick={() => logCTAEvent('Landing: Explore Franchise')} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #6DBD4E, #5a9c40)', color: '#fff' }}>
                View Franchise Models
              </Link>
              <button
                onClick={() => addToEnquiry({ id: 'franchise-general', type: 'franchise', title: 'Franchise Opportunity' })}
                className={`btn-enquiry ${isAdded('franchise-general') ? 'added' : ''}`}
                style={{ width: 'auto', marginTop: 0 }}
              >
                {isAdded('franchise-general') ? (
                  <><Check size={16} /> Added to Enquiry</>
                ) : (
                  <><Plus size={16} /> Enquire Now</>
                )}
              </button>
            </div>

            <ROITeaser />
          </div>

          {/* ── Right: Premium highlight grid ─────────────── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {HIGHLIGHTS.map(p => (
              <motion.div
                key={p.id}
                whileHover={{ y: -4, boxShadow: `0 15px 40px ${p.color}15`, borderColor: `${p.color}60` }}
                style={{
                  background: `linear-gradient(135deg, ${p.color}08, rgba(255,255,255,0.01))`,
                  border: `1px solid ${p.color}20`,
                  borderRadius: 20,
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Watermark Number */}
                <div style={{
                  position: 'absolute', top: -20, right: -10,
                  fontSize: 140, fontWeight: 900, fontFamily: 'var(--font-display)',
                  color: `${p.color}08`, pointerEvents: 'none', userSelect: 'none', lineHeight: 1, zIndex: 0,
                }}>
                  {p.num}
                </div>

                {/* Glowing Accent Light */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${p.color}, transparent)`, opacity: 0.8,
                }} />

                {/* Text Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 className="font-display" style={{
                    fontSize: 22, fontWeight: 400, color: p.color, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 12,
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6 }}>
                    {p.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FranchiseSection
