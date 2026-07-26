import type { FC } from 'react'
import MediaItem from '../../../../components/common/MediaItem'
import type { ISetupStep } from '../../../ProjectsPage/types'

interface SetupStepCardProps {
  step: ISetupStep
  isLast?: boolean
}

const SetupStepCard: FC<SetupStepCardProps> = ({ step, isLast }) => (
  <article className="relative grid gap-4 md:grid-cols-[64px_1fr] md:gap-5">
    {/* Number rail — aligned with content */}
    <div className="relative flex items-start justify-start md:justify-center">
      <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-xl border border-[#5FC1D1]/40 bg-[#5FC1D1]/15">
        <span className="font-display text-base font-extrabold text-[#5FC1D1]">
          {String(step.stepNumber).padStart(2, '0')}
        </span>
      </div>
      {!isLast ? (
        <div
          className="absolute left-6 top-12 hidden h-[calc(100%+0.5rem)] w-[2px] bg-gradient-to-b from-[#5FC1D1]/50 via-[#5FC1D1]/20 to-transparent md:block"
          aria-hidden="true"
        />
      ) : null}
    </div>

    {/* Content card */}
    <div className="mb-6 overflow-hidden rounded-2xl border border-white/[0.12] bg-[#111118] transition-colors hover:border-[#5FC1D1]/30">
      <div className={`grid gap-0 ${step.image ? 'lg:grid-cols-[1.15fr_0.85fr]' : ''}`}>
        <div className="flex flex-col justify-center p-5 sm:p-7">
          <h3 className="font-display text-lg font-bold text-[#F5F5F7]">{step.title}</h3>
          {step.description ? (
            <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1A6]">{step.description}</p>
          ) : null}
          {step.points && step.points.length > 0 ? (
            <ul className="mt-4 space-y-2.5">
              {step.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-[#A1A1A6]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6DBD4E]" />
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {step.image ? (
          <div className="aspect-[16/10] overflow-hidden bg-[#0A0A0F] lg:aspect-auto lg:min-h-[200px]">
            <MediaItem media={step.image} alt={step.title} />
          </div>
        ) : null}
      </div>
    </div>
  </article>
)

export default SetupStepCard
