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
      <h2 id="responsibilities-heading" className={styles.heading}>
        Key responsibilities
      </h2>
      <ul className={styles.list}>
        {keyResponsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default KeyResponsibilitiesList
