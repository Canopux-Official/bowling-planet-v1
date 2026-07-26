import type { FC } from 'react'
import type { IFeaturePoint } from '../../ProjectsPage/types'

interface ItemPointsProps {
  points?: IFeaturePoint[]
}

const ItemPoints: FC<ItemPointsProps> = ({ points }) => {
  if (!points || points.length === 0) return null

  return (
    <section>
      <h2 className="mb-4 font-display text-base font-bold text-[#F5F5F7]">Highlights</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {points.map((point, i) => (
          <article
            key={point.title}
            className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#5FC1D1]/10 to-transparent p-4"
          >
            <span className="font-display text-2xl font-extrabold text-white/[0.06]" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-1 text-sm font-bold text-[#F5F5F7]">{point.title}</h3>
            {point.description ? (
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#A1A1A6]">{point.description}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ItemPoints
