import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IProductItem } from '../services/baseProductDetailsApi'
import MediaItem from '../../../components/common/MediaItem'
import { ArrowUpRight, Plus, Check } from 'lucide-react'
import { useLeadTracker } from '../../../context/LeadTrackerContext'

interface ProductItemCardProps {
  item: IProductItem
}

function truncate(text: string, max = 100): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

const ProductItemCard: FC<ProductItemCardProps> = ({ item }) => {
  const navigate = useNavigate()
  const { state, addToEnquiry } = useLeadTracker()
  const id = item._id || item.slug
  const isAdded = state.enquiryCart.some((i) => i.id === id)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0A0A0F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#5FC1D1]/45 hover:shadow-[0_12px_36px_rgba(95,193,209,0.1)]">
      <button
        type="button"
        onClick={() => navigate(`/products/${item.baseProduct.slug}/${item.slug}`)}
        className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-[#111118] text-left"
        aria-label={`View ${item.title}`}
      >
        <MediaItem
          media={item.thumbnail}
          alt={item.title}
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-[#F5F5F7] backdrop-blur-sm transition-colors group-hover:border-[#5FC1D1]/50 group-hover:text-[#5FC1D1]">
          <ArrowUpRight size={14} />
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <button
          type="button"
          onClick={() => navigate(`/products/${item.baseProduct.slug}/${item.slug}`)}
          className="cursor-pointer text-left"
        >
          <h3 className="font-display text-[15px] font-bold leading-snug text-[#F5F5F7] transition-colors group-hover:text-[#5FC1D1]">
            {item.title}
          </h3>
          {item.description ? (
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#A1A1A6]">
              {truncate(item.description)}
            </p>
          ) : null}
        </button>

        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          {item.price !== undefined ? (
            <span className="text-sm font-bold text-[#6DBD4E]">{formatPrice(item.price)}</span>
          ) : null}
          {item.purchaseCount > 0 ? (
            <span className="text-xs text-[#636366]">{item.purchaseCount} purchased</span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3">
          <button
            type="button"
            onClick={() => navigate(`/products/${item.baseProduct.slug}/${item.slug}`)}
            className="cursor-pointer text-sm font-semibold text-[#5FC1D1] hover:underline"
          >
            Details →
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              addToEnquiry({ id, type: 'product', title: item.title })
            }}
            className={`inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              isAdded
                ? 'border-[#6DBD4E]/45 bg-[#6DBD4E]/10 text-[#6DBD4E]'
                : 'border-white/15 text-[#F5F5F7] hover:border-[#5FC1D1]/45 hover:text-[#5FC1D1]'
            }`}
          >
            {isAdded ? <Check size={12} /> : <Plus size={12} />}
            {isAdded ? 'Added' : 'Enquire'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductItemCard
