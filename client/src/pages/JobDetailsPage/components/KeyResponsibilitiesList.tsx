import type { FC } from 'react'
import styles from './JobListSection.module.css'

interface KeyResponsibilitiesListProps {
  keyResponsibilities: string[]
}

const KeyResponsibilitiesList: FC<KeyResponsibilitiesListProps> = ({
  keyResponsibilities,
}) => {
  if (!keyResponsibilities || keyResponsibilities.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="responsibilities-heading">
      <div className={styles.headingRow}>
        <span className={styles.index}>04</span>
        <h2 id="responsibilities-heading" className={styles.heading}>
          Key Responsibilities
        </h2>
      </div>
      <ul className={styles.list}>
        {keyResponsibilities.map((item, i) => (
          <li key={i} className={styles.listItem}>
            <span className={styles.dash} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default KeyResponsibilitiesList