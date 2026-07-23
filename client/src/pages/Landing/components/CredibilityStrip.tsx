/**
 * CredibilityStrip — Chalk/white section with animated count-up stats
 * and IAPPA/authority badge chips with hover tooltips.
 * Sits immediately below the hero as the "proof" layer.
 */

import { type FC, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/* ── Count-up hook ────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, startDelay = 0): number {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (target === 0 || started.current) return
    started.current = true
    const timer = setTimeout(() => {
      const startTime = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, startDelay)
    return () => clearTimeout(timer)
  }, [target, duration, startDelay])

  return count
}

/* ── Stat chip with count-up + tilt ──────────────────────────── */
const StatChip: FC<{
  num: string
  label: string
  delay: number
  isVisible: boolean
}> = ({ num, label, delay, isVisible }) => {
  const reduced = useReducedMotion()
  const [tilted, setTilted] = useState(false)

  const numericPart = parseInt(num.replace(/\D/g, '')) || 0
  const suffix = num.replace(/[\d]/g, '')
  const counted = useCountUp(isVisible && !reduced ? numericPart : 0, 1600, delay)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setTilted(true)}
      onMouseLeave={() => setTilted(false)}
      style={{
        textAlign: 'center',
        padding: 'clamp(20px, 4vw, 28px) clamp(12px, 3vw, 20px)',
        flex: 1,
        minWidth: 0,
        borderRight: '1px solid rgba(255,255,255,0.1)',
        transform: tilted && !reduced ? 'perspective(600px) rotateX(4deg) translateY(-3px)' : 'none',
        transition: 'transform 0.3s var(--ease-out)',
        cursor: 'default',
      }}
    >
      <motion.div 
        animate={{ 
          filter: [
            'drop-shadow(0 0 0px rgba(95,193,209,0)) hue-rotate(0deg)', 
            'drop-shadow(0 0 32px rgba(109,189,78,0.9)) hue-rotate(-60deg)',
            'drop-shadow(0 0 0px rgba(95,193,209,0)) hue-rotate(0deg)'
          ],
          scale: [1, 1.15, 1],
          y: [0, -8, 0]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: delay / 1000 }}
        style={{
          fontFamily: 'var(--font-data)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: '#F5F5F7',
          background: 'linear-gradient(135deg, #ffffff 0%, #5FC1D1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {numericPart ? `${counted}${suffix}` : num}
      </motion.div>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(245,245,247,0.6)',
      }}>
        {label}
      </div>
    </motion.div>
  )
}

/* ── Badge chip with tooltip ──────────────────────────────────── */
// const BadgeChip: FC<{
//   label: string
//   tooltip: string
//   color: string
//   delay: number
//   isVisible: boolean
// }> = ({ label, tooltip, color, delay, isVisible }) => {
//   const [open, setOpen] = useState(false)

//   return (
//     <div style={{ background: '#000', position: 'relative', display: 'inline-block' }}>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={isVisible ? { opacity: 1, scale: 1 } : {}}
//         transition={{ duration: 0.5, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
//         onMouseEnter={() => setOpen(true)}
//         onMouseLeave={() => setOpen(false)}
//         onFocus={() => setOpen(true)}
//         onBlur={() => setOpen(false)}
//         role="button"
//         tabIndex={0}
//         aria-label={`${label}: ${tooltip}`}
//         style={{
//           display: 'inline-flex',
//           alignItems: 'center',
//           gap: 6,
//           padding: '8px 16px',
//           borderRadius: 100,
//           border: `1.5px solid ${color}30`,
//           background: `${color}10`,
//           cursor: 'default',
//           transition: 'all 0.25s ease',
//           ...(open ? {
//             background: `${color}18`,
//             border: `1.5px solid ${color}60`,
//             transform: 'translateY(-2px)',
//             boxShadow: `0 8px 24px ${color}18`,
//           } : {}),
//         }}
//       >
//         <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
//         <span style={{
//           fontFamily: 'var(--font-sans)',
//           fontSize: 12,
//           fontWeight: 700,
//           letterSpacing: '0.06em',
//           textTransform: 'uppercase',
//           color: '#F5F5F7',
//         }}>
//           {label}
//         </span>
//       </motion.div>
//       {/* Tooltip */}
//       {open && (
//         <div
//           role="tooltip"
//           style={{
//             position: 'absolute',
//             bottom: '110%',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             whiteSpace: 'nowrap',
//             background: '#F5F5F7',
//             color: '#F5F5F7',
//             fontSize: 11,
//             fontFamily: 'var(--font-sans)',
//             fontWeight: 500,
//             lineHeight: 1.5,
//             padding: '7px 12px',
//             borderRadius: 8,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
//             zIndex: 10,
//             maxWidth: 240,
//             textAlign: 'center',
//             whiteSpace: 'normal',
//           } as React.CSSProperties}
//         >
//           {tooltip}
//           <div style={{
//             position: 'absolute',
//             top: '100%', left: '50%',
//             transform: 'translateX(-50%)',
//             borderWidth: '5px 5px 0',
//             borderStyle: 'solid',
//             borderColor: '#F5F5F7 transparent transparent',
//           }} />
//         </div>
//       )}
//     </div>
//   )
// }

/* ── CredibilityStrip ─────────────────────────────────────────── */
const CredibilityStrip: FC<{ data?: any }> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  const stats = [
    { num: data?.yearsOfExperience || '17+', label: 'Years of Experience' },
    { num: data?.projectsDelivered || '50+', label: 'Projects Delivered' },
    { num: data?.productsAndEquip || '700+', label: 'Products & Equipment' },
    { num: data?.citiesServed || '10+', label: 'Cities Served' },
  ]

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="credibility"
      ref={ref}

      style={{ background: '#000', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle grid on light bg */}
      <div aria-hidden="true" className="grid-bg" style={{ background: '#000', position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(16px, 4vw, 28px)', position: 'relative', zIndex: 1 }}>
        {/* Stats row */}
        <div
          className="credibility-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {stats.map((s, i) => (
            <StatChip
              key={s.label}
              num={s.num}
              label={s.label}
              delay={i * 120}
              isVisible={isVisible}
            />
          ))}
        </div>


      </div>
    </section>
  )
}

export default CredibilityStrip
