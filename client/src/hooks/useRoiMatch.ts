import { useMemo } from 'react'
import { FRANCHISE_TYPES, type FranchiseType } from '../pages/Landing/components/roi-calculator/data/roidata'


export interface RoiInputs {
  budgetLakhs: number
  sizeSqft: number
  games: number
  attractions: number
}

/**
 * How much each field influences the "closest match" — budget carries the
 * most signal, then footprint, then games/attractions count.
 */
const WEIGHTS = { budget: 0.4, size: 0.25, games: 0.2, attractions: 0.15 }

function logNorm(value: number, min: number, max: number): number {
  const clamped = Math.min(Math.max(value, min), max)
  return (Math.log(clamped) - Math.log(min)) / (Math.log(max) - Math.log(min))
}

function linNorm(value: number, min: number, max: number): number {
  const clamped = Math.min(Math.max(value, min), max)
  if (max === min) return 0
  return (clamped - min) / (max - min)
}

export interface RoiMatchResult {
  matched: FranchiseType
  /** Rough 0–100 confidence that the matched format fits the inputs. */
  matchScorePct: number
}

export function useRoiMatch(inputs: RoiInputs): RoiMatchResult {
  return useMemo(() => {
    const first = FRANCHISE_TYPES[0]
    const last = FRANCHISE_TYPES[FRANCHISE_TYPES.length - 1]

    const bounds = {
      budget: [first.totalInvestment, last.totalInvestment] as const,
      size: [first.sizeSqft, last.sizeSqft] as const,
      games: [first.games, last.games] as const,
      attractions: [first.attractions, last.attractions] as const,
    }

    const userVec = {
      budget: logNorm(inputs.budgetLakhs * 100000, ...bounds.budget),
      size: logNorm(inputs.sizeSqft, ...bounds.size),
      games: linNorm(inputs.games, ...bounds.games),
      attractions: linNorm(inputs.attractions, ...bounds.attractions),
    }

    let best: FranchiseType = first
    let bestDistance = Infinity

    for (const type of FRANCHISE_TYPES) {
      const typeVec = {
        budget: logNorm(type.totalInvestment, ...bounds.budget),
        size: logNorm(type.sizeSqft, ...bounds.size),
        games: linNorm(type.games, ...bounds.games),
        attractions: linNorm(type.attractions, ...bounds.attractions),
      }

      const distance = Math.sqrt(
        WEIGHTS.budget * (userVec.budget - typeVec.budget) ** 2 +
        WEIGHTS.size * (userVec.size - typeVec.size) ** 2 +
        WEIGHTS.games * (userVec.games - typeVec.games) ** 2 +
        WEIGHTS.attractions * (userVec.attractions - typeVec.attractions) ** 2
      )

      if (distance < bestDistance) {
        bestDistance = distance
        best = type
      }
    }

    // Distance is bounded roughly 0–1; convert to an approachable confidence score.
    const matchScorePct = Math.round(Math.max(40, 100 - bestDistance * 140))

    return { matched: best, matchScorePct }
  }, [inputs.budgetLakhs, inputs.sizeSqft, inputs.games, inputs.attractions])
}