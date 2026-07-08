import type { FC } from 'react'
import styles from './JobListSection.module.css'

interface EligibilityCriteriaListProps {
  eligibilityCriteria: string[]
}

const EligibilityCriteriaList: FC<EligibilityCriteriaListProps> = ({
  eligibilityCriteria,
}) => {
  if (!eligibilityCriteria || eligibilityCriteria.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="eligibility-heading">
      <h2 id="eligibility-heading" className={styles.heading}>
        Eligibility criteria
      </h2>
      <ul className={styles.list}>
        {eligibilityCriteria.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default EligibilityCriteriaList
