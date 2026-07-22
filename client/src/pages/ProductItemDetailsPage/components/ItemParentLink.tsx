import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IBaseProductRef } from '../types'
import { ChevronLeft } from 'lucide-react'

interface ItemParentLinkProps {
  baseProduct: IBaseProductRef
}

const ItemParentLink: FC<ItemParentLinkProps> = ({ baseProduct }) => (
  <Link
    to={`/products/${baseProduct.slug}`}
    className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#A1A1A6] transition-colors hover:text-[#5FC1D1]"
  >
    <ChevronLeft size={16} />
    Back to {baseProduct.title}
  </Link>
)

export default ItemParentLink
