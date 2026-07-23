


import { useState, type FC } from 'react'
import { formatINR, getRoiRow, TIER_LABELS, type FranchiseType } from './data/roidata'
import { TrendingUp, BarChart3, Briefcase, Calendar, Users, PieChart, Receipt, LineChart } from 'lucide-react'
import { theme } from '../../../../theme'
import type { RoiInputs } from '../../../../hooks/useRoiMatch'

interface RoiResultsDisplayProps {
  matched: FranchiseType
  inputs: RoiInputs
  tier: number
}

type TabKey = 'chart' | 'capex' | 'pnl'

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'chart', label: '5-Yr Growth', icon: <LineChart size={15} /> },
  { key: 'capex', label: 'CapEx Breakdown', icon: <PieChart size={15} /> },
  { key: 'pnl', label: 'Monthly P&L', icon: <Receipt size={15} /> },
]

/**
 * Enhanced mini chart: 5-year ROI projection bars with smooth hover styling
 */
function RoiProjectionMini({ matched, tier }: { matched: FranchiseType; tier: number }) {
  const { row } = getRoiRow(matched.key, tier)
  const years = [1, 2, 3, 4, 5]
  const projections = years.map((year) => row.monthlyNetProfit * 12 * year - matched.totalInvestment)

  const maxVal = Math.max(...projections, 0)
  const minVal = Math.min(...projections, 0)
  const range = maxVal - minVal || 1

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200, paddingBottom: 8, paddingTop: 16 }}>
      {projections.map((val, idx) => {
        const norm = (val - minVal) / range
        const barHeight = Math.max(norm * 100, 8)
        const isPositive = val >= 0
        return (
          <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 11, color: theme.colors.text3, marginBottom: 8, fontWeight: 600 }}>
              {formatINR(val)}
            </div>
            <div
              style={{
                width: '100%',
                height: `${barHeight}px`,
                background: isPositive
                  ? `linear-gradient(180deg, ${matched.color}, ${matched.color}cc)`
                  : 'linear-gradient(180deg, #FF6B6B, #E05353)',
                borderRadius: '6px 6px 2px 2px',
                transition: 'all 0.3s ease',
                boxShadow: isPositive ? `0 4px 12px ${matched.color}20` : 'none',
              }}
              title={formatINR(val)}
            />
            <div style={{ fontSize: 11, color: theme.colors.text2, marginTop: 10, fontWeight: 600, opacity: 0.8 }}>
              Year {idx + 1}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Cost breakdown table
 */
function CostBreakdown({ matched }: { matched: FranchiseType }) {
  const costs = [
    { label: 'Games & equipment', value: matched.gamesCost },
    { label: 'Interior & setup', value: matched.interiorCost },
    { label: 'Pre-opening costs', value: matched.preOpeningCost },
  ]

  return (
    <div style={{ width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: theme.typography.fontBody, fontSize: 14 }}>
        <tbody>
          {costs.map((cost) => (
            <tr key={cost.label} style={{ borderBottom: `1px solid ${theme.colors.border}50` }}>
              <td style={{ padding: '14px 0', color: theme.colors.text2 }}>{cost.label}</td>
              <td style={{ padding: '14px 0', textAlign: 'right', color: theme.colors.text1, fontWeight: 600 }}>
                {formatINR(cost.value)}
              </td>
            </tr>
          ))}
          <tr style={{ fontWeight: 700, background: `${matched.color}06` }}>
            <td style={{ padding: '14px 12px', color: theme.colors.text1, borderRadius: '8px 0 0 8px' }}>Total Outlay</td>
            <td style={{ padding: '14px 12px', textAlign: 'right', color: matched.color, fontSize: 15, borderRadius: '0 8px 8px 0' }}>
              {formatINR(matched.totalInvestment)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

/**
 * Monthly operations breakdown
 */
function MonthlyBreakdown({ matched, tier }: { matched: FranchiseType; tier: number }) {
  const { row } = getRoiRow(matched.key, tier)

  const items = [
    { label: 'Gross Revenue', value: row.monthlyRevenue, highlight: true },
    { label: 'Operating Costs (Opex)', value: -row.monthlyOpex },
    { label: 'Interest Expenses', value: -row.monthlyInterest },
    { label: 'Estimated Taxes', value: -row.monthlyTaxes },
    { label: 'Franchise Royalty', value: -row.monthlyRoyalty },
  ]

  return (
    <div style={{ width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: theme.typography.fontBody, fontSize: 14 }}>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.label}
              style={{
                borderBottom: `1px solid ${theme.colors.border}50`,
                background: item.highlight ? `${matched.color}08` : 'transparent',
              }}
            >
              <td style={{ padding: '14px 12px', color: item.highlight ? matched.color : theme.colors.text2, fontWeight: item.highlight ? 600 : 400, borderRadius: item.highlight ? '8px 0 0 8px' : '0' }}>
                {item.label}
              </td>
              <td
                style={{
                  padding: '14px 12px',
                  textAlign: 'right',
                  color: item.highlight ? matched.color : item.value < 0 ? theme.colors.text2 : theme.colors.text1,
                  fontWeight: 600,
                  borderRadius: item.highlight ? '0 8px 8px 0' : '0'
                }}
              >
                {item.value > 0 ? '+' : ''}{formatINR(Math.abs(item.value))}
              </td>
            </tr>
          ))}
          <tr style={{ fontWeight: 700, background: `linear-gradient(90deg, ${matched.color}15, ${matched.color}05)`, marginTop: 4 }}>
            <td style={{ padding: '16px 12px', color: theme.colors.text1, borderRadius: '8px 0 0 8px' }}>Net Profit / Month</td>
            <td style={{ padding: '16px 12px', textAlign: 'right', color: matched.color, fontSize: 16, borderRadius: '0 8px 8px 0' }}>
              {formatINR(row.monthlyNetProfit)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

/**
 * Compact Key Metrics Cards
 */
function MetricCard({ icon, label, value, subtext, color }: { icon: React.ReactNode; label: string; value: string; subtext?: string; color: string }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
        border: `1px solid ${theme.colors.border}60`,
        borderRadius: 14,
        padding: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        minWidth: 0,
        flex: '1 1 160px', // Keeps grow: 1, shrink: 1, basis: 160px
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: color }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 12, color: theme.colors.text2, fontFamily: theme.typography.fontBody, marginBottom: 2 }}>
          {label}
        </div>
        <div className="font-display" style={{ fontSize: 20, fontWeight: 800, color: theme.colors.text1, letterSpacing: '-0.01em' }}>
          {value}
        </div>
        {subtext && (
          <div style={{ fontSize: 11, color: theme.colors.text3, marginTop: 2, fontFamily: theme.typography.fontBody }}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  )
}

const RoiResultsDisplay: FC<RoiResultsDisplayProps> = ({ matched, tier }) => {
  const { row } = getRoiRow(matched.key, tier)
  const [activeTab, setActiveTab] = useState<TabKey>('chart')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Title */}
      <div style={{ borderBottom: `1px solid ${theme.colors.border}40`, paddingBottom: 20 }}>
        <span style={{
          display: 'inline-flex',
          padding: '6px 12px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 700,
          background: `${matched.color}15`,
          color: matched.color,
          marginBottom: 12,
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Configured Solution Match
        </span>
        <h3 className="font-display" style={{ fontSize: 26, fontWeight: 800, color: theme.colors.text1, marginBottom: 8, letterSpacing: '-0.02em' }}>
          {matched.name} <span style={{ color: theme.colors.text3, fontWeight: 400 }}>in</span> {TIER_LABELS[tier]}
        </h3>
        <p style={{ fontSize: 14, color: theme.colors.text2, fontFamily: theme.typography.fontBody, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Users size={14} /> {row.weeklyFootfall.toLocaleString()} Traffic /wk</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> {row.breakEvenMonths} Mo. Payback</span>
        </p>
      </div>

      {/* Key Metrics Row */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <MetricCard
          icon={<Briefcase size={18} />}
          label="Capital Investment required"
          value={formatINR(matched.totalInvestment)}
          color={matched.color}
        />
        <MetricCard
          icon={<TrendingUp size={18} />}
          label="Year 1 Forecasted Profits"
          value={formatINR(row.monthlyNetProfit * 12)}
          subtext={`${row.annualRoiPct}% Projected Annual ROI`}
          color={matched.color}
        />
        <MetricCard
          icon={<BarChart3 size={18} />}
          label="Average Monthly Cashflow"
          value={formatINR(row.monthlyRevenue)}
          subtext={`Expected Clean Yield: ${formatINR(row.monthlyNetProfit)}/mo`}
          color={matched.color}
        />
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${theme.colors.border}40` }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: theme.typography.fontBody,
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? `2px solid ${matched.color}` : '2px solid transparent',
                color: isActive ? matched.color : theme.colors.text2,
                cursor: 'pointer',
                marginBottom: -1,
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div
        style={{
          background: `linear-gradient(135deg, ${matched.color}05, rgba(255,255,255,0.01))`,
          border: `1px solid ${theme.colors.border}60`,
          borderRadius: 16,
          padding: '24px',
          minHeight: 260,
        }}
      >
        {activeTab === 'chart' && (
          <>
            <h4 className="font-display" style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text1, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>
              5-Year Accumulative Equity Growth
            </h4>
            <RoiProjectionMini matched={matched} tier={tier} />
            <p style={{ fontSize: 11, color: theme.colors.text3, fontFamily: theme.typography.fontBody, marginTop: 12, lineHeight: 1.5 }}>
              *Projections account for asset initialization models. Real asset performance varies with localized operating standards and property micro-locations.
            </p>
          </>
        )}

        {activeTab === 'capex' && (
          <>
            <h4 className="font-display" style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text1, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Capital Expenditure (CapEx)
            </h4>
            <CostBreakdown matched={matched} />
          </>
        )}

        {activeTab === 'pnl' && (
          <>
            <h4 className="font-display" style={{ fontSize: 13, fontWeight: 700, color: theme.colors.text1, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Operational Pro-Forma (P&L Summary)
            </h4>
            <MonthlyBreakdown matched={matched} tier={tier} />
          </>
        )}
      </div>
    </div>
  )
}

export default RoiResultsDisplay