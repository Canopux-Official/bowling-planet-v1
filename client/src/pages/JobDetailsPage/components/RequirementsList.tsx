import type { FC } from 'react'
import styles from './JobListSection.module.css'

interface RequirementsListProps {
  requirements: string[]
}

const RequirementsList: FC<RequirementsListProps> = ({ requirements }) => {
  if (!requirements || requirements.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="requirements-heading">
      <div className={styles.headingRow}>
        <span className={styles.index}>03</span>
        <h2 id="requirements-heading" className={styles.heading}>
          Requirements
        </h2>
      </div>
      <ul className={styles.list}>
        {requirements.map((item, i) => (
          <li key={i} className={styles.listItem}>
            <span className={styles.marker} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RequirementsList