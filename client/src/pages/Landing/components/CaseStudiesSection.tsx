/**
 * CaseStudiesSection — New chalk/light section.
 * Features flip cards (Challenge → Solution/Result) and a swipeable
 * testimonial carousel, leaning heavily into the consulting narrative.
 */

import { type FC, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    challenge: 'Optimizing floor layout for maximum throughput during peak weekend hours without compromising the premium guest experience.',
    solution: 'Redesigned the zone flow to separate high-energy arcade traffic from the premium bowling lanes, and introduced a centralized F&B hub.',
    result: 'Increased peak-hour capacity by 22% and boosted F&B attach rate.',
    metric: '+22% Capacity',
    image: '/products/Bowling_Lane_Dubai.avif',
  },
  {
    id: 'cs2',
    client: 'Shott India',
    challenge: 'Selecting a game mix that appealed to both corporate event crowds and weekend family demographics to maximize ROI.',
    solution: 'Data-driven curation of 80+ arcade titles, balancing high-turnover redemption games with immersive VR anchor attractions.',
    result: 'Achieved projected 18-month ROI target in just 14 months.',
    metric: '14mo ROI',
    image: '/products/Arcade_Games_Calicut.avif',
  },
  {
    id: 'cs3',
    client: 'Idea Crate',
    challenge: 'Setting up SOPs and training a green team for a massive 40,000 sq ft multi-attraction venue.',
    solution: 'Deployed our proprietary 4-week pre-opening training module, complete with shadow shifts and stress-test soft openings.',
    result: 'Zero operational downtime in the critical first 90 days of launch.',
    metric: 'Zero Downtime',
    image: '/products/Softplay_Ahemdabad.avif',
  }
]

const TESTIMONIALS = [
  {
    id: 't1',
    quote: "Bowling Planet didn't just sell us equipment. They engineered our entire business model. Their pre-opening consulting saved us millions in layout mistakes.",
    author: "Rahul S.",
    role: "Director, Regional FEC Chain",
  },
  {
    id: 't2',
    quote: "The ROI projections they ran for our game mix were spot on. We hit our break-even target four months ahead of schedule thanks to their data-driven approach.",
    author: "Priya M.",
    role: "Operations Head, Premium Arcade",
  },
  {
    id: 't3',
    quote: "Their PAN-India support network is unmatched. When we need spares or tech support for our VR setups, they are there the same day.",
    author: "Amit K.",
    role: "Owner, Multi-city Entertainment Brand",
  }
]

/* Flip Card logic removed - Replaced by Master-Detail Layout in CaseStudiesSection */

/* ── Testimonial Carousel ─────────────────────────────────────── */
const TestimonialCarousel: FC = () => {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  // Auto-play
  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [reduced])

  return (
    <div style={{ marginTop: 80, position: 'relative', maxWidth: 800, margin: '80px auto 0' }}>
      <div style={{ fontSize: 40, color: 'rgba(255,255,255,0.1)', textAlign: 'center', fontFamily: 'var(--font-serif)', lineHeight: 1, marginBottom: 16 }}>
        &ldquo;
      </div>
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ display: 'flex' }}
        >
          {TESTIMONIALS.map(t => (
            <div key={t.id} style={{ minWidth: '100%', padding: '0 20px', textAlign: 'center', boxSizing: 'border-box' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#F5F5F7', lineHeight: 1.5, marginBottom: 24 }}>
                {t.quote}
              </p>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: '#F5F5F7' }}>{t.author}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(245,245,247,0.6)' }}>{t.role}</div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 8, height: 8, borderRadius: '50%', padding: 0,
              background: i === index ? 'var(--teal)' : 'rgba(255,255,255,0.1)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: i === index ? 'scale(1.3)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── CaseStudiesSection ───────────────────────────────────────── */
const CaseStudiesSection: FC = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  // const activeStudy = CASE_STUDIES[activeIdx]
  const reduced = useReducedMotion()

  // Auto-play for Case Studies
  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => {
      setActiveIdx(i => (i + 1) % CASE_STUDIES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [reduced])

  return (
    <section id="case-studies"  style={{ background: '#000', padding: '0px 28px 40px 28px', position: 'relative' }}>
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20, color: '#5FC1D1', borderColor: 'rgba(95,193,209,0.3)', background: 'rgba(95,193,209,0.08)' }}>
            Proven Results
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F5F5F7', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Consulting that Compounds.
          </h2>
        </div>

        {/* Horizontal Expanding Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div 
            className="flex flex-col md:flex-row gap-4 w-full h-[800px] md:h-[600px]"
            onMouseLeave={() => setActiveIdx(0)} // Optional: Reset or pause? Let's leave it.
          >
            {CASE_STUDIES.map((study, i) => {
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={study.id}
                  layout
                  onHoverStart={() => setActiveIdx(i)}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    position: 'relative',
                    borderRadius: 24,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    flex: isActive ? 4 : 1,
                    boxShadow: isActive ? '0 0 40px rgba(168,85,247,0.3), inset 0 0 0 1px rgba(168,85,247,0.5)' : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                  }}
                  transition={{ type: 'spring', stiffness: 700, damping: 40 }}
                >
                  {/* Background Image with Slow Zoom on Active */}
                  <motion.img
                    src={study.image}
                    alt={study.client}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                    initial={{ filter: 'brightness(0.4)', scale: 1 }}
                    animate={{ 
                      filter: isActive ? 'brightness(0.9)' : 'brightness(0.4)',
                      scale: isActive ? 1.05 : 1
                    }}
                    transition={{ duration: isActive ? 6 : 0.4, ease: 'easeOut' }}
                  />

                  {/* Gradient Overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)' }} />

                  {/* Content (Active) - Staggered */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <div style={{ position: 'absolute', inset: 0, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 10 }}>
                        
                        {/* Pill */}
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0 }} 
                          transition={{ duration: 0.2 }}
                          style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}
                        >
                          <span style={{ padding: '6px 14px', background: 'rgba(168,85,247,0.2)', color: '#d8b4fe', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(168,85,247,0.4)' }}>
                            {study.client}
                          </span>
                        </motion.div>
                        
                        {/* Metric */}
                        <motion.h3 
                          initial={{ opacity: 0, y: 15 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0 }} 
                          transition={{ duration: 0.2, delay: 0.05 }}
                          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#F5F5F7', lineHeight: 1, margin: '0 0 24px', letterSpacing: '-0.02em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                        >
                          {study.metric}
                        </motion.h3>
                        
                        {/* Glass Details Box */}
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0 }} 
                          transition={{ duration: 0.2, delay: 0.1 }}
                          style={{ display: 'flex', flexWrap: 'wrap', gap: 32, background: 'rgba(20,20,30,0.6)', backdropFilter: 'blur(16px)', padding: 24, borderRadius: 16, border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                        >
                          <div style={{ flex: '1 1 200px' }}>
                            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>The Challenge</div>
                            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, margin: 0 }}>{study.challenge}</p>
                          </div>
                          <div style={{ flex: '1 1 200px' }}>
                            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>The Solution</div>
                            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, margin: 0 }}>{study.solution}</p>
                          </div>
                        </motion.div>

                      </div>
                    )}
                  </AnimatePresence>

                  {/* Title (Inactive) */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="absolute inset-0 flex flex-col items-center justify-end md:justify-center pb-8 md:pb-0 pointer-events-none"
                      >
                        <div className="flex md:flex-col items-center gap-4 opacity-70">
                          <span className="font-sans text-sm font-bold text-purple-400 tracking-widest border-b border-purple-500/50 pb-1 rotate-0 md:-rotate-90">
                            0{i + 1}
                          </span>
                          <h3 className="font-sans text-xl md:text-2xl text-white m-0 whitespace-nowrap uppercase tracking-widest font-extrabold md:-rotate-90">
                            {study.client}
                          </h3>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialCarousel />
      </div>
    </section>
  )
}

export default CaseStudiesSection
