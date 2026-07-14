import type { FC } from 'react'

import MediaItem from '../../../../components/common/MediaItem'
import styles from './SetupStepCard.module.css'
import type { ISetupStep } from '../../../ProjectsPage/types'

interface SetupStepCardProps {
  step: ISetupStep
}

const SetupStepCard: FC<SetupStepCardProps> = ({ step }) => (
  <article className={styles.card}>
    <div className={styles.rail}>
      <div className={styles.markerRing}>
        <div className={styles.marker}>
          <span className={styles.markerNumber}>{String(step.stepNumber).padStart(2, '0')}</span>
        </div>
      </div>
      <div className={styles.connector} aria-hidden="true" />
    </div>

    <div className={styles.content}>
      <div className={styles.textBlock}>
        <h3 className={styles.title}>{step.title}</h3>
        {step.description ? <p className={styles.description}>{step.description}</p> : null}
        {step.points && step.points.length > 0 ? (
          <ul className={styles.points}>
            {step.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}
      </div>

      {step.image ? (
        <div className={styles.image}>
          <MediaItem media={step.image} alt={step.title} />
        </div>
      ) : null}
    </div>
  </article>
)

export default SetupStepCard