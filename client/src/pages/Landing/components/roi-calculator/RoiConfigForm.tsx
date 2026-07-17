import { type FC } from 'react'

import {
  SIZE_OPTIONS,
  GAMES_OPTIONS,
  ATTRACTIONS_OPTIONS,
  TIER_OPTIONS,
  BUDGET_MIN_LAKHS,
  BUDGET_MAX_LAKHS,
} from './data/roidata'
import type { RoiInputs } from '../../../../hooks/useRoiMatch'
import { theme } from '../../../../theme'


interface RoiConfigFormProps {
  inputs: RoiInputs
  tier: number
  onChange: (next: Partial<RoiInputs>) => void
  onTierChange: (tier: number) => void
  matchedName: string
  matchColor: string
  matchScorePct: number
  onSubmit: () => void
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  background: theme.colors.surface2,
  border: `1px solid ${theme.colors.border}`,
  color: theme.colors.text1,
  fontFamily: theme.typography.fontBody,
  fontSize: 14,
  appearance: 'none',
  cursor: 'pointer',
}

const labelStyle: React.CSSProperties = {
  fontFamily: theme.typography.fontBody,
  fontSize: 12.5,
  fontWeight: 600,
  color: theme.colors.text2,
  marginBottom: 8,
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
}

const RoiConfigForm: FC<RoiConfigFormProps> = ({
  inputs,
  tier,
  onChange,
  onTierChange,
  matchedName,
  matchColor,
  matchScorePct,
  onSubmit,
}) => {
  return (
    <div
      className="bento-card"
      style={{
        background: `linear-gradient(135deg, ${matchColor}10, rgba(255,255,255,0.02))`,
        border: `1px solid ${matchColor}25`,
        borderRadius: 20,
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${matchColor}, transparent)`,
          opacity: 0.8,
        }}
      />

      {/* Live match badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, color: theme.colors.text2, fontFamily: theme.typography.fontBody, marginBottom: 4 }}>
            Closest matching format
          </div>
          <div className="font-display" style={{ fontSize: 26, fontWeight: 800, color: matchColor, letterSpacing: '-0.02em' }}>
            {matchedName}
          </div>
        </div>
        <div
          style={{
            fontFamily: theme.typography.fontBody,
            fontSize: 12.5,
            fontWeight: 700,
            color: matchColor,
            border: `1px solid ${matchColor}40`,
            background: `${matchColor}12`,
            borderRadius: 100,
            padding: '6px 14px',
          }}
        >
          {matchScorePct}% match
        </div>
      </div>

      {/* Budget slider */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>
          Budget available — ₹{inputs.budgetLakhs >= 100 ? (inputs.budgetLakhs / 100).toFixed(2) + ' Cr' : inputs.budgetLakhs.toFixed(0) + ' L'}
        </label>
        <input
          type="range"
          min={BUDGET_MIN_LAKHS}
          max={BUDGET_MAX_LAKHS}
          step={5}
          value={inputs.budgetLakhs}
          onChange={(e) => onChange({ budgetLakhs: Number(e.target.value) })}
          style={{
            width: '100%',
            accentColor: matchColor,
          }}
        />
      </div>

      {/* Dropdown grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 28 }}>
        <div>
          <label style={labelStyle}>Store size</label>
          <select
            style={selectStyle}
            value={inputs.sizeSqft}
            onChange={(e) => onChange({ sizeSqft: Number(e.target.value) })}
          >
            {SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Arcade games</label>
          <select
            style={selectStyle}
            value={inputs.games}
            onChange={(e) => onChange({ games: Number(e.target.value) })}
          >
            {GAMES_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Major attractions</label>
          <select
            style={selectStyle}
            value={inputs.attractions}
            onChange={(e) => onChange({ attractions: Number(e.target.value) })}
          >
            {ATTRACTIONS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>City tier</label>
          <select
            style={selectStyle}
            value={tier}
            onChange={(e) => onTierChange(Number(e.target.value))}
          >
            {TIER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="btn btn-primary btn-primary-green"
        style={{ width: '100%', textAlign: 'center', border: 'none', cursor: 'pointer' }}
      >
        Calculate my ROI report →
      </button>
    </div>
  )
}

export default RoiConfigForm