import type { FC } from 'react'
import type { IPaginationMeta } from '../services/baseProductsApi'

interface PaginationProps {
  meta: IPaginationMeta
  onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ meta, onPageChange }) => {
  if (meta.pages <= 1) return null

  const pages = Array.from({ length: meta.pages }, (_, i) => i + 1)

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={meta.page <= 1}
        onClick={() => onPageChange(meta.page - 1)}
        aria-label="Previous page"
        className="flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.1] px-3 text-sm font-semibold text-[#A1A1A6] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1] disabled:cursor-not-allowed disabled:opacity-40"
      >
        ←
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === meta.page ? 'page' : undefined}
          onClick={() => onPageChange(page)}
          className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors ${
            page === meta.page
              ? 'border-[#5FC1D1]/45 bg-[#5FC1D1]/10 text-[#5FC1D1]'
              : 'border-white/[0.1] text-[#A1A1A6] hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1]'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={meta.page >= meta.pages}
        onClick={() => onPageChange(meta.page + 1)}
        aria-label="Next page"
        className="flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.1] px-3 text-sm font-semibold text-[#A1A1A6] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1] disabled:cursor-not-allowed disabled:opacity-40"
      >
        →
      </button>
    </nav>
  )
}

export default Pagination
