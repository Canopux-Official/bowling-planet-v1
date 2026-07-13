/**
 * FranchiseInvestment — Investment tier comparison table
 * 6 tiers from Economy to Deluxe with a visual card switcher
 */
import { type FC, useState } from 'react'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'
import type { IFranchiseInvestmentTier } from '../../../services/franchisePageApi';

const ROWS = [
  { key: 'size',           label: 'Store Size' },
  { key: 'majorAttractions', label: 'Major Attractions' },
  { key: 'arcadeGames',    label: 'Arcade Games' },
  { key: 'otherHorizons',  label: 'Other Horizons' },
  { key: 'gamesCost',      label: 'Games Cost*' },
  { key: 'interiorCost',   label: 'Interior & Licensing' },
  { key: 'franchiseFee',   label: 'Franchise Fee' },
  { key: 'consultingFee',  label: 'Consulting Fee' },
  { key: 'totalInvestment', label: 'Total Investment' },
]

interface FranchiseInvestmentProps {
  tiers: IFranchiseInvestmentTier[];
}

const FranchiseInvestment: FC<FranchiseInvestmentProps> = ({ tiers }) => {
  const [selected, setSelected] = useState(3) // Standard by default (or index 3 if available)
  const headRef = useReveal()
  
  // Safe fallback if tiers are empty
  if (!tiers || tiers.length === 0) return null;
  
  const safeSelected = selected >= tiers.length ? 0 : selected;
  const tier = tiers[safeSelected];

  return (
    <section
      id="investment"
      style={{
        background: theme.colors.surface,
        padding: '120px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="orb orb-green" style={{ width: 500, height: 500, top: '-10%', left: '-5%' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>
            Investment Models
          </div>
          <h2 className="font-display text-metallic" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            marginBottom: 16,
          }}>
            Pick Your Scale, We'll Build Your Empire.
          </h2>
          <p style={{ color: theme.colors.text2, fontSize: 16, maxWidth: 540, margin: '0 auto' }}>
            Six investment tiers designed for every ambition — from a neighbourhood game lounge to a metro mega-complex.
          </p>
        </div>

        {/* Tier Selector */}
        <div style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          {tiers.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setSelected(i)}
              style={{
                padding: '10px 20px',
                borderRadius: 980,
                border: `1.5px solid ${safeSelected === i ? t.color : theme.colors.border}`,
                background: safeSelected === i ? `${t.color}20` : 'transparent',
                color: safeSelected === i ? t.color : theme.colors.text3,
                fontFamily: theme.typography.fontDisplay,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
            >
              {t.popular && (
                <span style={{
                  position: 'absolute',
                  top: -8,
                  right: -4,
                  background: t.color,
                  color: '#000',
                  fontSize: 9,
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: 8,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>Popular</span>
              )}
              {t.name}
            </button>
          ))}
        </div>

        {/* Detail Card */}
        <div
          className="glass-card investment-card"
          style={{
            padding: '48px',
            borderRadius: 24,
            borderColor: `${tier.color}40`,
            boxShadow: `0 0 60px ${tier.color}15`,
            transition: 'all 0.35s ease',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: tier.color, fontWeight: 700, fontFamily: theme.typography.fontBody, marginBottom: 8 }}>
                {tier.name} Tier
              </div>
              <div className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: tier.color, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {tier.totalInvestment}
              </div>
              <div style={{ color: theme.colors.text2, marginTop: 8, fontFamily: theme.typography.fontBody, fontSize: 14 }}>
                Total Investment*
              </div>
            </div>
            <div className="glass-card" style={{ padding: '16px 24px', borderRadius: 14, textAlign: 'right' }}>
              <div style={{ color: theme.colors.text3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Ideal For</div>
              <div style={{ color: theme.colors.text1, fontWeight: 700, fontFamily: theme.typography.fontDisplay, fontSize: 15 }}>{tier.ideal}</div>
            </div>
          </div>

          {/* Specs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {ROWS.map((row) => {
              const val = (tier as unknown as Record<string, unknown>)[row.key] as string | number
              const isTotal = row.key === 'totalInvestment'
              const isFree = row.key === 'franchiseFee'
              return (
                <div key={row.key} style={{
                  background: theme.colors.surface3,
                  borderRadius: 12,
                  padding: '16px 18px',
                  border: isTotal ? `1px solid ${tier.color}50` : `1px solid ${theme.colors.border}`,
                }}>
                  <div style={{ fontSize: 11, color: theme.colors.text3, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, fontFamily: theme.typography.fontBody, marginBottom: 6 }}>
                    {row.label}
                  </div>
                  <div style={{
                    fontFamily: theme.typography.fontDisplay,
                    fontWeight: 800,
                    fontSize: isTotal ? 20 : 17,
                    color: isTotal ? tier.color : isFree ? '#6DBD4E' : theme.colors.text1,
                    letterSpacing: '-0.02em',
                  }}>
                    {isFree ? '₹0 FREE' : val}
                  </div>
                </div>
              )
            })}
          </div>

          <p style={{ marginTop: 28, fontSize: 12, color: theme.colors.text3, fontFamily: theme.typography.fontBody }}>
            * Investments are approximate and may vary based on game curation, infrastructure, and other factors.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .investment-card { padding: 24px !important; border-radius: 16px !important; }
        }
      `}</style>
    </section>
  )
}

export default FranchiseInvestment

