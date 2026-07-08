import { type FC } from 'react'
import { theme } from '../../../theme'
import { BUSINESS_TYPES, type BusinessType } from '../../../types/product'

interface Props {
  industries: string[]
  applications: string[]
  selectedIndustries: string[]
  selectedBusinessTypes: BusinessType[]
  selectedApplications: string[]
  onToggleIndustry: (value: string) => void
  onToggleBusinessType: (value: BusinessType) => void
  onToggleApplication: (value: string) => void
  onClear: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: '0 0 28px' }}>
      <legend
        style={{
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: theme.colors.text3,
          fontWeight: 600,
          marginBottom: 14,
          padding: 0,
        }}
      >
        {title}
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </fieldset>
  )
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        cursor: 'pointer',
        fontSize: 14,
        color: checked ? theme.colors.text1 : theme.colors.text2,
        lineHeight: 1.4,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ marginTop: 2, accentColor: theme.colors.teal }}
      />
      <span>{label}</span>
    </label>
  )
}

const ProductSidebarFilters: FC<Props> = ({
  industries,
  applications,
  selectedIndustries,
  selectedBusinessTypes,
  selectedApplications,
  onToggleIndustry,
  onToggleBusinessType,
  onToggleApplication,
  onClear,
  mobileOpen,
  onCloseMobile,
}) => {
  const content = (
    <aside
      aria-label="Solution filters"
      style={{
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.void,
        padding: '28px 22px',
        borderRadius: 4,
        position: 'sticky',
        top: 140,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2
          className="font-display"
          style={{ margin: 0, fontSize: 16, fontWeight: 700, color: theme.colors.text1 }}
        >
          Filters
        </h2>
        <button
          type="button"
          onClick={onClear}
          style={{
            background: 'none',
            border: 'none',
            color: theme.colors.teal,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Clear all
        </button>
      </div>

      <FilterGroup title="Industry">
        {industries.map((item) => (
          <CheckRow
            key={item}
            label={item}
            checked={selectedIndustries.includes(item)}
            onChange={() => onToggleIndustry(item)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Business Type">
        {BUSINESS_TYPES.map((item) => (
          <CheckRow
            key={item}
            label={item}
            checked={selectedBusinessTypes.includes(item)}
            onChange={() => onToggleBusinessType(item)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Applications">
        {applications.map((item) => (
          <CheckRow
            key={item}
            label={item}
            checked={selectedApplications.includes(item)}
            onChange={() => onToggleApplication(item)}
          />
        ))}
      </FilterGroup>
    </aside>
  )

  return (
    <>
      {/* Desktop */}
      <div className="filters-desktop">{content}</div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(0,0,0,0.72)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={onCloseMobile}
        >
          <div
            style={{
              width: 'min(360px, 92vw)',
              height: '100%',
              background: theme.colors.surface,
              overflowY: 'auto',
              padding: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <button type="button" className="btn btn-ghost" style={{ padding: '8px 14px' }} onClick={onCloseMobile}>
                Close
              </button>
            </div>
            {content}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .filters-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default ProductSidebarFilters
