import type { FC } from 'react'
import type { ResourceType } from '../services/resourcesApi'
import styles from './ResourceTypeBadge.module.css'

interface ResourceTypeBadgeProps {
  type: ResourceType
}

const LABELS: Record<ResourceType, string> = {
  pdf: 'PDF',
  video: 'Video',
  tool: 'Tool',
  link: 'Link',
  guide: 'Guide',
}

const ResourceTypeBadge: FC<ResourceTypeBadgeProps> = ({ type }) => (
  <span className={`${styles.badge} ${styles[type]}`}>{LABELS[type]}</span>
)

export default ResourceTypeBadge
