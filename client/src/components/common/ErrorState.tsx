import type { FC } from 'react'
import styles from './ErrorState.module.css'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

const ErrorState: FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className={styles.error} role="alert">
    <p className={styles.message}>{message}</p>
    {onRetry ? (
      <button type="button" className={styles.retry} onClick={onRetry}>
        Try again
      </button>
    ) : null}
  </div>
)

export default ErrorState
