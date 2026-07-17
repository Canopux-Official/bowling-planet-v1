/**
 * ROI Calculator — Data
 * ──────────────────────────────────────
 * Ported 1:1 from the original HTML calculator's TYPES / ROI tables.
 * Update figures here only — components read from this file.
 */

export interface FranchiseType {
  key: 'economy' | 'value' | 'basic' | 'standard' | 'premium' | 'deluxe'
  name: string
  order: number
  color: string
  sizeSqft: number
  attractions: number
  games: number
  otherHorizons: number
  gamesCost: number
  interiorCost: number
  preOpeningCost: number
  totalInvestment: number
}

export interface RoiRow {
  tier: number
  monthlyRevenue: number
  weeklyFootfall: number
  monthlyOpex: number
  monthlyInterest: number
  monthlyTaxes: number
  monthlyRoyalty: number
  monthlyNetProfit: number
  breakEvenMonths: number
  annualRoiPct: number
}

export const FRANCHISE_TYPES: FranchiseType[] = [
  { key: 'economy',  name: 'Economy',  order: 0, color: '#5FC1D1', sizeSqft: 1500,  attractions: 0,  games: 8,  otherHorizons: 0, gamesCost: 2800000,   interiorCost: 500000,   preOpeningCost: 200000,  totalInvestment: 3500000 },
  { key: 'value',    name: 'Value',    order: 1, color: '#6DBD4E', sizeSqft: 3000,  attractions: 1,  games: 10, otherHorizons: 0, gamesCost: 5350000,   interiorCost: 900000,   preOpeningCost: 250000,  totalInvestment: 6500000 },
  { key: 'basic',    name: 'Basic',    order: 2, color: '#FFAA33', sizeSqft: 6000,  attractions: 2,  games: 14, otherHorizons: 0, gamesCost: 20000000,  interiorCost: 4500000,  preOpeningCost: 400000,  totalInvestment: 25000000 },
  { key: 'standard', name: 'Standard', order: 3, color: '#C084FC', sizeSqft: 12000, attractions: 5,  games: 32, otherHorizons: 1, gamesCost: 55000000,  interiorCost: 14000000, preOpeningCost: 800000,  totalInvestment: 70000000 },
  { key: 'premium',  name: 'Premium',  order: 4, color: '#FF6B9D', sizeSqft: 20000, attractions: 8,  games: 45, otherHorizons: 3, gamesCost: 95000000,  interiorCost: 24000000, preOpeningCost: 1050000, totalInvestment: 120000000 },
  { key: 'deluxe',   name: 'Deluxe',   order: 5, color: '#4A9EFF', sizeSqft: 35000, attractions: 12, games: 55, otherHorizons: 5, gamesCost: 158000000, interiorCost: 40000000, preOpeningCost: 1500000, totalInvestment: 200000000 },
]

export const ROI_TABLE: Record<FranchiseType['key'], RoiRow[]> = {
  economy: [
    { tier: 1, monthlyRevenue: 550000,  weeklyFootfall: 340,  monthlyOpex: 247000,  monthlyInterest: 21000,  monthlyTaxes: 99000,   monthlyRoyalty: 27000,  monthlyNetProfit: 155000,  breakEvenMonths: 23, annualRoiPct: 53 },
    { tier: 2, monthlyRevenue: 450000,  weeklyFootfall: 320,  monthlyOpex: 202000,  monthlyInterest: 21000,  monthlyTaxes: 81000,   monthlyRoyalty: 22000,  monthlyNetProfit: 123000,  breakEvenMonths: 28, annualRoiPct: 42 },
    { tier: 3, monthlyRevenue: 350000,  weeklyFootfall: 280,  monthlyOpex: 157000,  monthlyInterest: 21000,  monthlyTaxes: 63000,   monthlyRoyalty: 17000,  monthlyNetProfit: 91000,   breakEvenMonths: 38, annualRoiPct: 31 },
    { tier: 4, monthlyRevenue: 250000,  weeklyFootfall: 260,  monthlyOpex: 100000,  monthlyInterest: 21000,  monthlyTaxes: 45000,   monthlyRoyalty: 12000,  monthlyNetProfit: 71000,   breakEvenMonths: 49, annualRoiPct: 25 },
    { tier: 5, monthlyRevenue: 200000,  weeklyFootfall: 225,  monthlyOpex: 70000,   monthlyInterest: 21000,  monthlyTaxes: 36000,   monthlyRoyalty: 10000,  monthlyNetProfit: 63000,   breakEvenMonths: 56, annualRoiPct: 22 },
  ],
  value: [
    { tier: 1, monthlyRevenue: 950000,  weeklyFootfall: 580,  monthlyOpex: 427000,  monthlyInterest: 39000,  monthlyTaxes: 171000,  monthlyRoyalty: 47000,  monthlyNetProfit: 265000,  breakEvenMonths: 25, annualRoiPct: 49 },
    { tier: 2, monthlyRevenue: 800000,  weeklyFootfall: 550,  monthlyOpex: 360000,  monthlyInterest: 39000,  monthlyTaxes: 144000,  monthlyRoyalty: 40000,  monthlyNetProfit: 217000,  breakEvenMonths: 30, annualRoiPct: 40 },
    { tier: 3, monthlyRevenue: 630000,  weeklyFootfall: 500,  monthlyOpex: 283000,  monthlyInterest: 39000,  monthlyTaxes: 113000,  monthlyRoyalty: 31000,  monthlyNetProfit: 163000,  breakEvenMonths: 40, annualRoiPct: 30 },
    { tier: 4, monthlyRevenue: 450000,  weeklyFootfall: 450,  monthlyOpex: 180000,  monthlyInterest: 39000,  monthlyTaxes: 81000,   monthlyRoyalty: 22000,  monthlyNetProfit: 127000,  breakEvenMonths: 51, annualRoiPct: 24 },
    { tier: 5, monthlyRevenue: 350000,  weeklyFootfall: 390,  monthlyOpex: 122000,  monthlyInterest: 39000,  monthlyTaxes: 63000,   monthlyRoyalty: 17000,  monthlyNetProfit: 108000,  breakEvenMonths: 60, annualRoiPct: 20 },
  ],
  basic: [
    { tier: 1, monthlyRevenue: 3800000, weeklyFootfall: 2350, monthlyOpex: 1710000, monthlyInterest: 150000, monthlyTaxes: 684000,  monthlyRoyalty: 190000, monthlyNetProfit: 1066000, breakEvenMonths: 23, annualRoiPct: 51 },
    { tier: 2, monthlyRevenue: 3050000, weeklyFootfall: 2100, monthlyOpex: 1372000, monthlyInterest: 150000, monthlyTaxes: 549000,  monthlyRoyalty: 152000, monthlyNetProfit: 826000,  breakEvenMonths: 30, annualRoiPct: 40 },
    { tier: 3, monthlyRevenue: 2300000, weeklyFootfall: 1850, monthlyOpex: 1035000, monthlyInterest: 150000, monthlyTaxes: 414000,  monthlyRoyalty: 115000, monthlyNetProfit: 586000,  breakEvenMonths: 43, annualRoiPct: 28 },
    { tier: 4, monthlyRevenue: 1800000, weeklyFootfall: 1700, monthlyOpex: 720000,  monthlyInterest: 150000, monthlyTaxes: 324000,  monthlyRoyalty: 90000,  monthlyNetProfit: 516000,  breakEvenMonths: 48, annualRoiPct: 25 },
    { tier: 5, monthlyRevenue: 1300000, weeklyFootfall: 1400, monthlyOpex: 455000,  monthlyInterest: 150000, monthlyTaxes: 234000,  monthlyRoyalty: 65000,  monthlyNetProfit: 396000,  breakEvenMonths: 63, annualRoiPct: 19 },
  ],
  standard: [
    { tier: 1, monthlyRevenue: 11000000, weeklyFootfall: 6800, monthlyOpex: 4950000, monthlyInterest: 420000, monthlyTaxes: 1980000, monthlyRoyalty: 550000, monthlyNetProfit: 3100000, breakEvenMonths: 23, annualRoiPct: 53 },
    { tier: 2, monthlyRevenue: 9000000,  weeklyFootfall: 6200, monthlyOpex: 4050000, monthlyInterest: 420000, monthlyTaxes: 1620000, monthlyRoyalty: 450000, monthlyNetProfit: 2460000, breakEvenMonths: 28, annualRoiPct: 42 },
    { tier: 3, monthlyRevenue: 6500000,  weeklyFootfall: 5200, monthlyOpex: 2925000, monthlyInterest: 420000, monthlyTaxes: 1170000, monthlyRoyalty: 325000, monthlyNetProfit: 1660000, breakEvenMonths: 42, annualRoiPct: 28 },
    { tier: 4, monthlyRevenue: 5000000,  weeklyFootfall: 4700, monthlyOpex: 2000000, monthlyInterest: 420000, monthlyTaxes: 900000,  monthlyRoyalty: 250000, monthlyNetProfit: 1430000, breakEvenMonths: 49, annualRoiPct: 25 },
    { tier: 5, monthlyRevenue: 3500000,  weeklyFootfall: 3800, monthlyOpex: 1225000, monthlyInterest: 420000, monthlyTaxes: 630000,  monthlyRoyalty: 175000, monthlyNetProfit: 1050000, breakEvenMonths: 67, annualRoiPct: 18 },
  ],
  premium: [
    { tier: 1, monthlyRevenue: 18000000, weeklyFootfall: 11000, monthlyOpex: 8100000, monthlyInterest: 720000, monthlyTaxes: 3240000, monthlyRoyalty: 900000, monthlyNetProfit: 5040000, breakEvenMonths: 24, annualRoiPct: 50 },
    { tier: 2, monthlyRevenue: 15000000, weeklyFootfall: 10000, monthlyOpex: 6750000, monthlyInterest: 720000, monthlyTaxes: 2700000, monthlyRoyalty: 750000, monthlyNetProfit: 4080000, breakEvenMonths: 29, annualRoiPct: 41 },
    { tier: 3, monthlyRevenue: 11000000, weeklyFootfall: 8800,  monthlyOpex: 4950000, monthlyInterest: 720000, monthlyTaxes: 1980000, monthlyRoyalty: 550000, monthlyNetProfit: 2800000, breakEvenMonths: 43, annualRoiPct: 28 },
    { tier: 4, monthlyRevenue: 7500000,  weeklyFootfall: 7500,  monthlyOpex: 3000000, monthlyInterest: 720000, monthlyTaxes: 1350000, monthlyRoyalty: 375000, monthlyNetProfit: 2055000, breakEvenMonths: 58, annualRoiPct: 21 },
    { tier: 5, monthlyRevenue: 5500000,  weeklyFootfall: 6200,  monthlyOpex: 1925000, monthlyInterest: 720000, monthlyTaxes: 990000,  monthlyRoyalty: 275000, monthlyNetProfit: 1590000, breakEvenMonths: 75, annualRoiPct: 16 },
  ],
  deluxe: [
    { tier: 1, monthlyRevenue: 30000000, weeklyFootfall: 18500, monthlyOpex: 13500000, monthlyInterest: 1200000, monthlyTaxes: 5400000, monthlyRoyalty: 1500000, monthlyNetProfit: 8400000, breakEvenMonths: 24, annualRoiPct: 50 },
    { tier: 2, monthlyRevenue: 25000000, weeklyFootfall: 17000, monthlyOpex: 11200000, monthlyInterest: 1200000, monthlyTaxes: 4500000, monthlyRoyalty: 1250000, monthlyNetProfit: 6800000, breakEvenMonths: 29, annualRoiPct: 41 },
    { tier: 3, monthlyRevenue: 18000000, weeklyFootfall: 14500, monthlyOpex: 8100000,  monthlyInterest: 1200000, monthlyTaxes: 3240000, monthlyRoyalty: 900000,  monthlyNetProfit: 4560000, breakEvenMonths: 44, annualRoiPct: 27 },
  ],
}

export const TIER_LABELS: Record<number, string> = {
  1: 'Tier 1 — Metro city',
  2: 'Tier 2 — State capital / large city',
  3: 'Tier 3 — Emerging city',
  4: 'Tier 4 — Growing town',
  5: 'Tier 5 — Small town',
}

/** Dropdown options for the configure form — representative values per field. */
export const SIZE_OPTIONS = [
  { label: 'Under 2,000 sqft', value: 1500 },
  { label: '2,000 – 5,000 sqft', value: 3000 },
  { label: '5,000 – 9,000 sqft', value: 6000 },
  { label: '9,000 – 16,000 sqft', value: 12000 },
  { label: '16,000 – 26,000 sqft', value: 20000 },
  { label: '26,000+ sqft', value: 35000 },
]

export const GAMES_OPTIONS = [
  { label: '5 – 10 games', value: 8 },
  { label: '10 – 15 games', value: 12 },
  { label: '15 – 25 games', value: 20 },
  { label: '25 – 40 games', value: 32 },
  { label: '40 – 50 games', value: 45 },
  { label: '50+ games', value: 55 },
]

export const ATTRACTIONS_OPTIONS = [
  { label: 'None yet', value: 0 },
  { label: '1 – 2 attractions', value: 1 },
  { label: '3 – 5 attractions', value: 4 },
  { label: '6 – 9 attractions', value: 7 },
  { label: '10+ attractions', value: 12 },
]

export const TIER_OPTIONS = [1, 2, 3, 4, 5].map((tier) => ({
  label: TIER_LABELS[tier],
  value: tier,
}))

export const BUDGET_MIN_LAKHS = FRANCHISE_TYPES[0].totalInvestment / 100000
export const BUDGET_MAX_LAKHS = FRANCHISE_TYPES[FRANCHISE_TYPES.length - 1].totalInvestment / 100000

export function formatINR(rupees: number): string {
  if (rupees >= 10000000) return `₹${(rupees / 10000000).toFixed(2)} Cr`
  return `₹${(rupees / 100000).toFixed(2)} L`
}

export function getRoiRow(typeKey: FranchiseType['key'], tier: number): { row: RoiRow; capped: boolean; cappedAtTier: number } {
  const rows = ROI_TABLE[typeKey]
  const cappedAtTier = Math.min(tier, rows.length)
  const row = rows.find((r) => r.tier === cappedAtTier) ?? rows[0]
  return { row, capped: cappedAtTier !== tier, cappedAtTier }
}