/**
 * FranchiseTrustBar — Social proof strip
 * Numbers that speak before a user reads a single sentence
 */
import { type FC } from 'react'
import { theme } from '../../../theme'

const STATS = [
  { num: '17+', label: 'Years of Experience' },
  { num: '21+', label: 'High-End Projects Delivered' },
  { num: '700+', label: 'Game Options Available' },
  { num: '32%', label: 'Avg. Annual ROI' },
  { num: '₹0', label: 'Franchise Fees' },
]

const FranchiseTrustBar: FC = () => {
  return (
    <div
      className="trust-bar-wrapper"
      style={{
        background: theme.colors.surface,
        borderTop: `1px solid ${theme.colors.border}`,
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: '40px 28px',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 32,
        }}
      >
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign: 'center', flex: '1 1 140px' }}>
            <div
              className="stat-num"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', display: 'block' }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontSize: 12,
                color: theme.colors.text3,
                fontFamily: theme.typography.fontBody,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: 6,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .trust-bar-wrapper { padding: 32px 20px !important; }
        }
      `}</style>
    </div>
  )
}

export default FranchiseTrustBar

