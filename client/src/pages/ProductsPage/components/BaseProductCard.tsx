import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IBaseProduct } from '../services/baseProductsApi'
import MediaItem from '../../../components/common/MediaItem'
import { theme } from '../../../theme'
import { Plus, Check } from 'lucide-react'
import { useLeadTracker } from '../../../context/LeadTrackerContext'

interface BaseProductCardProps {
  product: IBaseProduct
}

const ACCENT_COLORS = ['#5FC1D1', '#6DBD4E', '#C084FC', '#FFAA33']

function truncate(text: string, max = 130): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

const BaseProductCard: FC<BaseProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = state.enquiryCart.some(i => i.id === (product._id || product.slug))
  const accent = ACCENT_COLORS[(product.title.charCodeAt(0) ?? 0) % ACCENT_COLORS.length]

  return (
    <div
      onClick={() => navigate(`/products/${product.slug}`)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        color: 'inherit',
        background: `linear-gradient(180deg, ${accent}06, rgba(255,255,255,0.01))`,
        border: `1px solid ${accent}18`,
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${accent}12`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}18`
        ;(e.currentTarget as HTMLElement).style.transform = 'none'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, zIndex: 1 }} />

      <div style={{ aspectRatio: '16/10', background: theme.colors.surface2, overflow: 'hidden' }}>
        <MediaItem media={product.thumbnail} alt={product.title} />
      </div>

      <div style={{ padding: '22px 22px 26px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <h3 className="font-display" style={{ margin: 0, fontSize: 17, fontWeight: 700, color: theme.colors.text1, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          {product.title}
        </h3>
        {product.description ? (
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: theme.colors.text2, flex: 1, fontFamily: theme.typography.fontBody }}>
            {truncate(product.description)}
          </p>
        ) : null}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span style={{ fontSize: 12, color: accent, fontWeight: 600, letterSpacing: '0.05em', fontFamily: theme.typography.fontBody }}>
            View variants →
          </span>
        </div>
        <button 
          className={`btn-enquiry ${isAdded ? 'added' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            addToEnquiry({ id: product._id || product.slug, type: 'product', title: product.title })
          }}
          style={{ marginTop: 'auto' }}
        >
          {isAdded ? (
            <><Check size={14} /> Remove from Enquiry</>
          ) : (
            <><Plus size={14} /> Add to Enquiry</>
          )}
        </button>
      </div>
    </div>
  )
}

export default BaseProductCard
