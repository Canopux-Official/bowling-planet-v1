import type { FC } from 'react'
import Tag from '../../../components/common/Tag'
import styles from './JobListSection.module.css'

interface SkillsListProps {
  skills: string[]
}

const SkillsList: FC<SkillsListProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.heading}>
        Skills
      </h2>
      <div className={styles.tags}>
        {skills.map((skill) => (
          <Tag key={skill} label={skill} />
        ))}
      </div>
    </section>
  )
}

export default SkillsList
