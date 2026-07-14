import type { FC } from 'react'
import styles from './JobOverview.module.css'

interface JobOverviewProps {
  description: string
}

const JobOverview: FC<JobOverviewProps> = ({ description }) => {
  if (!description.trim()) return null

  return (
    <section className={styles.section} aria-labelledby="job-overview-heading">
      <div className={styles.headingRow}>
        <span className={styles.index}>01</span>
        <h2 id="job-overview-heading" className={styles.heading}>
          Overview
        </h2>
      </div>
      <p className={styles.description}>{description}</p>
    </section>
  )
}

export default JobOverview