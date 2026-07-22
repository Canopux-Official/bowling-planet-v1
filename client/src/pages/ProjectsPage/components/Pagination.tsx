import type { FC } from 'react'
import type { IPaginationMeta } from '../types'

interface PaginationProps {
  meta: IPaginationMeta
  onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ meta, onPageChange }) => {
  if (meta.totalPages <= 1) return null

  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1)

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={meta.page <= 1}
        onClick={() => onPageChange(meta.page - 1)}
        aria-label="Previous page"
        className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/[0.08] px-3 text-sm font-semibold text-[#86868B] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1] disabled:cursor-not-allowed disabled:opacity-40"
      >
        ←
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === meta.page ? 'page' : undefined}
          onClick={() => onPageChange(page)}
          className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors ${
            page === meta.page
              ? 'border-[#5FC1D1]/45 bg-[#5FC1D1]/10 text-[#5FC1D1]'
              : 'border-white/[0.08] text-[#86868B] hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1]'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={meta.page >= meta.totalPages}
        onClick={() => onPageChange(meta.page + 1)}
        aria-label="Next page"
        className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/[0.08] px-3 text-sm font-semibold text-[#86868B] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1] disabled:cursor-not-allowed disabled:opacity-40"
      >
        →
      </button>
    </nav>
  )
}

export default Pagination
