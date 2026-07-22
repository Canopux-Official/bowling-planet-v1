import type { FC } from 'react'
import type { IFeaturePoint } from '../../ProjectsPage/types'

interface FeaturePointsListProps {
  featurePoints?: IFeaturePoint[]
}

const FeaturePointsList: FC<FeaturePointsListProps> = ({ featurePoints }) => {
  if (!featurePoints || featurePoints.length === 0) return null

  return (
    <section id="features" className="scroll-mt-28" aria-labelledby="feature-points-heading">
      <h2 id="feature-points-heading" className="mb-4 font-display text-base font-bold text-[#F5F5F7]">
        Features
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {featurePoints.map((point, idx) => (
          <article
            key={point.title}
            className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#5FC1D1]/10 to-transparent p-4"
          >
            <span className="font-display text-2xl font-extrabold text-white/[0.06]" aria-hidden="true">
              {String(idx + 1).padStart(2, '0')}
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

export default FeaturePointsList
