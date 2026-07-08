import type { FC } from 'react'
import styles from './JobListSection.module.css'

interface RequirementsListProps {
  requirements: string[]
}

const RequirementsList: FC<RequirementsListProps> = ({ requirements }) => {
  if (!requirements || requirements.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="requirements-heading">
      <h2 id="requirements-heading" className={styles.heading}>
        Requirements
      </h2>
      <ul className={styles.list}>
        {requirements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default RequirementsList
