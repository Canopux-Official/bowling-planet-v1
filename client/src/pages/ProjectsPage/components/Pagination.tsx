import type { FC } from 'react'

import styles from './Pagination.module.css'
import type { IPaginationMeta } from '../types'

interface PaginationProps {
  meta: IPaginationMeta
  onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ meta, onPageChange }) => {
  if (meta.totalPages <= 1) return null

  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1)

  return (
    <nav className={styles.nav} aria-label="Pagination">
      <button
        type="button"
        className={styles.btn}
        disabled={meta.page <= 1}
        onClick={() => onPageChange(meta.page - 1)}
        aria-label="Previous page"
      >
        ←
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.btn} ${page === meta.page ? styles.active : ''}`}
          aria-current={page === meta.page ? 'page' : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={styles.btn}
        disabled={meta.page >= meta.totalPages}
        onClick={() => onPageChange(meta.page + 1)}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  )
}

export default Pagination
