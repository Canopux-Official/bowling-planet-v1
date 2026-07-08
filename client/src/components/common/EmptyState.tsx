import type { FC } from 'react'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  message: string
}

const EmptyState: FC<EmptyStateProps> = ({ message }) => (
  <div className={styles.empty}>
    <p>{message}</p>
  </div>
)

export default EmptyState
