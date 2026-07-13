import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IProductItem } from '../services/baseProductDetailsApi'
import MediaItem from '../../../components/common/MediaItem'
import { Plus, Check } from 'lucide-react'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { theme } from '../../../theme'

interface ProductItemCardProps {
  item: IProductItem
}

const ACCENT_COLORS = ['#5FC1D1', '#6DBD4E', '#C084FC', '#FFAA33']

function truncate(text: string, max = 110): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

const ProductItemCard: FC<ProductItemCardProps> = ({ item }) => {
  const navigate = useNavigate()
  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = state.enquiryCart.some((i: any) => i.id === (item._id || item.slug))
  const accent = ACCENT_COLORS[(item.title.charCodeAt(0) ?? 0) % ACCENT_COLORS.length]

  return (
    <div
      onClick={() => navigate(`/products/${item.baseProduct.slug}/${item.slug}`)}
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
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, zIndex: 1 }} />
      <div style={{ aspectRatio: '16/10', background: theme.colors.surface2, overflow: 'hidden' }}>
        <MediaItem media={item.thumbnail} alt={item.title} />
      </div>
      <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 className="font-display" style={{ margin: 0, fontSize: 16, fontWeight: 700, color: theme.colors.text1, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          {item.title}
        </h3>
        {item.description ? (
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: theme.colors.text2, flex: 1, fontFamily: theme.typography.fontBody }}>
            {truncate(item.description)}
          </p>
        ) : null}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'baseline', marginTop: 4 }}>
          {item.price !== undefined ? (
            <span style={{ fontSize: 15, fontWeight: 700, color: accent }}>{formatPrice(item.price)}</span>
          ) : null}
          {item.purchaseCount > 0 ? (
            <span style={{ fontSize: 12, color: theme.colors.text3, fontFamily: theme.typography.fontBody }}>{item.purchaseCount} purchased</span>
          ) : null}
        </div>
        <button 
          className={`btn-enquiry ${isAdded ? 'added' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            addToEnquiry({ id: item._id || item.slug, type: 'product', title: item.title })
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

export default ProductItemCard
