import type { FC } from 'react'
import type { IPaginationMeta } from '../../services/blogsApi'
import styles from './BlogsPagination.module.css'

interface BlogsPaginationProps {
  meta: IPaginationMeta
  onPageChange: (page: number) => void
}

const BlogsPagination: FC<BlogsPaginationProps> = ({ meta, onPageChange }) => {
  if (meta.totalPages <= 1) return null

  return (
    <nav className={styles.nav} aria-label="Blogs pagination">
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

export default BlogsPagination
