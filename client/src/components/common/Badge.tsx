import type { FC } from 'react'
import styles from './Badge.module.css'

type BadgeVariant = 'success' | 'neutral' | 'danger'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const Badge: FC<BadgeProps> = ({ label, variant = 'neutral' }) => (
  <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>
)

export default Badge
