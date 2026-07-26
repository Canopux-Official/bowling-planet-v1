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
    <section id="steps" className="scroll-mt-28" aria-labelledby="setup-steps-heading">
      <h2 id="setup-steps-heading" className="mb-4 font-display text-base font-bold text-[#F5F5F7]">
        Setup process
      </h2>
      <div>
        {sorted.map((step, idx) => (
          <SetupStepCard
            key={`${step.stepNumber}-${step.title}`}
            step={step}
            isLast={idx === sorted.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

export default SetupStepsTimeline
