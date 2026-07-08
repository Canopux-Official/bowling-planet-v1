import {
  mockBaseProducts,
  mockBaseProductsPagination,
  type IBaseProduct,
  type IPaginationMeta,
} from './mockBaseProducts'

export type { IBaseProduct, IPaginationMeta }

export interface GetAllBaseProductsParams {
  search?: string
  page?: number
  limit?: number
}

export interface GetAllBaseProductsResponse {
  products: IBaseProduct[]
  pagination: IPaginationMeta
}

export async function getAllBaseProducts(
  params: GetAllBaseProductsParams = {},
): Promise<GetAllBaseProductsResponse> {
  // TODO: implement API call
  // Public listing always assumes status='active'.
  const page = params.page ?? 1
  const limit = params.limit ?? mockBaseProductsPagination.limit
  let products = mockBaseProducts.filter((p) => p.status === 'active')

  if (params.search?.trim()) {
    const q = params.search.trim().toLowerCase()
    products = products.filter((p) => p.title.toLowerCase().includes(q))
  }

  const total = products.length
  const pages = Math.max(1, Math.ceil(total / limit) || 1)
  const start = (page - 1) * limit

  return Promise.resolve({
    products: products.slice(start, start + limit),
    pagination: { page, limit, total, pages },
  })
}
