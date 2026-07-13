import type { FC } from 'react'
import styles from './ItemPurchaseCTA.module.css'
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
  itemId
}) => {
  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = state.enquiryCart.some((i: any) => i.id === itemId)

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`btn-enquiry ${isAdded ? 'added' : ''}`}
        style={{ width: 'auto', padding: '16px 32px', fontSize: 15 }}
        onClick={() => addToEnquiry({ id: itemId, type: 'product', title: itemTitle })}
      >
        {isAdded ? (
           <><Check size={18} /> Remove from Enquiry</>
        ) : (
           <><Plus size={18} /> {hasPrice ? 'Enquire' : 'Contact for pricing'}</>
        )}
      </button>
      <p className={styles.hint}>We’ll respond with availability and configuration options.</p>
    </div>
  )
}

export default ItemPurchaseCTA
