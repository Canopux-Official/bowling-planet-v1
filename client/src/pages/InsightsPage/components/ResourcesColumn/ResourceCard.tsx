import type { FC } from 'react'
import type { IResource } from '../../services/resourcesApi'
import Tag from '../../../../components/common/Tag'
import ResourceTypeBadge from '../ResourceTypeBadge'
import styles from './ResourceCard.module.css'

interface ResourceCardProps {
  resource: IResource
}

function truncate(text: string, max = 120): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

const ResourceCard: FC<ResourceCardProps> = ({ resource }) => (
  <a
    href={resource.externalUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.card}
  >
    <div className={styles.top}>
      <h3 className={styles.title}>{resource.title}</h3>
      <ResourceTypeBadge type={resource.type} />
    </div>
    <p className={styles.description}>{truncate(resource.description)}</p>
    <div className={styles.tags}>
      <Tag label={resource.category} />
      {resource.tags.map((tag) => (
        <Tag key={tag} label={tag} />
      ))}
    </div>
  </a>
)

export default ResourceCard
