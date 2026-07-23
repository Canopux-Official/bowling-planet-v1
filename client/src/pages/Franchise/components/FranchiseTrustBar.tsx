/**
 * FranchiseTrustBar — compact stats strip
 */
import { type FC } from 'react'

const STATS = [
  { num: '17+', label: 'Years' },
  { num: '21+', label: 'Projects' },
  { num: '700+', label: 'Games' },
  { num: '32%', label: 'Avg. ROI' },
  { num: '₹0', label: 'Franchise fee' },
]

const FranchiseTrustBar: FC = () => (
  <div className="border-b border-white/[0.08] bg-[#0A0A0F] px-5 py-4 sm:px-7">
    <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-white/[0.06] bg-[#111118] px-3 py-2.5 text-center"
        >
          <div className="font-display text-xl font-extrabold text-[#5FC1D1] sm:text-2xl">
            {s.num}
          </div>
          <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#636366]">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default FranchiseTrustBar
