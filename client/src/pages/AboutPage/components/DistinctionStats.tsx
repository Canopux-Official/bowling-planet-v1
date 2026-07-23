import type { FC } from 'react'

const STATS = [
  { num: '17+', label: 'Years' },
  { num: '21+', label: 'Projects' },
  { num: '700+', label: 'Games' },
  { num: '32%', label: 'Avg. ROI' },
  { num: '₹0', label: 'Franchise fee' },
]

const DistinctionStats: FC = () => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3" aria-label="Company highlights">
    {STATS.map((s) => (
      <div
        key={s.label}
        className="rounded-xl border border-white/[0.08] bg-[#111118] px-3 py-3 text-center"
      >
        <div className="font-display text-xl font-extrabold tracking-tight text-[#5FC1D1] sm:text-2xl">
          {s.num}
        </div>
        <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#636366]">
          {s.label}
        </div>
      </div>
    ))}
  </div>
)

export default DistinctionStats
