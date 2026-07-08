import { mockProductItems, type IProductItem } from './mockProductItems'

export type { IProductItem }

export async function getProductItemBySlug(slug: string): Promise<IProductItem> {
  // TODO: implement API call
  const found = mockProductItems.find((item) => item.slug === slug)
  return Promise.resolve(found ?? mockProductItems[0])
}
