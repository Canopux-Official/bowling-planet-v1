import type { FC } from 'react'
import styles from './JobOverview.module.css'

interface JobOverviewProps {
  description: string
}

const JobOverview: FC<JobOverviewProps> = ({ description }) => {
  if (!description.trim()) return null

  return (
    <section className={styles.section} aria-labelledby="job-overview-heading">
      <h2 id="job-overview-heading" className={styles.heading}>
        Overview
      </h2>
      <p className={styles.description}>{description}</p>
    </section>
  )
}

export default JobOverview
