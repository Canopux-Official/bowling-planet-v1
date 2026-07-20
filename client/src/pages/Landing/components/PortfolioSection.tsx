/**
 * PortfolioSection — Bento-grid with filter tabs (layoutId reflow),
 * cursor-tracked spotlight on large card, and lightbox on click.
 */

import { type FC, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { X, ArrowRight } from 'lucide-react'
import { MOCK_PROJECTS } from '../../ProjectsPage/services/mockdata'

const CATEGORIES = ['All', 'Bowling', 'Softplay', 'Arcade', 'VR']

const DEFAULT_PROJECTS = MOCK_PROJECTS.slice(0, 6).map((p, i) => ({
  id: p._id || p.slug || String(i),
  name: p.title || '',
  image: p.media?.[0]?.url || '/products/Bowling_Lane_Dubai.avif',
  location: ['Dubai', 'Delhi', 'Ahmedabad', 'Calicut', 'Mumbai', 'Surat'][i % 6],
  category: ['Bowling', 'Softplay', 'Arcade', 'VR', 'Bowling', 'Softplay'][i % 6],
}))

/* ── Lightbox ─────────────────────────────────────────────────── */
const Lightbox: FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => (
  <AnimatePresence>
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.img
        className="lightbox-img"
        src={src}
        alt={alt}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 12, padding: 10, cursor: 'pointer',
          display: 'flex', color: '#fff', backdropFilter: 'blur(8px)',
        }}
      >
        <X size={20} />
      </button>
    </motion.div>
  </AnimatePresence>
)

/* ── Bento project card ───────────────────────────────────────── */
const ProjectCard: FC<{
  project: typeof DEFAULT_PROJECTS[0]
  large?: boolean
  onOpenLightbox: (src: string, alt: string) => void
  index: number
  isActive?: boolean
}> = ({ project, large, onOpenLightbox, index, isActive }) => {
  const reduced = useReducedMotion()
  const [hover, setHover] = useState(false)
  const activeState = isActive || hover

  return (
    <motion.div
      layout
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpenLightbox(project.image, project.name)}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        cursor: 'zoom-in',
        position: 'relative',
        background: '#0A0A0F',
        height: large ? 480 : 320,
        boxShadow: activeState ? `0 20px 50px rgba(168, 85, 247, 0.25)` : '0 10px 30px rgba(0,0,0,0.5)',
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, scale: { duration: 0.3 } }}
    >
      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: activeState ? 'grayscale(0%)' : 'grayscale(30%)' }}
        animate={{ scale: activeState ? 1.08 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Persistent subtle overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
      }} />

      {/* Info overlay (slides up slightly on hover) */}
      <motion.div 
        style={{ 
          position: 'absolute', bottom: 0, left: 0, right: 0, 
          padding: large ? '36px' : '24px',
          background: activeState ? 'linear-gradient(to top, rgba(168,85,247,0.2) 0%, rgba(20,10,25,0.85) 60%, transparent 100%)' : 'transparent',
          backdropFilter: activeState ? 'blur(8px)' : 'none',
        }}
        animate={{ y: activeState ? 0 : 10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#5FC1D1', background: 'rgba(95,193,209,0.15)',
            padding: '4px 12px', borderRadius: 100,
            border: '1px solid rgba(95,193,209,0.3)',
          }}>
            {project.category}
          </span>
          <motion.span 
            animate={{ opacity: activeState ? 1 : 0.6 }}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
              color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.05)',
              padding: '4px 12px', borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            📍 {project.location}
          </motion.span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: large ? 32 : 20, color: '#F5F5F7', lineHeight: 1.2, margin: 0 }}>
            {project.name}
          </h3>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: activeState ? 1 : 0, x: activeState ? 0 : -10 }}
            style={{
              width: 40, height: 40, borderRadius: '50%', background: '#5FC1D1', color: '#000',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <ArrowRight size={20} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── PortfolioSection ─────────────────────────────────────────── */
const PortfolioSection: FC<{ data?: { projectIds: any[] } }> = ({ data }) => {
  const titleRef = useReveal()
  const { logCTAEvent } = useLeadTracker()
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const projects = data?.projectIds?.length
    ? data.projectIds.map((p, i) => ({
        id: p._id || p.id,
        name: p.title || p.name,
        image: p.media?.[0]?.url || p.image || '/products/Bowling_Lane_Dubai.avif',
        location: ['Dubai', 'Delhi', 'Ahmedabad', 'Calicut'][i % 4],
        category: ['Bowling', 'Softplay', 'Arcade', 'VR'][i % 4],
      }))
    : DEFAULT_PROJECTS

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  useEffect(() => {
    setActiveIndex(0)
  }, [activeFilter])

  useEffect(() => {
    if (!filtered.length) return
    const cycle = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % Math.min(filtered.length, 5))
    }, 2500)
    return () => clearInterval(cycle)
  }, [filtered.length])

  return (
    <>
      <section
        id="portfolio"
        style={{ background: '#000', padding: '40px 28px', position: 'relative', overflow: 'hidden' }}
      >
        <div className="orb orb-green" style={{ width: 600, height: 600, top: '5%', right: '-8%', opacity: 0.25 }} />
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Heading */}
          <div ref={titleRef} className="reveal" style={{ marginBottom: 52 }}>
            <div className="label" style={{ marginBottom: 20 }}>Prestigious Projects</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <h2 className="font-display text-metallic" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                Our Work.
              </h2>
              <Link
                to="/projects"
                onClick={() => logCTAEvent('Landing: View All Projects')}
                className="btn btn-ghost"
                style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                View All Projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Filter tabs */}
          <LayoutGroup>
            <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    position: 'relative',
                    padding: '12px 24px',
                    borderRadius: 100,
                    border: `1px solid ${activeFilter === cat ? 'rgba(95,193,209,0.8)' : 'rgba(255,255,255,0.15)'}`,
                    background: activeFilter === cat ? 'rgba(95,193,209,0.15)' : 'rgba(255,255,255,0.02)',
                    color: activeFilter === cat ? '#5FC1D1' : 'rgba(255,255,255,0.7)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: activeFilter === cat ? '0 0 16px rgba(95,193,209,0.2)' : 'none',
                  }}
                >
                  {activeFilter === cat && (
                    <motion.div
                      layoutId="filter-pill"
                      style={{ position: 'absolute', inset: -1, borderRadius: 100, background: 'rgba(95,193,209,0.05)', border: '1px solid rgba(95,193,209,0.4)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
                </button>
              ))}
            </div>

            {/* Bento grid */}
            <AnimatePresence mode="popLayout">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {filtered.slice(0, 5).map((project, i) => (
                  <div
                    key={project.id}
                    style={{ gridColumn: i === 0 ? 'span 2' : 'span 1' }}
                  >
                    <ProjectCard
                      project={project}
                      large={i === 0}
                      index={i}
                      isActive={activeIndex === i}
                      onOpenLightbox={(src, alt) => setLightbox({ src, alt })}
                    />
                  </div>
                ))}
              </div>
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}

export default PortfolioSection
