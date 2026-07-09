
import { apiClient } from "../../../services/apiClient"
import type { ApiResponse } from "../types"
import type { IProductItem } from "./mockProductItems"

export type { IProductItem }

const BASE = '/product-items'

// GET /product-items/:slug
export const getProductItemBySlug = async (slug: string): Promise<IProductItem> => {
  const url = `${BASE}/${slug}`

  // Call apiClient directly as a function with GET method and skip refresh header
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiResponse<IProductItem>

  return res.data
}