import { type FC } from 'react'
import { theme } from '../../../theme'

interface Props {
  value: string
  onChange: (value: string) => void
}

const ProductSearch: FC<Props> = ({ value, onChange }) => (
  <div style={{ marginBottom: 20 }}>
    <label htmlFor="product-search" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
      Search solutions
    </label>
    <div style={{ position: 'relative' }}>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          color: theme.colors.text3,
          fontSize: 14,
        }}
      >
        ⌕
      </span>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search solutions, industries, applications…"
        style={{
          width: '100%',
          padding: '14px 16px 14px 42px',
          borderRadius: 4,
          border: `1px solid ${theme.colors.border}`,
          background: theme.colors.void,
          color: theme.colors.text1,
          fontSize: 14,
          fontFamily: theme.typography.fontBody,
          outline: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(95,193,209,0.5)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = theme.colors.border
        }}
      />
    </div>
  </div>
)

export default ProductSearch
