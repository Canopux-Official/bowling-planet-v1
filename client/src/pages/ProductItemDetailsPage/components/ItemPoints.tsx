import type { FC } from 'react'
import type { IFeaturePoint } from '../services/mockProductItems'
import styles from './ItemPoints.module.css'

interface ItemPointsProps {
  points?: IFeaturePoint[]
}

const ItemPoints: FC<ItemPointsProps> = ({ points }) => {
  if (!points || points.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Highlights</h2>
      <div className={styles.grid}>
        {points.map((point) => (
          <article key={point.title} className={styles.card}>
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
