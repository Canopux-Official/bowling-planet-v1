import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IProject } from '../services/projectsApi'
import Tag from '../../../components/common/Tag'
import MediaItem from '../../../components/common/MediaItem'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: IProject
}

function truncate(text: string, max = 140): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const thumb = project.media?.[0]

  return (
    <Link to={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.thumb}>
        {thumb ? (
          <MediaItem media={thumb} alt={project.title} />
        ) : (
          <div className={styles.placeholder} aria-hidden="true" />
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        {project.description ? (
          <p className={styles.description}>{truncate(project.description)}</p>
        ) : null}
        {project.tags.length > 0 ? (
          <div className={styles.tags}>
            {project.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default ProjectCard
