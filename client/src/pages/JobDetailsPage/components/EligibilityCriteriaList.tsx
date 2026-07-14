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
      <div className={styles.headingRow}>
        <span className={styles.index}>02</span>
        <h2 id="eligibility-heading" className={styles.heading}>
          Eligibility Criteria
        </h2>
      </div>
      <ul className={styles.list}>
        {eligibilityCriteria.map((item, i) => (
          <li key={i} className={styles.listItem}>
            <span className={styles.check} aria-hidden="true">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path
                  d="M1 5L4.2 8.5L11 1"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default EligibilityCriteriaList