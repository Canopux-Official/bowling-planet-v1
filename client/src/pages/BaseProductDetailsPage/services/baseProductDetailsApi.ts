import { mockBaseProducts, type IBaseProduct } from '../../ProductsPage/services/mockBaseProducts'
import { mockProductItems, type IProductItem } from '../../ProductItemDetailsPage/services/mockProductItems'

export type { IBaseProduct, IProductItem }

export type BaseProductWithItems = IBaseProduct & { items: IProductItem[] }

export async function getBaseProductWithItems(slug: string): Promise<BaseProductWithItems> {
  // TODO: implement API call
  const base =
    mockBaseProducts.find((p) => p.slug === slug) ?? mockBaseProducts[0]

  const items = mockProductItems
    .filter((item) => item.baseProduct.slug === base.slug)
    .sort((a, b) => {
      if (b.featuredOrder !== a.featuredOrder) return b.featuredOrder - a.featuredOrder
      return b.purchaseCount - a.purchaseCount
    })

  return Promise.resolve({ ...base, items })
}
