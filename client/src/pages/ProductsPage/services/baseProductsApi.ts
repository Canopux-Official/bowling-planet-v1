
import { apiClient } from '../../../services/apiClient'
import type {
  ApiListResponse,
  GetAllBaseProductsParams,
  GetAllBaseProductsResponse,
  IBaseProduct,
  IPaginationMeta,
} from '../types'

export type { IBaseProduct, IPaginationMeta, GetAllBaseProductsResponse, GetAllBaseProductsParams }

const BASE = '/base-products'

// GET /base-products
export const getAllBaseProducts = async (
  params: GetAllBaseProductsParams = {}
): Promise<GetAllBaseProductsResponse> => {
  // 1. Construct URL search parameters
  const searchParams = new URLSearchParams()
  searchParams.append('page', String(params.page ?? 1))
  searchParams.append('limit', String(params.limit ?? 20))
  searchParams.append('status', 'active') // Public listing always shows active products only.

  if (params.search) {
    searchParams.append('search', params.search)
  }

  const url = `${BASE}?${searchParams.toString()}`

  // 2. Call apiClient directly with the required config and skip-refresh flag
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiListResponse<IBaseProduct>

  // 3. Reshape the sibling { data, pagination } into the nested shape expected.
  return {
    products: res.data,
    pagination: res.pagination,
  }
}