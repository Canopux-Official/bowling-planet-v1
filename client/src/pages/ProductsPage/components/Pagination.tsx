import type { FC } from 'react'
import type { IPaginationMeta } from '../services/baseProductsApi'
import styles from './Pagination.module.css'

interface PaginationProps {
  meta: IPaginationMeta
  onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ meta, onPageChange }) => {
  if (meta.pages <= 1) return null

  const pages = Array.from({ length: meta.pages }, (_, i) => i + 1)

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
        disabled={meta.page >= meta.pages}
        onClick={() => onPageChange(meta.page + 1)}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  )
}

export default Pagination
