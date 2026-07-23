/**
 * CaseStudiesSection — "Consulting that Compounds"
 * Expanding accordion kept, but hover is debounced and flex animates via CSS
 * (no Framer layout springs) to stop lag / oversensitivity.
 */

import { type FC, useState, useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

interface CaseStudy {
  id: string
  client: string
  challenge: string
  solution: string
  result: string
  metric: string
  image: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    client: 'Woop! Entertainment',
    challenge:
      'Optimizing floor layout for maximum throughput during peak weekend hours without compromising the premium guest experience.',
    solution:
      'Redesigned the zone flow to separate high-energy arcade traffic from the premium bowling lanes, and introduced a centralized F&B hub.',
    result: 'Increased peak-hour capacity by 22% and boosted F&B attach rate.',
    metric: '+22% Capacity',
    image: '/products/Bowling_Lane_Dubai.avif',
  },
  {
    id: 'cs2',
    client: 'Shott India',
    challenge:
      'Selecting a game mix that appealed to both corporate event crowds and weekend family demographics to maximize ROI.',
    solution:
      'Data-driven curation of 80+ arcade titles, balancing high-turnover redemption games with immersive VR anchor attractions.',
    result: 'Achieved projected 18-month ROI target in just 14 months.',
    metric: '14mo ROI',
    image: '/products/Arcade_Games_Calicut.avif',
  },
  {
    id: 'cs3',
    client: 'Idea Crate',
    challenge: 'Setting up SOPs and training a green team for a massive 40,000 sq ft multi-attraction venue.',
    solution:
      'Deployed our proprietary 4-week pre-opening training module, complete with shadow shifts and stress-test soft openings.',
    result: 'Zero operational downtime in the critical first 90 days of launch.',
    metric: 'Zero Downtime',
    image: '/products/Softplay_Ahemdabad.avif',
  },
]

const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      "Bowling Planet didn't just sell us equipment. They engineered our entire business model. Their pre-opening consulting saved us millions in layout mistakes.",
    author: 'Rahul S.',
    role: 'Director, Regional FEC Chain',
  },
  {
    id: 't2',
    quote:
      'The ROI projections they ran for our game mix were spot on. We hit our break-even target four months ahead of schedule thanks to their data-driven approach.',
    author: 'Priya M.',
    role: 'Operations Head, Premium Arcade',
  },
  {
    id: 't3',
    quote:
      'Their PAN-India support network is unmatched. When we need spares or tech support for our VR setups, they are there the same day.',
    author: 'Amit K.',
    role: 'Owner, Multi-city Entertainment Brand',
  },
]

const TestimonialCarousel: FC = () => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || paused) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [reduced, paused])

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <div
      id="testimonials"
      className="relative mx-auto mt-10 max-w-[780px] sm:mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft panel — readable without harsh white-on-black glare */}
      <div
        className="relative overflow-hidden rounded-2xl border px-5 py-7 sm:px-8 sm:py-9"
        style={{
          background: 'linear-gradient(165deg, rgba(95,193,209,0.1) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.03) 100%)',
          borderColor: 'rgba(95,193,209,0.28)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.35)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(95,193,209,0.25), transparent 70%)' }}
        />

        <div className="relative z-[1] mb-2 text-center text-2xl leading-none text-[#5FC1D1]/55">
          &ldquo;
        </div>

        <div className="relative z-[1] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="min-w-full box-border px-1 text-center sm:px-3">
                <p className="mx-auto mb-5 max-w-[640px] text-[clamp(1rem,2vw,1.25rem)] font-normal leading-relaxed text-[#D8DCE3]">
                  {t.quote}
                </p>
                <div className="text-sm font-semibold text-[#5FC1D1]">{t.author}</div>
                <div className="mt-1 text-xs text-[#8B93A0]">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-[1] mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#C9CFD8] transition-colors hover:border-[#5FC1D1]/50 hover:text-[#5FC1D1]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 cursor-pointer rounded-full border-0 transition-all ${
                  i === index ? 'w-6 bg-[#5FC1D1]' : 'w-2 bg-white/20 hover:bg-white/35'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#C9CFD8] transition-colors hover:border-[#5FC1D1]/50 hover:text-[#5FC1D1]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const HOVER_DELAY_MS = 200

const CaseStudiesSection: FC = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduced = useReducedMotion()

  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
  }, [])

  const select = useCallback(
    (i: number, immediate = false) => {
      clearHoverTimer()
      if (immediate || reduced) {
        setActiveIdx(i)
        return
      }
      hoverTimer.current = setTimeout(() => setActiveIdx(i), HOVER_DELAY_MS)
    },
    [clearHoverTimer, reduced],
  )

  useEffect(() => () => clearHoverTimer(), [clearHoverTimer])

  useEffect(() => {
    if (reduced || paused) return
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % CASE_STUDIES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [reduced, paused])

  return (
    <section
      id="case-studies"
      className="relative overflow-x-clip bg-black px-4 pb-10 pt-6 sm:px-6 sm:pb-12"
    >
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative z-[1] mx-auto max-w-[1100px]">
        <div className="mb-8 text-center sm:mb-10">
          <div
            className="label mb-3 justify-center"
            style={{
              color: '#5FC1D1',
              borderColor: 'rgba(95,193,209,0.3)',
              background: 'rgba(95,193,209,0.08)',
            }}
          >
            Proven Results
          </div>
          <h2 className="font-display landing-section-heading text-[clamp(1.75rem,3.5vw,2.75rem)]">
            Consulting that Compounds.
          </h2>
        </div>

        {/* Expanding accordion — CSS flex only, debounced hover */}
        <div
          className="flex h-auto w-full flex-col gap-3 md:h-[400px] md:flex-row md:gap-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false)
            clearHoverTimer()
          }}
        >
          {CASE_STUDIES.map((study, i) => {
            const isActive = activeIdx === i
            return (
              <button
                key={study.id}
                type="button"
                onMouseEnter={() => select(i)}
                onFocus={() => select(i, true)}
                onClick={() => select(i, true)}
                aria-pressed={isActive}
                className="relative cursor-pointer overflow-hidden rounded-2xl border text-left"
                style={{
                  flex: isActive ? '3.2 1 0%' : '0.85 1 0%',
                  minHeight: isActive ? 280 : 88,
                  borderColor: isActive ? 'rgba(95,193,209,0.45)' : 'rgba(255,255,255,0.1)',
                  boxShadow: isActive ? '0 0 28px rgba(95,193,209,0.18)' : 'none',
                  background: '#0A0A0F',
                  transition:
                    'flex 0.45s cubic-bezier(0.22, 1, 0.36, 1), min-height 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <img
                  src={study.image}
                  alt={study.client}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    filter: isActive ? 'brightness(0.85)' : 'brightness(0.35)',
                    transform: isActive ? 'scale(1.03)' : 'scale(1)',
                    transition: 'filter 0.45s ease, transform 0.55s ease',
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 45%, transparent 80%)',
                  }}
                />

                {/* Active content — CSS opacity (no AnimatePresence thrash) */}
                <div
                  className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-6 md:p-7"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: 'opacity 0.28s ease',
                  }}
                  aria-hidden={!isActive}
                >
                  <span className="mb-2 inline-flex w-fit rounded-full border border-[#5FC1D1]/40 bg-[#5FC1D1]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#5FC1D1]">
                    {study.client}
                  </span>
                  <h3 className="font-display mb-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-none tracking-[-0.02em] text-[#F5F5F7]">
                    {study.metric}
                  </h3>
                  <div className="grid gap-3 rounded-xl border border-white/10 bg-black/55 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4">
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/45">
                        Challenge
                      </div>
                      <p className="text-[12px] leading-relaxed text-white/85 sm:text-[13px]">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/45">
                        Solution
                      </div>
                      <p className="text-[12px] leading-relaxed text-white/85 sm:text-[13px]">
                        {study.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Idle label */}
                <div
                  className="absolute inset-0 z-10 flex items-end justify-start p-4 md:items-center md:justify-center md:p-0"
                  style={{
                    opacity: isActive ? 0 : 1,
                    pointerEvents: 'none',
                    transition: 'opacity 0.28s ease',
                  }}
                  aria-hidden={isActive}
                >
                  <div className="flex items-center gap-3 opacity-80 md:flex-col md:gap-4">
                    <span className="border-b border-[#5FC1D1]/40 pb-0.5 text-xs font-bold tracking-widest text-[#5FC1D1] md:-rotate-90">
                      0{i + 1}
                    </span>
                    <h3 className="m-0 text-base font-extrabold uppercase tracking-widest text-white md:-rotate-90 md:whitespace-nowrap md:text-lg">
                      {study.client}
                    </h3>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  )
}

export default CaseStudiesSection
