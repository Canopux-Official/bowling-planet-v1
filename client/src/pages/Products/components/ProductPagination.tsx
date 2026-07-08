import { type FC } from 'react'
import { theme } from '../../../theme'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const ProductPagination: FC<Props> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 40,
        flexWrap: 'wrap',
      }}
    >
      <button
        type="button"
        className="btn btn-ghost"
        style={{ padding: '10px 16px' }}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        ←
      </button>

      {pages.map((p) => {
        const active = p === page
        return (
          <button
            key={p}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => onChange(p)}
            style={{
              minWidth: 40,
              height: 40,
              borderRadius: 4,
              border: `1px solid ${active ? 'rgba(95,193,209,0.45)' : theme.colors.border}`,
              background: active ? 'rgba(95,193,209,0.12)' : 'transparent',
              color: active ? theme.colors.teal : theme.colors.text2,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: theme.typography.fontBody,
            }}
          >
            {p}
          </button>
        )
      })}

      <button
        type="button"
        className="btn btn-ghost"
        style={{ padding: '10px 16px' }}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  )
}

export default ProductPagination
