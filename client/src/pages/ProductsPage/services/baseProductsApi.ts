
import apiClient from '../../../hooks/apiClient'
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
  const query: Record<string, unknown> = {
    page: params.page ?? 1,
    limit: params.limit ?? 20,
    // Public listing always shows active products only.
    status: 'active',
  }

  if (params.search) query.search = params.search

  const res = await apiClient.get<ApiListResponse<IBaseProduct>>(BASE, query)

  return {
    products: res.data,
    pagination: res.pagination,
  }
}