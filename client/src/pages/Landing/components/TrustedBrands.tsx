/**
 * TrustedBrands — Chalk/light section with scroll-direction-aware marquee
 * and click-to-detail brand project modal.
 */

import { type FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '../../../hooks/useScrollDirection'
import { useReveal } from '../../../hooks/useReveal'
import { X } from 'lucide-react'

interface BrandInfo {
  name: string
  note: string
  year: string
  category: string
}

const BRANDS: BrandInfo[] = [
  { name: 'Roongta Group',  note: '4 bowling lanes installed across cinema multiplexes', year: '2022', category: 'Cinema / FEC' },
  { name: 'Woop',           note: 'Full FEC layout design and equipment supply',          year: '2021', category: 'FEC'          },
  { name: 'Shott',          note: 'Pre-opening consulting and staffing framework',         year: '2022', category: 'FEC'          },
  { name: 'Idea Crate',     note: 'Game selection, ROI modeling, operations setup',        year: '2020', category: 'FEC'          },
  { name: 'Playaza',        note: 'Arcade sourcing and redemption game distribution',      year: '2023', category: 'Arcade'       },
  { name: 'KidZania',       note: 'Equipment supply and venue advisory',                   year: '2019', category: 'FEC'          },
  { name: 'Cinemax',        note: 'FEC annexe consulting for multiplex lobby revenue',     year: '2018', category: 'Cinema'       },
  { name: 'Inox',           note: 'Bowling and VR integration advisory',                   year: '2019', category: 'Cinema'       },
  { name: 'Essel World',    note: 'Major attraction sourcing and ops consulting',           year: '2020', category: 'Theme Park'   },
]

const BrandModal: FC<{ brand: BrandInfo; onClose: () => void }> = ({ brand, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '36px 40px',
          maxWidth: 440,
          width: '100%',
          boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'var(--chalk)', border: 'none',
            borderRadius: 8, padding: 8, cursor: 'pointer',
            display: 'flex', color: 'rgba(245,245,247,0.8)',
          }}
        >
          <X size={16} />
        </button>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 100,
          background: 'rgba(95,193,209,0.1)',
          border: '1px solid rgba(95,193,209,0.3)',
          marginBottom: 16,
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: '#5FC1D1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {brand.category}
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: '#F5F5F7', marginBottom: 12, lineHeight: 1.1 }}>
          {brand.name}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(245,245,247,0.8)', lineHeight: 1.7, marginBottom: 20 }}>
          {brand.note}
        </p>
        <div style={{
          padding: '12px 16px',
          background: 'var(--chalk)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'rgba(245,245,247,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Year
          </span>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: 18, fontWeight: 800, color: '#F5F5F7' }}>
            {brand.year}
          </span>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)

const BrandCard: FC<{ brand: BrandInfo; i: number; onClick: () => void }> = ({ brand, i, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
      background: 'rgba(255,255,255,0.02)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.06)',
      padding: '32px 48px',
      borderRadius: 24,
      minWidth: 360,
      height: 140,
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.borderColor = 'rgba(95,193,209,0.3)'
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4), inset 0 0 20px rgba(95,193,209,0.05)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: i % 2 === 0 ? '#5FC1D1' : '#6DBD4E',
        boxShadow: `0 0 12px ${i % 2 === 0 ? 'rgba(95,193,209,0.6)' : 'rgba(109,189,78,0.6)'}`
      }} />
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 700,
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em'
      }}>
        {brand.category}
      </span>
    </div>
    <span style={{
      fontFamily: 'var(--font-data)',
      fontWeight: 800,
      fontSize: 28,
      letterSpacing: '-0.02em',
      color: '#fff',
      whiteSpace: 'nowrap',
    }}>
      {brand.name}
    </span>
  </button>
)

const TrustedBrands: FC<{ data?: string[] }> = ({ data }) => {
  const ref = useReveal()
  const scrollDir = useScrollDirection()
  const [selected, setSelected] = useState<BrandInfo | null>(null)

  const activeBrands: BrandInfo[] = data && data.length > 0
    ? data.map(name => BRANDS.find(b => b.name === name) || { name, note: 'Trusted partner.', year: '', category: 'FEC' })
    : BRANDS

  const marqueeDir = scrollDir === 'up' ? 'reverse' : 'normal'

  return (
    <>
      <section
        id="trusted"
        style={{ 
          padding: '60px 0 60px 0', 
          position: 'relative', 
          overflow: 'hidden', 
          background: '#000',
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          borderBottom: '1px solid rgba(255,255,255,0.05)' 
        }}
      >
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '80%', height: '80%', background: 'radial-gradient(ellipse at center, rgba(95,193,209,0.05) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div ref={ref} className="reveal" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: 64, padding: '0 24px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 400,
              color: '#fff',
              letterSpacing: '-0.02em',
              marginBottom: 16,
              lineHeight: 1.1
            }}>
              Trusted by India's Leading<br />
              <span style={{ color: '#5FC1D1', fontStyle: 'italic' }}>FEC & Cinema Brands</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 500,
              margin: '0 auto',
            }}>
              Click any partner card to view the specific ROI modeling, equipment supply, and consulting work we executed.
            </p>
          </div>

          {/* Triple Marquee Container */}
          <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Fade edges */}
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 150, background: 'linear-gradient(to right, #000, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 150, background: 'linear-gradient(to left, #000, transparent)', zIndex: 2, pointerEvents: 'none' }} />

            {(() => {
              const chunkSize = Math.max(1, Math.ceil(activeBrands.length / 3));
              const row1Brands = activeBrands.slice(0, chunkSize);
              const row2Brands = activeBrands.slice(chunkSize, chunkSize * 2);
              const row3Brands = activeBrands.slice(chunkSize * 2);

              return (
                <>
                  {/* Row 1 (Moves Left) */}
                  {row1Brands.length > 0 && (
                    <div
                      style={{
                        display: 'flex', gap: 24, width: 'max-content',
                        animation: `marquee1 35s linear infinite`,
                        animationDirection: 'normal',
                      }}
                    >
                      {[...row1Brands, ...row1Brands, ...row1Brands, ...row1Brands].map((brand, i) => (
                        <BrandCard key={`r1-${i}`} brand={brand} i={i} onClick={() => setSelected(brand)} />
                      ))}
                    </div>
                  )}

                  {/* Row 2 (Moves Right) */}
                  {row2Brands.length > 0 && (
                    <div
                      style={{
                        display: 'flex', gap: 24, width: 'max-content',
                        animation: `marquee2 35s linear infinite`,
                        animationDirection: 'normal',
                        transform: 'translateX(-50%)', // start offset
                      }}
                    >
                      {[...row2Brands, ...row2Brands, ...row2Brands, ...row2Brands].map((brand, i) => (
                        <BrandCard key={`r2-${i}`} brand={brand} i={i + 10} onClick={() => setSelected(brand)} />
                      ))}
                    </div>
                  )}

                  {/* Row 3 (Moves Left) */}
                  {row3Brands.length > 0 && (
                    <div
                      style={{
                        display: 'flex', gap: 24, width: 'max-content',
                        animation: `marquee1 40s linear infinite`, // slightly slower to desync from row 1
                        animationDirection: 'normal',
                      }}
                    >
                      {[...row3Brands, ...row3Brands, ...row3Brands, ...row3Brands].map((brand, i) => (
                        <BrandCard key={`r3-${i}`} brand={brand} i={i + 20} onClick={() => setSelected(brand)} />
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        <style>{`
          @keyframes marquee1 {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee2 {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* Brand detail modal */}
      {selected && <BrandModal brand={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

export default TrustedBrands
