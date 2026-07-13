
import { apiClient } from "../../../services/apiClient"
import type { IProductItem } from "../../ProductItemDetailsPage/types"
import type { IBaseProduct } from "../../ProductsPage/types"
import type { ApiResponse } from "../../ProjectsPage/types"


export type { IBaseProduct, IProductItem }

export type BaseProductWithItems = IBaseProduct & { items: IProductItem[] }

const BASE = '/base-products'

// GET /base-products/:slug/with-items
export const getBaseProductWithItems = async (slug: string): Promise<BaseProductWithItems> => {
  // 1. Construct the URL path
  const url = `${BASE}/${slug}/with-items`

  // 2. Call apiClient directly as a function and pass the method/headers config
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiResponse<BaseProductWithItems>

  return res.data
}
