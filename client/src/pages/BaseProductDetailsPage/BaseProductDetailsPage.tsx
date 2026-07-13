import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'
import ProductItemsGrid from './components/ProductItemsGrid'
import ProductItemsSort, { type ProductItemsSortOption } from './components/ProductItemsSort'
import {
  getBaseProductWithItems,
  type BaseProductWithItems,
  type IProductItem,
} from './services/baseProductDetailsApi'
import { theme } from '../../theme'
import { useReveal } from '../../hooks/useReveal'
import MediaItem from '../../components/common/MediaItem'
import { Plus, Check } from 'lucide-react'
import { useLeadTracker } from '../../context/LeadTrackerContext'

function sortItems(items: IProductItem[], sort: ProductItemsSortOption): IProductItem[] {
  const next = [...items]
  switch (sort) {
    case 'newest':
      return next.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'bestsellers':
      return next.sort((a, b) => b.purchaseCount - a.purchaseCount)
    case 'featured':
      return next.sort((a, b) => {
        if (b.featuredOrder !== a.featuredOrder) return b.featuredOrder - a.featuredOrder
        return b.purchaseCount - a.purchaseCount
      })
    case 'price-asc':
      return next.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY))
    case 'price-desc':
      return next.sort((a, b) => (b.price ?? Number.NEGATIVE_INFINITY) - (a.price ?? Number.NEGATIVE_INFINITY))
    default:
      return next
  }
}

const BaseProductDetailsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [data, setData] = useState<BaseProductWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sort, setSort] = useState<ProductItemsSortOption>('featured')
  const headRef = useReveal()
  const gridRef = useReveal()
  const { state, addToEnquiry } = useLeadTracker()

  const load = useCallback(async () => {
    if (!slug) { setError('Product category not found.'); setLoading(false); return }
    setLoading(true); setError(null)
    try {
      const result = await getBaseProductWithItems(slug)
      console.log(result)
      setData(result)
    } catch {
      setError('Unable to load this product category.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { void load() }, [load])

  const sortedItems = useMemo(() => (data ? sortItems(data.items, sort) : []), [data, sort])

  if (loading) {
    return (
      <section style={{ background: theme.colors.void, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 28px' }}>
        <Loader label="Loading category…" />
      </section>
    )
  }

  if (error || !data) {
    return (
      <section style={{ background: theme.colors.void, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 28px' }}>
        <ErrorState message={error ?? 'Product category not found.'} onRetry={() => void load()} />
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: theme.colors.void, padding: '140px 28px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-teal" style={{ width: 600, height: 500, top: '-20%', right: '-8%', opacity: 0.5 }} />
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: theme.colors.text2, textDecoration: 'none', fontSize: 14, marginBottom: 40, fontFamily: theme.typography.fontBody, transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = theme.colors.teal)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = theme.colors.text2)}
          >
            ← All products
          </Link>

          <div ref={headRef} className="reveal bpd-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="label" style={{ marginBottom: 20 }}>Category</div>
              <h1 className="font-display text-metallic" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20 }}>
                {data.title}
              </h1>
              {data.description ? (
                <p style={{ color: theme.colors.text2, fontSize: 16, lineHeight: 1.7, fontFamily: theme.typography.fontBody, maxWidth: 480 }}>
                  {data.description}
                </p>
              ) : null}
              <div style={{ marginTop: '32px' }}>
                <button
                  type="button"
                  className={`btn-enquiry ${state.enquiryCart.some(i => i.id === (data._id || data.slug)) ? 'added' : ''}`}
                  style={{ width: 'auto', padding: '14px 28px', fontSize: 14 }}
                  onClick={() => addToEnquiry({ id: data._id || data.slug, type: 'product', title: data.title })}
                >
                  {state.enquiryCart.some(i => i.id === (data._id || data.slug)) ? (
                    <><Check size={16} /> Remove from Enquiry</>
                  ) : (
                    <><Plus size={16} /> Enquire About Category</>
                  )}
                </button>
              </div>
            </div>
            <div style={{ aspectRatio: '16/10', borderRadius: 20, overflow: 'hidden', border: `1px solid ${theme.colors.border}` }}>
              <MediaItem media={data.thumbnail} alt={data.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Variants */}
      <section style={{ background: theme.colors.surface, padding: '60px 28px 80px', position: 'relative' }}>
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="label" style={{ marginBottom: 10 }}>Browse</div>
              <h2 className="font-display text-metallic" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Available Variants
              </h2>
            </div>
            <ProductItemsSort value={sort} onChange={setSort} />
          </div>
          <div ref={gridRef} className="reveal">
            <ProductItemsGrid items={sortedItems} />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .bpd-hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}

export default BaseProductDetailsPage
