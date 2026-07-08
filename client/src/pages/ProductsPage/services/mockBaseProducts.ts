// TEMPORARY: Replace with real API integration later.
/**
 * Base product types — mirrors backend Mongoose schema exactly.
 * // Assumption: types colocated with ProductsPage mocks to avoid an extra types folder.
 */

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

export const mockBaseProducts: IBaseProduct[] = [
  {
    _id: 'base-1',
    title: 'Bowling Lanes',
    slug: 'bowling-lanes',
    description:
      'Professional bowling programmes for malls, hotels and purpose-built FECs — configured for throughput and commercial longevity.',
    thumbnail: { type: 'image', url: 'https://picsum.photos/seed/base1/600/400', publicId: 'base/bowling' },
    status: 'active',
    createdAt: '2026-01-01T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'base-2',
    title: 'Arcade Machines',
    slug: 'arcade-machines',
    description:
      'Curated arcade and video cabinets planned for dwell, prize economics and serviceable floor layouts.',
    thumbnail: { type: 'image', url: 'https://picsum.photos/seed/base2/600/400', publicId: 'base/arcade' },
    status: 'active',
    createdAt: '2026-01-02T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'base-3',
    title: 'Redemption Games',
    slug: 'redemption-games',
    description:
      'Ticket and skill redemption suites selected for replay value and controlled prize cost.',
    thumbnail: { type: 'image', url: 'https://picsum.photos/seed/base3/600/400', publicId: 'base/redemption' },
    status: 'active',
    createdAt: '2026-01-03T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'base-4',
    title: 'VR Zones',
    slug: 'vr-zones',
    description:
      'Arena and pod VR formats designed for supervised throughput and package monetisation.',
    thumbnail: { type: 'image', url: 'https://picsum.photos/seed/base4/600/400', publicId: 'base/vr' },
    status: 'active',
    createdAt: '2026-01-04T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'base-5',
    title: 'Trampoline Parks',
    slug: 'trampoline-parks',
    description:
      'Active-play trampoline modules engineered for safety standards, sightlines and session capacity.',
    thumbnail: { type: 'image', url: 'https://picsum.photos/seed/base5/600/400', publicId: 'base/trampoline' },
    status: 'active',
    createdAt: '2026-01-05T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
]

export const mockBaseProductsPagination: IPaginationMeta = {
  page: 1,
  limit: 10,
  total: mockBaseProducts.length,
  pages: 1,
}
