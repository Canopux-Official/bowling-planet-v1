import type { FC } from 'react'

import styles from './ItemPoints.module.css'
import type { IFeaturePoint } from '../../ProjectsPage/types'

interface ItemPointsProps {
  points?: IFeaturePoint[]
}

const ItemPoints: FC<ItemPointsProps> = ({ points }) => {
  if (!points || points.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Highlights</h2>
      <div className={styles.grid}>
        {points.map((point, i) => (
          <article key={point.title} className={styles.card}>
            <span className={styles.ghostNumber} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.title}>{point.title}</h3>
            {point.description ? (
              <p className={styles.description}>{point.description}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ItemPoints