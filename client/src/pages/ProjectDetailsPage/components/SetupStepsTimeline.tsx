import type { FC } from 'react'
import SetupStepCard from './SetupStepsTimeline/SetupStepCard'
import type { ISetupStep } from '../../ProjectsPage/types'

interface SetupStepsTimelineProps {
  setupSteps?: ISetupStep[]
}

const SetupStepsTimeline: FC<SetupStepsTimelineProps> = ({ setupSteps }) => {
  if (!setupSteps || setupSteps.length === 0) return null

  const sorted = [...setupSteps].sort((a, b) => a.stepNumber - b.stepNumber)

  return (
    <div id="steps" className="scroll-mt-32 bg-[#0A0A0F] px-5 py-16 sm:px-7 sm:py-20" aria-labelledby="setup-steps-heading">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12">
          <p className="label mb-4">Process</p>
          <h2
            id="setup-steps-heading"
            className="font-display text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#F5F5F7]"
          >
            Setup Process
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#A1A1A6]">
            A clear sequence from kickoff to opening — so you always know what comes next.
          </p>
        </div>

        <div className="space-y-2">
          {sorted.map((step, idx) => (
            <SetupStepCard
              key={`${step.stepNumber}-${step.title}`}
              step={step}
              isLast={idx === sorted.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SetupStepsTimeline
