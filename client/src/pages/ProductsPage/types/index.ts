export interface IMedia {
  type: 'image' | 'video'
  url: string
  publicId?: string
}

export type ProductStatus = 'active' | 'draft' | 'archived'

export interface IBaseProduct {
  _id: string
  title: string
  slug: string
  description?: string
  thumbnail: IMedia
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

export interface IPaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
}

export interface GetAllBaseProductsParams {
  search?: string
  page?: number
  limit?: number
}

export interface GetAllBaseProductsResponse {
  products: IBaseProduct[]
  pagination: IPaginationMeta
}

// ---- HTTP envelopes, mirroring the Express controller exactly ----

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

// getAllBaseProducts: pagination is a sibling of data
export interface ApiListResponse<T> {
  success: boolean
  data: T[]
  pagination: IPaginationMeta
}