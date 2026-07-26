import type { FC } from 'react'
import SEO from '../../components/SEO'
import BlogsColumn from './components/BlogsColumn'
import ResourcesColumn from './components/ResourcesColumn'
import { theme } from '../../theme'
import { useReveal } from '../../hooks/useReveal'

const InsightsPage: FC = () => {
  const headRef = useReveal()

  return (
    <>
      <SEO 
        title="Insights & Resources" 
        description="Practical notes, blogs, and downloadable tools for FEC operators, investors, and destination partners."
      />
      {/* Hero */}
      <section style={{ background: theme.colors.void, padding: '140px 28px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-teal" style={{ width: 700, height: 600, top: '-25%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
        <div className="orb orb-green" style={{ width: 300, height: 300, bottom: '-5%', right: '-5%' }} />
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div ref={headRef} className="reveal" style={{ textAlign: 'center' }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', marginBottom: 24 }}>
              <span className="text-metallic" style={{ display: 'block' }}>Blogs &</span>
              <span className="text-gradient-brand" style={{ display: 'block' }}>Resources</span>
            </h1>
            <p style={{ fontSize: 17, color: theme.colors.text2, maxWidth: 520, margin: '0 auto', lineHeight: 1.75, fontFamily: theme.typography.fontBody }}>
              Practical notes and downloadable tools for FEC operators, investors and destination partners.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: theme.colors.surface, padding: '60px 28px 80px', position: 'relative' }}>
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="insights-columns" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32, alignItems: 'start' }}>
            <BlogsColumn />
            <ResourcesColumn />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) { .insights-columns { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}

export default InsightsPage
