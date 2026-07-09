import type { ProductStatus } from "../../ProductsPage/types"
import type { IMedia } from "../../ProjectsPage/types"

export type { IMedia, ProductStatus }

// Populated via .populate('baseProduct', 'title slug thumbnail') in the controller
export interface IBaseProductRef {
  _id: string
  title: string
  slug: string
  thumbnail: IMedia
}

// TODO: confirm against your actual ProductItem Mongoose schema —
// inferred from field usage in the controller (thumbnail, gallery,
// price, purchaseCount, featuredOrder, baseProduct populate).
export interface IProductItem {
  _id: string
  title: string
  slug: string
  description?: string
  price: number
  thumbnail: IMedia
  gallery?: IMedia[]
  baseProduct: IBaseProductRef
  status: ProductStatus
  purchaseCount: number
  featuredOrder: number
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface IUsageLocation {
  name: string
  description?: string
  images?: IMedia[]
}