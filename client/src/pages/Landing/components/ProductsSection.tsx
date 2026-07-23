/**
 * ProductsSection — Cinematic Hover-to-Reveal Design
 */

import { type FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { Plus, Check, ArrowRight, BarChart } from 'lucide-react'

const CATEGORIES = [
  {
    id: 'arcade', num: '01',
    title: 'Arcade & Video',
    desc: 'Latest-generation skill, racing, and video arcade machines. From classic redemption to immersive 4D experiences.',
    icon: '🕹',
    count: '200+ Titles',
    color: '#5FC1D1',
    image: '/products/Arcade_Games_Calicut.avif'
  },
  {
    id: 'major', num: '02',
    title: 'Major Attractions',
    desc: 'Headline centrepieces — bowling lanes, VR arenas, trampoline parks, mini golf, go-kart tracks, cricket simulators, and rope courses.',
    icon: '🎳',
    count: '30+ Categories',
    color: '#6DBD4E',
    image: '/products/Bowling_Lane_Dubai.avif'
  },
  {
    id: 'redemption', num: '03',
    title: 'Redemption Games',
    desc: 'High-engagement ticket-based games with proven repeat-visit ROI. Data-backed selection to maximise in-venue spend.',
    icon: '🎫',
    count: '500+ SKUs',
    color: '#FFAA33',
    image: '/products/Softplay_Ahemdabad.avif'
  },
  {
    id: 'outdoor', num: '04',
    title: 'Outdoor & Adventure',
    desc: 'Large scale outdoor equipment, ziplines, and adventure park structural builds designed for high-throughput and safety.',
    icon: '🧗',
    count: '15+ Types',
    color: '#C084FC',
    image: '/products/Softplay_New_Delhi.avif'
  },
]

const ATTRACTION_TAGS = [
  'Bowling Lanes', 'VR Gaming', 'Mini Golf', 'Trampoline Parks',
  'Go-Kart Tracks', 'Cricket Simulators', 'Ziplines', 'Rope Courses',
  'Soft Play Areas', 'Laser Tag', 'Bumper Cars', 'Rock Climbing',
]

const ProductsSection: FC<{ data?: any }> = ({ data }) => {
  const titleRef = useReveal()
  const tagsRef  = useReveal()
  const { state, addToEnquiry, logCTAEvent } = useLeadTracker()
  // Start open so mobile users see content without hover
  const [activeIdx, setActiveIdx] = useState<number>(0)
  
  const isAdded = (id: string) => state.enquiryCart.some(item => item.id === id)

  const activeCategories = [
    { ...CATEGORIES[0], count: data?.arcadeGamesCount || CATEGORIES[0].count },
    { ...CATEGORIES[1], count: data?.majorAttractionsCount || CATEGORIES[1].count },
    { ...CATEGORIES[2], count: data?.redemptionGamesCount || CATEGORIES[2].count },
    CATEGORIES[3]
  ]

  return (
    <section id="products" style={{ background: '#0B0B0F', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      
      {/* ── Dynamic Cinematic Backgrounds ── */}
      <AnimatePresence>
        {activeCategories.map((cat, i) => (
          activeIdx === i && (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,11,15,1) 0%, rgba(11,11,15,0.7) 40%, rgba(11,11,15,0.2) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,11,15,1) 0%, transparent 20%, transparent 80%, rgba(11,11,15,1) 100%)' }} />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', position: 'relative', zIndex: 1, padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 28px)', display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 5vw, 56px)' }}>

        {/* ── Title ──────────────────────────────────────── */}
        <div ref={titleRef} className="reveal" style={{ maxWidth: 600 }}>
          <div className="label" style={{ marginBottom: 20 }}>Distribution</div>
          <h2 className="font-display landing-section-heading" style={{ fontWeight: 400, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Equipment &<br />Attractions.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'var(--text-2)', margin: '24px 0 0', lineHeight: 1.7 }}>
            We source and distribute world-class FEC equipment globally — from a single arcade cabinet
            to a complete multi-zone entertainment destination.
          </p>
        </div>

        {/* ── Interactive List ──────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {activeCategories.map((cat, i) => {
            const isActive = activeIdx === i
            const isFaded = activeIdx !== i

            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveIdx(i)
                  }
                }}
                style={{
                  position: 'relative',
                  padding: 'clamp(20px, 4vw, 40px) 0',
                  borderTop: i === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  opacity: isFaded ? 0.45 : 1,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px 24px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)', flex: '1 1 auto', minWidth: 0 }}>
                  <span style={{ 
                    fontFamily: 'var(--font-data)', 
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)', 
                    fontWeight: 700, 
                    color: isActive ? cat.color : 'rgba(255,255,255,0.3)', 
                    transition: 'color 0.4s ease' 
                  }}>
                    {cat.num}
                  </span>
                  <h3 className="font-display" style={{ 
                    margin: 0, 
                    fontSize: 'clamp(1.25rem, 3vw, 2.5rem)', 
                    fontWeight: 400, 
                    letterSpacing: '-0.02em', 
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                    transition: 'color 0.4s ease, transform 0.4s ease',
                    transform: isActive ? 'translateX(6px)' : 'translateX(0px)',
                  }}>
                    {cat.title}
                  </h3>
                </div>

                {/* Expanding Content */}
                <div style={{ 
                  flex: '1 1 min(100%, 280px)', 
                  maxWidth: 480, 
                  width: '100%',
                  display: 'grid', 
                  gridTemplateRows: isActive ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden'
                }}>
                  <div style={{ minHeight: 0 }}>
                    <div style={{ 
                      padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3vw, 32px)', 
                      margin: '12px 0 24px 0',
                      background: 'rgba(0,0,0,0.7)', 
                      backdropFilter: 'blur(20px)', 
                      borderRadius: 20, 
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                      opacity: isActive ? 1 : 0, 
                      transition: 'opacity 0.3s ease 0.1s' 
                    }}>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#fff', lineHeight: 1.6, marginBottom: 24, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                        {cat.desc}
                      </p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-data)', 
                          fontSize: 12, 
                          fontWeight: 700, 
                          color: cat.color, 
                          letterSpacing: '0.1em', 
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}>
                          <span style={{ fontSize: 18 }}>{cat.icon}</span> {cat.count}
                        </span>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            addToEnquiry({ id: cat.id, type: 'product', title: cat.title })
                          }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 24px', borderRadius: 100,
                            border: 'none',
                            background: isAdded(cat.id) ? 'rgba(255,255,255,0.15)' : cat.color,
                            color: isAdded(cat.id) ? '#fff' : '#000',
                            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: isAdded(cat.id) ? 'none' : `0 4px 14px ${cat.color}60`
                          }}
                          onMouseEnter={e => {
                            if (!isAdded(cat.id)) {
                              e.currentTarget.style.transform = 'translateY(-2px)'
                              e.currentTarget.style.boxShadow = `0 6px 20px ${cat.color}80`
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isAdded(cat.id)) {
                              e.currentTarget.style.transform = 'translateY(0)'
                              e.currentTarget.style.boxShadow = `0 4px 14px ${cat.color}60`
                            }
                          }}
                        >
                          {isAdded(cat.id) ? (
                            <><Check size={16} /> Added</>
                          ) : (
                            <><Plus size={16} /> Add to Enquiry</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom Section (Tags & ROI) ──────────────────────────────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px, 4vw, 40px)', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          
          <div ref={tagsRef} className="reveal" style={{ flex: '1 1 min(100%, 280px)', maxWidth: 600, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-data)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 20 }}>
              Equipment Types We Cover
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {ATTRACTION_TAGS.map(tag => (
                <span key={tag} style={{
                  padding: '8px 16px', borderRadius: 100,
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'var(--text-2)', fontSize: 13, fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ flex: '0 0 auto' }}>
            <Link
              to="/products#roi"
              onClick={() => logCTAEvent('Landing: View ROI Models')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px', borderRadius: 100,
                background: 'linear-gradient(135deg, rgba(255,170,51,0.1) 0%, rgba(255,170,51,0.02) 100%)',
                border: '1px solid rgba(255,170,51,0.3)',
                color: 'var(--amber)', textDecoration: 'none',
                fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700,
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,170,51,0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(255,170,51,0.1) 0%, rgba(255,170,51,0.02) 100%)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
              }}
            >
              <BarChart size={18} />
              View Game ROI Models
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProductsSection
