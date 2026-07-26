import type { FC } from 'react'
import MediaItem from '../../../../components/common/MediaItem'
import type { ISetupStep } from '../../../ProjectsPage/types'

interface SetupStepCardProps {
  step: ISetupStep
  isLast?: boolean
}

const SetupStepCard: FC<SetupStepCardProps> = ({ step, isLast }) => (
  <article className="relative grid gap-3 md:grid-cols-[48px_1fr] md:gap-4">
    <div className="relative flex items-start justify-start md:justify-center">
      <div className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-lg border border-[#5FC1D1]/40 bg-[#5FC1D1]/15">
        <span className="font-display text-sm font-extrabold text-[#5FC1D1]">
          {String(step.stepNumber).padStart(2, '0')}
        </span>
      </div>
      {!isLast ? (
        <div
          className="absolute left-5 top-10 hidden h-[calc(100%+0.5rem)] w-[2px] bg-gradient-to-b from-[#5FC1D1]/50 via-[#5FC1D1]/20 to-transparent md:block"
          aria-hidden="true"
        />
      ) : null}
    </div>

    <div className="mb-3 overflow-hidden rounded-xl border border-white/[0.1] bg-[#0A0A0F] transition-colors hover:border-[#5FC1D1]/30">
      <div className={`grid gap-0 ${step.image ? 'sm:grid-cols-[1.2fr_0.8fr]' : ''}`}>
        <div className="p-4">
          <h3 className="font-display text-[15px] font-bold text-[#F5F5F7]">{step.title}</h3>
          {step.description ? (
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#A1A1A6]">{step.description}</p>
          ) : null}
          {step.points && step.points.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {step.points.map((point) => (
                <li key={point} className="flex gap-2 text-[13px] text-[#A1A1A6]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6DBD4E]" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {step.image ? (
          <div className="aspect-[16/10] overflow-hidden bg-[#111118] sm:aspect-auto sm:min-h-[140px]">
            <MediaItem media={step.image} alt={step.title} />
          </div>
        ) : null}
      </div>
    </div>
  </article>
)

export default SetupStepCard
