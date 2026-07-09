import apiClient from "../../../hooks/apiClient"
import type { ApiResponse } from "../types"
import type { IProductItem } from "./mockProductItems"


export type { IProductItem }

const BASE = '/product-items'

// GET /product-items/:slug
export const getProductItemBySlug = async (slug: string): Promise<IProductItem> => {
  const res = await apiClient.get<ApiResponse<IProductItem>>(`${BASE}/${slug}`)
  return res.data
}