import type { FC } from 'react'
import { Plus, Check } from 'lucide-react'
import { useLeadTracker } from '../../../context/LeadTrackerContext'

interface ItemPurchaseCTAProps {
  hasPrice?: boolean
  itemTitle: string
  itemId: string
}

const ItemPurchaseCTA: FC<ItemPurchaseCTAProps> = ({
  hasPrice = true,
  itemTitle,
  itemId,
}) => {
  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = state.enquiryCart.some((i) => i.id === itemId)

  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#111118] p-4">
      <button
        type="button"
        onClick={() => addToEnquiry({ id: itemId, type: 'product', title: itemTitle })}
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-bold transition-colors ${
          isAdded
            ? 'border-[#6DBD4E]/45 bg-[#6DBD4E]/15 text-[#6DBD4E]'
            : 'border-[#5FC1D1]/50 bg-[#5FC1D1]/15 text-[#5FC1D1] hover:bg-[#5FC1D1]/25'
        }`}
      >
        {isAdded ? (
          <>
            <Check size={16} />
            In enquiry cart
          </>
        ) : (
          <>
            <Plus size={16} />
            {hasPrice ? 'Add to enquiry' : 'Contact for pricing'}
          </>
        )}
      </button>
      <p className="mt-2.5 text-center text-xs leading-relaxed text-[#636366]">
        We’ll respond with availability and configuration options.
      </p>
    </div>
  )
}

export default ItemPurchaseCTA
