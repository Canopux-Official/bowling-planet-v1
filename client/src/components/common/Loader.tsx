import type { FC } from 'react'
import styles from './Loader.module.css'

interface LoaderProps {
  label?: string
}

const Loader: FC<LoaderProps> = ({ label = 'Loading…' }) => (
  <div className={styles.loader} role="status" aria-live="polite">
    <div className={styles.spinner} aria-hidden="true" />
    <span>{label}</span>
  </div>
)

export default Loader
