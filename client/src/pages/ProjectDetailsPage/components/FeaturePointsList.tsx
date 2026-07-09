import type { FC } from 'react'

import styles from './FeaturePointsList.module.css'
import type { IFeaturePoint } from '../../ProjectsPage/types'

interface FeaturePointsListProps {
  featurePoints?: IFeaturePoint[]
}

const FeaturePointsList: FC<FeaturePointsListProps> = ({ featurePoints }) => {
  if (!featurePoints || featurePoints.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="feature-points-heading">
      <h2 id="feature-points-heading" className={styles.heading}>
        Features
      </h2>
      <ul className={styles.list}>
        {featurePoints.map((point) => (
          <li key={point.title} className={styles.card}>
            <h3 className={styles.title}>{point.title}</h3>
            {point.description ? (
              <p className={styles.description}>{point.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FeaturePointsList
