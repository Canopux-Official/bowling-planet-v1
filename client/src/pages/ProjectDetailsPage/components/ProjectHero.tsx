import type { FC } from 'react'
import Tag from '../../../components/common/Tag'
import styles from './ProjectHero.module.css'

interface ProjectHeroProps {
  title: string
  description?: string
  tags: string[]
}

const ProjectHero: FC<ProjectHeroProps> = ({ title, description, tags }) => (
  <section className={styles.hero}>
    <div className={styles.inner}>
      {tags.length > 0 ? (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      ) : null}
      <h1 className={styles.title}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  </section>
)

export default ProjectHero
