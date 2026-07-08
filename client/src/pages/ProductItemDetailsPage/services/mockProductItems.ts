// TEMPORARY: Replace with real API integration later.
import {
  mockBaseProducts,
  type IBaseProduct,
  type IMedia,
  type ProductStatus,
} from '../../ProductsPage/services/mockBaseProducts'

export type { IMedia, ProductStatus }

export interface IFeaturePoint {
  title: string
  description?: string
}

export interface IBulletList {
  heading: string
  items: string[]
}

export interface IUsageLocation {
  name: string
  description?: string
  images?: IMedia[]
}

export interface IProductItemRef {
  _id: string
  title: string
  slug: string
  thumbnail: IMedia
}

export interface IProductItem {
  _id: string
  baseProduct: IProductItemRef
  title: string
  slug: string
  description?: string
  thumbnail: IMedia
  gallery?: IMedia[]
  featureList?: IBulletList[]
  points?: IFeaturePoint[]
  usedIn?: IUsageLocation[]
  price?: number
  purchaseCount: number
  featuredOrder: number
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

function refFromBase(base: IBaseProduct): IProductItemRef {
  return {
    _id: base._id,
    title: base.title,
    slug: base.slug,
    thumbnail: base.thumbnail,
  }
}

function media(seed: string): IMedia {
  return {
    type: 'image',
    url: `https://picsum.photos/seed/${seed}/800/500`,
    publicId: `products/${seed}`,
  }
}

const [bowling, arcade, redemption, vr, trampoline] = mockBaseProducts

export const mockProductItems: IProductItem[] = [
  {
    _id: 'item-1',
    baseProduct: refFromBase(bowling),
    title: 'Professional Dual Lane System',
    slug: 'professional-dual-lane-system',
    description: 'Compact dual-lane package for boutique hotels and upper-floor mall destinations.',
    thumbnail: media('item1'),
    gallery: [media('item1g1'), media('item1g2'), media('item1g3'), media('item1g4')],
    featureList: [
      { heading: 'Included systems', items: ['Scoring suite', 'Ball returns', 'Approach lighting', 'Bumper kits'] },
      { heading: 'Commercial options', items: ['League packages', 'Party bookings', 'Corporate events'] },
    ],
    points: [
      { title: 'Space efficient', description: 'Designed for footprints starting around 2,500 sq ft.' },
      { title: 'Ops ready', description: 'Training and maintenance pathways included in delivery.' },
    ],
    usedIn: [
      {
        name: 'Boutique FEC — Surat',
        description: 'Two-lane hotel-adjacent entertainment zone.',
        images: [media('item1u1'), media('item1u2')],
      },
    ],
    price: 185000,
    purchaseCount: 42,
    featuredOrder: 9,
    status: 'active',
    createdAt: '2026-02-01T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-2',
    baseProduct: refFromBase(bowling),
    title: '8-Lane Destination Centre',
    slug: '8-lane-destination-centre',
    description: 'Full destination bowling configuration for high-footfall leisure developments.',
    thumbnail: media('item2'),
    gallery: [media('item2g1'), media('item2g2'), media('item2g3')],
    featureList: [
      { heading: 'Core delivery', items: ['8 lane systems', 'Digital scoring', 'Seating planning', 'Staff training'] },
      { heading: 'Add-ons', items: ['VIP lanes', 'Glow lighting', 'League software'] },
    ],
    points: [
      { title: 'Anchor attraction', description: 'Built to drive destination footfall for mixed-use properties.' },
      { title: 'Scalable ops', description: 'Supports leagues, parties and corporate calendars.' },
      { title: 'Long-term support', description: 'AMC pathways available after commissioning.' },
    ],
    usedIn: [
      {
        name: 'Bowling Lane Dubai',
        description: 'Multi-lane centrepiece in a premium leisure destination.',
        images: [media('item2u1'), media('item2u2'), media('item2u3')],
      },
    ],
    price: 920000,
    purchaseCount: 18,
    featuredOrder: 10,
    status: 'active',
    createdAt: '2026-02-05T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-3',
    baseProduct: refFromBase(arcade),
    title: 'Racing Simulator Cluster',
    slug: 'racing-simulator-cluster',
    description: 'Multiplayer racing cabinets for youth and family floors.',
    thumbnail: media('item3'),
    gallery: [media('item3g1'), media('item3g2'), media('item3g3')],
    featureList: [
      { heading: 'Cluster includes', items: ['Linked cabinets', 'Load integration', 'Signage kit'] },
      { heading: 'Support', items: ['Parts pathway', 'Ops briefing', 'Power BOM'] },
    ],
    points: [
      { title: 'High visibility', description: 'Strong front-of-floor presence for youth catchments.' },
      { title: 'Session friendly', description: 'Easy package pairing with party programmes.' },
    ],
    usedIn: [
      {
        name: 'Arcade Games Calicut',
        description: 'Digital games floor with racing as a headline cluster.',
        images: [media('item3u1'), media('item3u2')],
      },
    ],
    price: 64000,
    purchaseCount: 210,
    featuredOrder: 7,
    status: 'active',
    createdAt: '2026-02-08T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-4',
    baseProduct: refFromBase(arcade),
    title: 'Video Arcade Floor Pack',
    slug: 'video-arcade-floor-pack',
    description: 'Curated mix of skill and video cabinets for dense FEC floors.',
    thumbnail: media('item4'),
    gallery: [media('item4g1'), media('item4g2'), media('item4g3'), media('item4g4')],
    featureList: [
      { heading: 'Pack coverage', items: ['Skill titles', 'Video cabinets', 'Service aisle layout'] },
      { heading: 'Commercial', items: ['Ticket options', 'Premium play', 'Refresh plan'] },
    ],
    points: [
      { title: 'Mix discipline', description: 'Selection guided by utilisation rather than novelty alone.' },
      { title: 'Service access', description: 'Layouts leave room for technician response.' },
    ],
    usedIn: [
      {
        name: 'Mall FECs — India',
        description: 'Repeatable arcade packs across mid-size mall destinations.',
        images: [media('item4u1')],
      },
    ],
    // price intentionally undefined to test CTA/guard.
    purchaseCount: 96,
    featuredOrder: 6,
    status: 'active',
    createdAt: '2026-02-10T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-5',
    baseProduct: refFromBase(redemption),
    title: 'Skill Redemption Suite',
    slug: 'skill-redemption-suite',
    description: 'High-replay skill games with prize cost controls for family floors.',
    thumbnail: media('item5'),
    gallery: [media('item5g1'), media('item5g2'), media('item5g3')],
    featureList: [
      { heading: 'Suite elements', items: ['Skill games', 'Ticket reclaim', 'Prize wall plan'] },
      { heading: 'Ops tools', items: ['Fill cadence', 'Margin notes', 'Staff SOPs'] },
    ],
    points: [
      { title: 'Replay economics', description: 'Chosen for session frequency and prize discipline.' },
      { title: 'Family friendly', description: 'Suitable beside soft play and party packages.' },
    ],
    usedIn: [
      {
        name: 'Family Zone — Ahmedabad',
        description: 'Redemption adjacency supporting longer parent dwell.',
        images: [media('item5u1'), media('item5u2')],
      },
    ],
    price: 48000,
    purchaseCount: 330,
    featuredOrder: 8,
    status: 'active',
    createdAt: '2026-02-12T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-6',
    baseProduct: refFromBase(redemption),
    title: 'Prize Merchandiser Bundle',
    slug: 'prize-merchandiser-bundle',
    description: 'Automated merchandisers planned for fill cost and surveillance sightlines.',
    thumbnail: media('item6'),
    gallery: [media('item6g1'), media('item6g2'), media('item6g3')],
    featureList: [
      { heading: 'Bundle', items: ['Claw units', 'Capsule venders', 'Anchoring kit'] },
      { heading: 'Controls', items: ['Fill SOPs', 'Stock reporting', 'Location plan'] },
    ],
    points: [
      { title: 'Low staff load', description: 'Self-serve formats with simple replenishment.' },
    ],
    usedIn: [
      {
        name: 'Corridor clusters',
        description: 'Placed near exits and F&B queues to capture impulse play.',
        images: [media('item6u1'), media('item6u2')],
      },
    ],
    price: 22000,
    purchaseCount: 510,
    featuredOrder: 4,
    status: 'active',
    createdAt: '2026-02-14T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-7',
    baseProduct: refFromBase(vr),
    title: 'Free-Roam VR Arena',
    slug: 'free-roam-vr-arena',
    description: 'Supervised free-roam arena for groups and party packages.',
    thumbnail: media('item7'),
    gallery: [media('item7g1'), media('item7g2'), media('item7g3')],
    featureList: [
      { heading: 'Arena delivery', items: ['Tracking setup', 'Safety briefing zone', 'Content ops'] },
      { heading: 'Commercial', items: ['Session lengths', 'Group packages', 'Staff ratios'] },
      { heading: 'Support', items: ['Hardware AMC options', 'Content rotation notes'] },
    ],
    points: [
      { title: 'Premium yield', description: 'Supports higher ticket price points than standard arcade CPKs.' },
      { title: 'Throughput design', description: 'Clear entry/brief/play/exit so peak hours stay orderly.' },
    ],
    usedIn: [
      {
        name: 'Urban FEC VR bay',
        description: 'Co-headline digital attraction beside arcade floors.',
        images: [media('item7u1'), media('item7u2'), media('item7u3')],
      },
    ],
    price: 125000,
    purchaseCount: 27,
    featuredOrder: 8,
    status: 'active',
    createdAt: '2026-02-16T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-8',
    baseProduct: refFromBase(vr),
    title: 'VR Pod Experience Kit',
    slug: 'vr-pod-experience-kit',
    description: 'Compact VR pods for tighter floors and hotel amenity programmes.',
    thumbnail: media('item8'),
    gallery: [media('item8g1'), media('item8g2'), media('item8g3')],
    featureList: [
      { heading: 'Kit includes', items: ['Pods', 'Queue barriers', 'Hygiene SOPs'] },
      { heading: 'Use cases', items: ['Hotels', 'Compact FECs', 'Events'] },
    ],
    points: [
      { title: 'Small footprint', description: 'Useful where arena space is unavailable.' },
      { title: 'Session control', description: 'Fixed durations simplify staffing and pricing.' },
    ],
    usedIn: [
      {
        name: 'Hotel amenity lounge',
        description: 'Guest recreation offering for rainy-day programming.',
        images: [media('item8u1'), media('item8u2')],
      },
    ],
    price: 39000,
    purchaseCount: 74,
    featuredOrder: 5,
    status: 'active',
    createdAt: '2026-02-18T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-9',
    baseProduct: refFromBase(trampoline),
    title: 'Junior Trampoline Module',
    slug: 'junior-trampoline-module',
    description: 'Age-banded trampoline module with clear supervision sightlines.',
    thumbnail: media('item9'),
    gallery: [media('item9g1'), media('item9g2'), media('item9g3')],
    featureList: [
      { heading: 'Module elements', items: ['Junior beds', 'Foam pits', 'Barrier nets'] },
      { heading: 'Safety', items: ['Inspection schedule', 'Capacity rules', 'Staff briefing'] },
    ],
    points: [
      { title: 'Family draw', description: 'Pairs well with soft play and party rooms.' },
      { title: 'Visible supervision', description: 'Layouts prioritise clear adult sightlines.' },
    ],
    usedIn: [
      {
        name: 'Softplay New Delhi adjacency',
        description: 'Active play complement to soft play programmes.',
        images: [media('item9u1'), media('item9u2')],
      },
    ],
    price: 78000,
    purchaseCount: 55,
    featuredOrder: 7,
    status: 'active',
    createdAt: '2026-02-20T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
  {
    _id: 'item-10',
    baseProduct: refFromBase(trampoline),
    title: 'Full Trampoline Park Deck',
    slug: 'full-trampoline-park-deck',
    description: 'Large-format trampoline programme for destination FECs and parks.',
    thumbnail: media('item10'),
    gallery: [media('item10g1'), media('item10g2'), media('item10g3'), media('item10g4')],
    featureList: [
      { heading: 'Deck includes', items: ['Main court', 'Dodgeball lanes', 'Ninja elements'] },
      { heading: 'Ops package', items: ['Capacity plans', 'Session SOPs', 'AMC options'] },
      { heading: 'Commercial', items: ['Timed entry', 'Party add-ons', 'Socks F&B adjacency'] },
    ],
    points: [
      { title: 'High concurrent play', description: 'Supports peak weekend youth demand.' },
      { title: 'Safety discipline', description: 'Certification pathway and inspection cadence included.' },
      { title: 'Expansion ready', description: 'Modules can grow as catchment demand rises.' },
    ],
    usedIn: [
      {
        name: 'Destination FEC — West India',
        description: 'Headline active-play zone for a multi-attraction complex.',
        images: [media('item10u1'), media('item10u2'), media('item10u3')],
      },
    ],
    price: 310000,
    purchaseCount: 12,
    featuredOrder: 9,
    status: 'active',
    createdAt: '2026-02-22T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
]
