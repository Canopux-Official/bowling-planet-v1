import type { FC } from 'react'
import styles from './DistinctionStats.module.css'

const STATS = [
  { value: '700+', label: 'Games Options' },
  { value: '32%', label: 'Avg Annual ROI' },
  { value: '17+', label: 'Years of Experience' },
  { value: '21+', label: 'High-End Projects' },
]

const DistinctionStats: FC = () => (
  <section className={styles.section} aria-label="Company distinctions">
    <div className={styles.inner}>
      {STATS.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <p className={styles.value}>{stat.value}</p>
          <p className={styles.label}>{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
)

export default DistinctionStats
