import type { FC } from 'react'
import type { ISetupStep } from '../../../ProjectsPage/services/projectsApi'
import MediaItem from '../../../../components/common/MediaItem'
import styles from './SetupStepCard.module.css'

interface SetupStepCardProps {
  step: ISetupStep
}

const SetupStepCard: FC<SetupStepCardProps> = ({ step }) => (
  <article className={styles.card}>
    <div className={styles.number}>{String(step.stepNumber).padStart(2, '0')}</div>
    <div>
      <h3 className={styles.title}>{step.title}</h3>
      {step.description ? <p className={styles.description}>{step.description}</p> : null}
      {step.points && step.points.length > 0 ? (
        <ul className={styles.points}>
          {step.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
      {step.image ? (
        <div className={styles.image}>
          <MediaItem media={step.image} alt={step.title} />
        </div>
      ) : null}
    </div>
  </article>
)

export default SetupStepCard
