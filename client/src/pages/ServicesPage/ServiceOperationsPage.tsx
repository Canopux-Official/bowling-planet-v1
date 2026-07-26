import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'
import {
  Settings, Layers, PieChart, FileText, Target, Award,
  BookOpen, Users, TrendingUp, ShieldCheck, Activity, BarChart,
  CheckCircle2, Circle, ArrowUpRight, Check, Plus
} from 'lucide-react'
import { useLeadTracker } from '../../context/LeadTrackerContext'

// ── DATA ──
const FEATURES = [
  { title: 'Robust Protocols', short: 'SOPs, checklists & operational registers', icon: <Settings className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop' },
  { title: 'Streamlined Day-to-Day', short: 'Guest relations, loss prevention, inventory', icon: <Layers className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=900&auto=format&fit=crop' },
  { title: 'Budget Planning', short: 'Optimal resource allocation & forecasting', icon: <PieChart className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900&auto=format&fit=crop' },
  { title: 'SOP & Reporting', short: 'Frameworks, financial models & registers', icon: <FileText className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop' },
  { title: 'Marketing Strategy', short: 'Sales uplift & audience targeting', icon: <Target className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=900&auto=format&fit=crop' },
  { title: 'Gold Standard Hospitality', short: 'Industry-leading guest experience', icon: <Award className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=900&auto=format&fit=crop' },
  { title: 'Training & Development', short: 'Skills programs aligned to industry trends', icon: <BookOpen className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=900&auto=format&fit=crop' },
  { title: 'HR & PMS', short: 'Recruitment to appraisal — end-to-end', icon: <Users className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop' },
  { title: 'ROI-Centric Approach', short: 'Data-driven growth & innovation', icon: <TrendingUp className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop' },
  { title: 'Industry Audits', short: 'Mystery audits, quality & machine uptime', icon: <ShieldCheck className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop' },
  { title: 'P&L Reviews', short: 'Comprehensive profit & loss analysis', icon: <Activity className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop' },
  { title: 'Data-Driven Pricing', short: 'Pricing, recharge plans & offers', icon: <BarChart className="h-6 w-6" />, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop' },
]

// Operations lifecycle stages (mirrors Consultation's STAGES)
const OPS_STAGES = [
  { phase: 'Phase 1', label: 'Operational Assessment', icon: <Settings className="h-5 w-5" />, color: '#5FC1D1' },
  { phase: 'Phase 2', label: 'SOP & System Design', icon: <FileText className="h-5 w-5" />, color: '#34D399' },
  { phase: 'Phase 3', label: 'Team Training & HR', icon: <Users className="h-5 w-5" />, color: '#FBBF24' },
  { phase: 'Phase 4', label: 'Launch & Monitoring', icon: <TrendingUp className="h-5 w-5" />, color: '#F87171' },
  { phase: 'Ongoing', label: 'Audits & Optimisation', icon: <ShieldCheck className="h-5 w-5" />, color: '#A78BFA' },
]

// ── COUNTER ──
function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const step = Math.ceil(target / 60)
    let cur = 0
    const t = setInterval(() => { cur += step; if (cur >= target) { setCount(target); clearInterval(t) } else setCount(cur) }, 16)
    return () => clearInterval(t)
  }, [inView, target])
  return count
}

// ── PAGE ──
const ServiceOperationsPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const metricsRef = useRef<HTMLDivElement>(null)
  const [metricsInView, setMetricsInView] = useState(false)

  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = state.enquiryCart.some(i => i.id === 'operations')

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMetricsInView(true) }, { threshold: 0.3 })
    if (metricsRef.current) obs.observe(metricsRef.current)
    return () => obs.disconnect()
  }, [])

  const c32 = useCounter(32, metricsInView)
  const c55 = useCounter(55, metricsInView)
  const c150 = useCounter(150, metricsInView)

  return (
    <div className="service-ops bg-black text-[#F5F5F7] min-h-screen">
      <SEO
        title="Execute & Lead Business Operations — Bowling Planet"
        description="Bowling Planet's Operations Management Service. SOP design, ROI-driven strategies, HR, finances, marketing, safety & more."
      />

      {/* ── PAGE HEADER ── */}
      <header className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 backdrop-blur-sm"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.98) 100%), radial-gradient(ellipse 80% 60% at 70% 40%, rgba(95,193,209,0.15), transparent 60%)' }}
          />
        </div>
        <div className="relative z-[1] mx-auto max-w-[1280px] px-5 pb-8 pt-24 sm:px-7 sm:pb-10 sm:pt-28">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">Operations</p>
              <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-[#F5F5F7]">
                Execute & Lead Business Operations
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-[#A1A1A6]">{FEATURES.length} service areas</p>
              <button
                onClick={() => addToEnquiry({ id: 'operations', type: 'service', title: 'Execute & Lead Business Operations' })}
                className={`inline-flex h-9 items-center justify-center rounded-full px-5 text-xs font-bold transition-all border gap-1.5 ${
                  isAdded
                    ? 'bg-white/10 border-white/20 text-white cursor-default'
                    : 'bg-[#5FC1D1] border-[#5FC1D1] text-black hover:bg-[#7DD4E0] cursor-pointer'
                }`}
              >
                {isAdded ? <><Check className="h-3.5 w-3.5" /> Added</> : <><Plus className="h-3.5 w-3.5" /> Add to Enquiry</>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO: split layout — image + ops lifecycle ── */}
      <section className="mx-auto max-w-[1280px] px-5 py-12 sm:px-7">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Image 60% */}
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden h-[400px] border border-white/[0.08]">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop"
              alt="Operations Management"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[#5FC1D1] text-xs uppercase tracking-widest mb-1">Our Mission</p>
              <p className="text-white text-xl font-bold leading-snug">
                Operational excellence at every level — from frontline staff to P&L.
              </p>
            </div>
          </div>

          {/* Ops lifecycle 40% */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">Engagement Lifecycle</p>
            {OPS_STAGES.map((stage, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl bg-[#0A0A0F] border border-white/[0.06] p-4 hover:border-white/[0.15] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${stage.color}15`, border: `1px solid ${stage.color}30`, color: stage.color }}>
                  {stage.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: stage.color }}>{stage.phase}</p>
                  <p className="text-white text-sm font-semibold">{stage.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANIMATED IMPACT METRICS ── */}
      <section className="border-t border-white/[0.08] py-16 sm:py-20 bg-[#050508]" ref={metricsRef}>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-7">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">Proven results</p>
          <h2 className="font-display text-3xl font-extrabold text-white mb-10 tracking-tight">Impact at a Glance</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { count: c32, suffix: '%', label: 'Average revenue uplift post-engagement', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop', color: '#5FC1D1' },
              { count: c55, suffix: '%', label: 'Operational efficiency gained', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop', color: '#34D399' },
              { count: c150, suffix: '+', label: 'FECs managed across India', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop', color: '#FBBF24' },
            ].map((m, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/[0.08] h-[200px] cursor-default hover:border-opacity-30 transition-all duration-300"
                style={{ '--accent': m.color } as React.CSSProperties}>
                <img src={m.img} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 scale-105 group-hover:scale-100" loading="lazy" />
                <div className="relative z-10 flex flex-col justify-end h-full p-7">
                  <p className="font-display text-5xl font-black leading-none mb-2" style={{ color: m.color }}>{m.count}{m.suffix}</p>
                  <p className="text-white font-semibold text-base">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CHECKLIST EXPLORER ── */}
      <section className="border-t border-white/[0.08] py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-7">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">Scope of work</p>
              <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">What We Deliver</h2>
            </div>
            <p className="text-sm text-[#A1A1A6]">Click any item to explore</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Checklist — mobile: accordion, desktop: left list */}
            <div className="lg:w-[42%] flex flex-col gap-2">
              {FEATURES.map((f, idx) => {
                const isActive = activeIndex === idx
                return (
                  <div key={idx} className="flex flex-col">
                    <button
                      onClick={() => setActiveIndex(isActive ? -1 : idx)}
                      className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left w-full ${
                        isActive
                          ? 'bg-[#5FC1D1]/10 border-[#5FC1D1]/40 shadow-[0_0_20px_rgba(95,193,209,0.08)] rounded-b-none'
                          : 'bg-[#0A0A0F] border-white/[0.06] hover:border-[#5FC1D1]/20 hover:bg-[#0e0e14]'
                      }`}
                    >
                      <div className={`transition-colors duration-300 shrink-0 ${isActive ? 'text-[#5FC1D1]' : 'text-[#3A3A42] group-hover:text-[#5FC1D1]/60'}`}>
                        {isActive ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#A1A1A6] group-hover:text-white'}`}>{f.title}</p>
                        {isActive && <p className="text-[#6A6A74] text-xs mt-0.5 hidden lg:block">{f.short}</p>}
                      </div>
                      <div className={`lg:hidden shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 text-[#5FC1D1]' : 'text-[#3A3A42]'}`}>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </button>

                    {/* ── MOBILE ACCORDION PANEL ── */}
                    {isActive && (
                      <div className="lg:hidden border border-[#5FC1D1]/40 border-t-0 rounded-b-xl overflow-hidden bg-[#0A0A0F]">
                        <div className="relative h-[200px] overflow-hidden">
                          <img
                            src={f.image}
                            alt={f.title}
                            className="h-full w-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/10 to-transparent" />
                        </div>
                        <div className="px-5 py-4 flex items-start gap-3 -mt-6 relative z-10">
                          <div className="w-9 h-9 rounded-lg bg-[#5FC1D1]/10 border border-[#5FC1D1]/20 flex items-center justify-center text-[#5FC1D1] shrink-0">
                            {f.icon}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm mb-1">{f.title}</p>
                            <p className="text-[#A1A1A6] text-xs leading-relaxed">{f.short}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Desktop Dynamic Preview — hidden on mobile */}
            <div className="hidden lg:block lg:w-[58%] sticky top-24 self-start">
              <div className="rounded-3xl border border-white/[0.08] bg-[#0A0A0F] overflow-hidden">
                <div className="relative h-[300px] overflow-hidden">
                  {FEATURES.map((f, idx) => (
                    <img
                      key={idx}
                      src={f.image}
                      alt={f.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${activeIndex === idx ? 'opacity-70 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
                      loading="lazy"
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/10 to-transparent z-20" />
                </div>
                <div className="p-8 -mt-10 relative z-30">
                  <div className="w-11 h-11 rounded-xl bg-[#5FC1D1]/10 border border-[#5FC1D1]/20 flex items-center justify-center text-[#5FC1D1] mb-5">
                    {FEATURES[activeIndex < 0 ? 0 : activeIndex].icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{FEATURES[activeIndex < 0 ? 0 : activeIndex].title}</h3>
                  <p className="text-[#A1A1A6] text-base leading-relaxed">{FEATURES[activeIndex < 0 ? 0 : activeIndex].short}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPERATIONS BENTO GALLERY ── */}
      <section className="border-t border-white/[0.08] py-16 sm:py-20 bg-[#050508]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-7">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">Visual story</p>
          <h2 className="font-display text-3xl font-extrabold text-white mb-10 tracking-tight">Operations in Action</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden h-[280px] border border-white/[0.08] group">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" alt="Team synergy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-end p-8">
                <div>
                  <p className="text-[#5FC1D1] text-xs uppercase tracking-widest mb-1">HR & People</p>
                  <p className="text-white text-xl font-bold">Empowered teams deliver extraordinary results</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[280px] border border-white/[0.08] group">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop" alt="Marketing" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-lg">Sales strategies that convert</p>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-[240px] border border-white/[0.08] group">
              <img src="https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=600&auto=format&fit=crop" alt="Hospitality" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                <p className="text-white font-bold">Gold standard guest experience</p>
              </div>
            </div>
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden h-[240px] border border-white/[0.08] group">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" alt="Analytics" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end p-8">
                <div>
                  <p className="text-[#5FC1D1] text-xs uppercase tracking-widest mb-1">Analytics</p>
                  <p className="text-white text-xl font-bold">Data-driven decisions power every outcome</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA / CROSS-LINK (no "Get Started" box, just a clean link bar) ── */}
      <section className="border-t border-white/[0.08] py-10 sm:py-12">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1A6] text-sm">Explore our other core service offering</p>
          <button
            onClick={() => navigate('/services/pre-opening-set-up-consultation-services')}
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 gap-2 shrink-0"
          >
            Pre-Opening Consulting <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default ServiceOperationsPage
