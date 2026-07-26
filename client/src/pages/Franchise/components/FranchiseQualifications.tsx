/**
 * FranchiseQualifications — Partner requirements
 * Premium 2-col grid. 4 visible, rest behind "See More"
 */
import { type FC, useState } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

// Tag → color map
const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  Required:      { bg: 'rgba(95,193,209,0.12)',  color: '#5FC1D1' },
  'We Train You':{ bg: 'rgba(109,189,78,0.12)', color: '#6DBD4E' },
  'We Assist':   { bg: 'rgba(109,189,78,0.12)', color: '#6DBD4E' },
  'We Support':  { bg: 'rgba(255,170,51,0.12)',  color: '#FFAA33' },
  Mindset:       { bg: 'rgba(192,132,252,0.12)', color: '#C084FC' },
}

const QUALIFICATIONS = [
  {
    num: '01',
    title: 'Financial Readiness',
    desc: 'Demonstrated capacity to cover initial investment, ops expenses, and fees. You don\'t need to be a millionaire — just have a solid plan.',
    tag: 'Required',
  },
  {
    num: '02',
    title: 'Brand Commitment',
    desc: 'Willingness to uphold our brand identity, customer service standards, and operational excellence. Your reputation becomes ours.',
    tag: 'Required',
  },
  {
    num: '03',
    title: 'Location Access',
    desc: 'Ability to secure a high-traffic, accessible site. We analyse and evaluate — you finalise the deal.',
    tag: 'Required',
  },
  {
    num: '04',
    title: 'Long-Term Vision',
    desc: 'Dedication to building a lasting, profitable entertainment destination. We\'re in this for years, not months.',
    tag: 'Mindset',
  },
  // --- Hidden by default ---
  {
    num: '05',
    title: 'Training Participation',
    desc: 'Our hands-on program covers game ops, customer service, and business management. No prior FEC experience needed.',
    tag: 'We Train You',
  },
  {
    num: '06',
    title: 'Legal Compliance',
    desc: 'Adherence to local and national FEC regulations. We guide you through every license, NOC, and approval needed.',
    tag: 'We Assist',
  },
  {
    num: '07',
    title: 'Local Marketing Drive',
    desc: 'Commitment to running local marketing initiatives. We provide proven playbooks, campaigns, and creative assets.',
    tag: 'We Support',
  },
]

const VISIBLE_DEFAULT = 4

const FranchiseQualifications: FC = () => {
  const headRef = useReveal()
  const listRef = useReveal()
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? QUALIFICATIONS : QUALIFICATIONS.slice(0, VISIBLE_DEFAULT)

  return (
    <section
      style={{
        background: theme.colors.void,
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="orb orb-green" style={{ width: 500, height: 500, bottom: '-10%', left: '-5%' }} />
      <div className="grid-bg" aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 8 }}>
            Partner Qualifications
          </div>
          <h2 className="font-display text-metallic" style={{
            fontSize: 'clamp(1.35rem, 2.8vw, 1.85rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}>
            Partner fit
          </h2>
          <p style={{ color: theme.colors.text2, fontSize: 14, maxWidth: 480, margin: '0 auto' }}>
            Core requirements—most skills we help you build.
          </p>
        </div>

        {/* 2-col grid */}
        <div
          ref={listRef}
          className="reveal qual-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            marginBottom: 24,
          }}
        >
          {visible.map((q) => {
            const ts = TAG_STYLES[q.tag] ?? TAG_STYLES['Required']
            return (
              <div
                key={q.num}
                style={{
                  padding: '20px',
                  borderRadius: 16,
                  background: `linear-gradient(180deg, ${ts.color}05, rgba(255,255,255,0.01))`,
                  border: `1px solid ${ts.color}15`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${ts.color}35`;
                  (e.currentTarget as HTMLElement).style.background = `linear-gradient(180deg, ${ts.color}08, rgba(255,255,255,0.02))`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${ts.color}12`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${ts.color}15`;
                  (e.currentTarget as HTMLElement).style.background = `linear-gradient(180deg, ${ts.color}05, rgba(255,255,255,0.01))`;
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Accent top stripe */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${ts.color}, transparent)` }} />

                {/* Number + Tag row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: theme.typography.fontDisplay,
                    fontWeight: 800,
                    fontSize: 36,
                    color: `${ts.color}20`,
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                  }}>
                    {q.num}
                  </span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '5px 12px',
                    borderRadius: 6,
                    background: ts.bg,
                    color: ts.color,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: theme.typography.fontBody,
                  }}>
                    {q.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: theme.typography.fontDisplay,
                  fontWeight: 700,
                  fontSize: 20,
                  color: theme.colors.text1,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}>
                  {q.title}
                </h3>

                {/* Desc */}
                <p style={{
                  fontSize: 14,
                  color: theme.colors.text2,
                  lineHeight: 1.7,
                  fontFamily: theme.typography.fontBody,
                  flex: 1,
                }}>
                  {q.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* See More / See Less toggle */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid rgba(255,255,255,0.12)`,
              borderRadius: 12,
              padding: '14px 36px',
              color: theme.colors.text1,
              fontFamily: theme.typography.fontDisplay,
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = `${theme.colors.teal}60`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
            }}
          >
            <span>{expanded ? 'See Less' : `See ${QUALIFICATIONS.length - VISIBLE_DEFAULT} More Qualifications`}</span>
            <span style={{
              display: 'inline-block',
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease',
              fontSize: 12,
            }}>▾</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .qual-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default FranchiseQualifications


