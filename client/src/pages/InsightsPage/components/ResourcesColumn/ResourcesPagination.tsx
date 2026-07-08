import type { FC } from 'react'
import type { IPaginationMeta } from '../../services/resourcesApi'
import styles from './ResourcesPagination.module.css'

interface ResourcesPaginationProps {
  meta: IPaginationMeta
  onPageChange: (page: number) => void
}

const ResourcesPagination: FC<ResourcesPaginationProps> = ({ meta, onPageChange }) => {
  if (meta.totalPages <= 1) return null

  return (
    <nav className={styles.nav} aria-label="Resources pagination">
      <button
        type="button"
        className={styles.btn}
        disabled={meta.page <= 1}
        onClick={() => onPageChange(meta.page - 1)}
      >
        Previous
      </button>
      <span className={styles.indicator}>
        Page {meta.page} of {meta.totalPages}
      </span>
      <button
        type="button"
        className={styles.btn}
        disabled={meta.page >= meta.totalPages}
        onClick={() => onPageChange(meta.page + 1)}
      >
        Next
      </button>
    </nav>
  )
}

export default ResourcesPagination
