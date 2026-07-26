/**
 * ServicesSection — What We Do
 * Professional horizontal phase stepper + detail panel.
 * Keeps color-synced background + card enter/exit animation.
 */

import { type FC, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

interface Pillar {
  id: string
  step: string
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
    step: '01',
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
    step: '02',
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
    step: '03',
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
  const navigate = useNavigate()
  const [active, setActive] = useState('pre-opening')
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setActive((prev) => {
        const currentIndex = PILLARS.findIndex((p) => p.id === prev)
        return PILLARS[(currentIndex + 1) % PILLARS.length].id
      })
    }, 4500)
    return () => clearInterval(interval)
  }, [paused])

  const activePillar = PILLARS.find((p) => p.id === active)!

  return (
    <section
      id="services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-14"
      style={{
        backgroundColor: `rgba(${activePillar.rgb}, 0.045)`,
        transition: 'background-color 1.2s ease',
      }}
    >
      <div className="orb orb-teal pointer-events-none absolute -left-[8%] -top-[12%] h-[480px] w-[480px] opacity-28" />
      <div className="orb orb-green pointer-events-none absolute -bottom-[10%] -right-[6%] h-[420px] w-[420px] opacity-22" />
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative z-[1] mx-auto max-w-[1100px]">
        {/* Header */}
        <div ref={titleRef} className="reveal mb-8 max-w-[640px] sm:mb-10">
          <div className="label mb-3.5">What We Do</div>
          <h2 className="font-display landing-section-heading mb-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
            Three Pillars.
          </h2>
          <p className="m-0 font-[family-name:var(--font-sans)] text-base leading-relaxed text-[color:var(--text-2)]">
            One seamless partner — from site selection to compounding ROI.
          </p>
        </div>

        {/* Phase stepper */}
        <div
          role="tablist"
          aria-label="Service pillars"
          className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3"
        >
          {PILLARS.map((p) => {
            const isActive = active === p.id
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(p.id)}
                className="relative flex cursor-pointer flex-col items-start gap-2 rounded-2xl px-[18px] py-4 text-left transition-[border-color,background,transform,box-shadow] duration-300"
                style={{
                  border: `1px solid ${isActive ? `${p.color}55` : 'rgba(255,255,255,0.1)'}`,
                  background: isActive ? `rgba(${p.rgb}, 0.1)` : 'rgba(255,255,255,0.02)',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                  boxShadow: isActive ? `0 12px 32px rgba(${p.rgb}, 0.12)` : 'none',
                }}
              >
                <div className="flex w-full items-center gap-2.5">
                  <span
                    className="font-[family-name:var(--font-data)] text-xs font-extrabold tracking-wider transition-colors duration-300"
                    style={{ color: isActive ? p.color : 'rgba(255,255,255,0.35)' }}
                  >
                    {p.step}
                  </span>
                  <span
                    className="font-[family-name:var(--font-sans)] text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-300"
                    style={{ color: isActive ? p.color : 'rgba(255,255,255,0.4)' }}
                  >
                    {p.eyebrow}
                  </span>
                </div>
                <span
                  className="font-[family-name:var(--font-sans)] text-[15px] font-bold leading-snug transition-colors duration-300"
                  style={{ color: isActive ? '#F5F5F7' : 'rgba(245,245,247,0.55)' }}
                >
                  {p.title}
                </span>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-[18px] right-[18px] h-0.5 rounded-sm transition-opacity duration-300"
                  style={{
                    background: isActive ? p.color : 'transparent',
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[20px] backdrop-blur-md"
            style={{
              background: 'rgba(10,10,15,0.72)',
              border: `1px solid ${activePillar.color}30`,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Narrative */}
              <div
                className="border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r"
                style={{
                  borderColor: `${activePillar.color}18`,
                  background: `linear-gradient(160deg, rgba(${activePillar.rgb},0.1) 0%, transparent 55%)`,
                }}
              >
                <div
                  className="mb-4 h-[3px] w-12 rounded-sm"
                  style={{ background: `linear-gradient(90deg, ${activePillar.color}, transparent)` }}
                />
                <p
                  className="mb-2.5 font-[family-name:var(--font-sans)] text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: activePillar.color }}
                >
                  {activePillar.eyebrow}
                </p>
                <h3 className="font-display mb-3.5 text-[clamp(1.45rem,2.6vw,2rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#F5F5F7]">
                  {activePillar.title}
                </h3>
                <p className="mb-7 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-[color:var(--text-2)]">
                  {activePillar.desc}
                </p>
                <button
                  type="button"
                  className="btn btn-primary inline-flex w-fit cursor-pointer items-center gap-2 px-[22px] py-3 text-sm font-bold text-black"
                  style={{
                    background: `linear-gradient(135deg, ${activePillar.color}, ${activePillar.color}cc)`,
                  }}
                  onClick={() => {
                    logCTAEvent(`Services CTA: ${activePillar.title}`)
                    navigate('/contact')
                  }}
                >
                  Get Free Consultation
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Inclusions */}
              <div className="p-6 sm:p-8">
                <p className="mb-4 font-[family-name:var(--font-sans)] text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--text-3)]">
                  What&apos;s included
                </p>
                <ul className="m-0 grid list-none gap-2.5 p-0">
                  {activePillar.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                    >
                      <span
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                        style={{
                          background: `rgba(${activePillar.rgb}, 0.15)`,
                          color: activePillar.color,
                        }}
                      >
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                      <span className="font-[family-name:var(--font-sans)] text-sm leading-snug text-[color:var(--text-2)]">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ServicesSection
