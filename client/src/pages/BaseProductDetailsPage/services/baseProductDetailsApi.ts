import apiClient from "../../../hooks/apiClient"
import type { IProductItem } from "../../ProductItemDetailsPage/types"
import type { IBaseProduct } from "../../ProductsPage/types"
import type { ApiResponse } from "../../ProjectsPage/types"


export type { IBaseProduct, IProductItem }

export type BaseProductWithItems = IBaseProduct & { items: IProductItem[] }

const BASE = '/base-products'

// GET /base-products/:slug/with-items
export const getBaseProductWithItems = async (slug: string): Promise<BaseProductWithItems> => {
  const res = await apiClient.get<ApiResponse<BaseProductWithItems>>(`${BASE}/${slug}/with-items`)
  return res.data
}