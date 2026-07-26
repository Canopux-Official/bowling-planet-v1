import type { FC } from 'react'
import type { IFeaturePoint } from '../../ProjectsPage/types'

interface FeaturePointsListProps {
  featurePoints?: IFeaturePoint[]
}

const FeaturePointsList: FC<FeaturePointsListProps> = ({ featurePoints }) => {
  if (!featurePoints || featurePoints.length === 0) return null

  return (
    <div id="features" className="scroll-mt-32 px-5 py-16 sm:px-7 sm:py-20" aria-labelledby="feature-points-heading">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10">
          <p className="label mb-4">Features</p>
          <h2
            id="feature-points-heading"
            className="font-display text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#F5F5F7]"
          >
            What Makes This Project Stand Out
          </h2>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featurePoints.map((point, idx) => (
            <li
              key={point.title}
              className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111118] p-6 transition-colors hover:border-[#5FC1D1]/35"
            >
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#5FC1D1] to-transparent" />
              <span className="font-display text-xs font-bold tracking-[0.12em] text-[#5FC1D1]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-3 text-base font-bold text-[#F5F5F7]">{point.title}</h3>
              {point.description ? (
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1A6]">{point.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FeaturePointsList
