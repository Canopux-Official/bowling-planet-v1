import type { FC } from 'react'

import SetupStepCard from './SetupStepsTimeline/SetupStepCard'
import styles from './SetupStepsTimeline.module.css'
import type { ISetupStep } from '../../ProjectsPage/types'

interface SetupStepsTimelineProps {
  setupSteps?: ISetupStep[]
}

const SetupStepsTimeline: FC<SetupStepsTimelineProps> = ({ setupSteps }) => {
  if (!setupSteps || setupSteps.length === 0) return null

  const sorted = [...setupSteps].sort((a, b) => a.stepNumber - b.stepNumber)

  return (
    <section className={styles.section} aria-labelledby="setup-steps-heading">
      <h2 id="setup-steps-heading" className={styles.heading}>
        Setup process
      </h2>
      <div className={styles.list}>
        {sorted.map((step) => (
          <SetupStepCard key={`${step.stepNumber}-${step.title}`} step={step} />
        ))}
      </div>
    </section>
  )
}

export default SetupStepsTimeline
