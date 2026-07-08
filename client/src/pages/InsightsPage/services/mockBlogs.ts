// TEMPORARY: Replace with real API integration later.
/**
 * Blog types — mirrors backend Mongoose schema exactly.
 * // Assumption: types colocated with insights mocks to avoid an extra types folder.
 */

export interface IMedia {
  type: 'image' | 'video' | 'file'
  url: string
  publicId: string
}

export interface IBlog {
  _id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: IMedia
  author: string
  tags: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export type BlogListItem = Omit<IBlog, 'content'>

export interface IPaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export const mockBlogs: IBlog[] = [
  {
    _id: 'blog-1',
    title: 'How to Plan an FEC Mix for Mall Upper Floors',
    slug: 'how-to-plan-an-fec-mix-for-mall-upper-floors',
    excerpt: 'A practical framework for balancing bowling, soft play and arcade density in mall entertainment programmes.',
    content:
      '<p>Planning an upper-floor FEC starts with catchment and circulation, not catalogue wishlists.</p><p>Define dwell targets, adjacency to F&B, and family vs youth skew before locking attraction count.</p><p>Bowling Planet teams review power, civil readiness and package economics early so openings stay on schedule.</p>',
    coverImage: {
      type: 'image',
      url: 'https://picsum.photos/seed/blog1/600/400',
      publicId: 'blogs/blog1',
    },
    author: 'Bowling Planet Team',
    tags: ['fec', 'malls', 'planning', 'operations'],
    isPublished: true,
    publishedAt: '2026-05-12T10:00:00.000Z',
    createdAt: '2026-05-01T10:00:00.000Z',
    updatedAt: '2026-05-12T10:00:00.000Z',
  },
  {
    _id: 'blog-2',
    title: 'ROI Drivers Behind Bowling as an Anchor Attraction',
    slug: 'roi-drivers-behind-bowling-as-an-anchor-attraction',
    excerpt: 'Why lanes still deliver footfall and package yield when configured for commercial operations.',
    content:
      '<p>Bowling remains a destination signal for family and corporate guests.</p><p>Session design, league calendars and F&B adjacency are the levers that convert novelty into repeat visits.</p><p>Treat lanes as a programme, not equipment dropped into leftover floor plate.</p>',
    coverImage: {
      type: 'image',
      url: 'https://picsum.photos/seed/blog2/600/400',
      publicId: 'blogs/blog2',
    },
    author: 'Priya Sharma',
    tags: ['bowling', 'roi', 'operations', 'planning'],
    isPublished: true,
    publishedAt: '2026-04-28T10:00:00.000Z',
    createdAt: '2026-04-20T10:00:00.000Z',
    updatedAt: '2026-04-28T10:00:00.000Z',
  },
  {
    _id: 'blog-3',
    title: 'Soft Play Safety and Capacity Planning Basics',
    slug: 'soft-play-safety-and-capacity-planning-basics',
    excerpt: 'Age banding, sightlines and staff ratios that keep soft play commercially and operationally sound.',
    content:
      '<p>Soft play capacity should be derived from usable area and supervision ratios, not marketing claims.</p><p>Separate junior zones reduce conflict and improve perceived safety for parents.</p><p>Material choices and cleaning cycles must be designed before opening day.</p>',
    coverImage: {
      type: 'image',
      url: 'https://picsum.photos/seed/blog3/600/400',
      publicId: 'blogs/blog3',
    },
    author: 'Bowling Planet Team',
    tags: ['soft-play', 'safety', 'operations', 'family'],
    isPublished: true,
    publishedAt: '2026-04-10T10:00:00.000Z',
    createdAt: '2026-04-01T10:00:00.000Z',
    updatedAt: '2026-04-10T10:00:00.000Z',
  },
  {
    _id: 'blog-4',
    title: 'Cashless Systems That Reduce Floor Friction',
    slug: 'cashless-systems-that-reduce-floor-friction',
    excerpt: 'Load points, reporting and purse models that make guest spend simpler across attractions.',
    content:
      '<p>Cashless programmes succeed when load design is as intentional as attraction mix.</p><p>Reporting should tell operators which zones underperform without burying teams in dashboards.</p><p>Parent-controlled loads also improve perceived safety and spend discipline.</p>',
    coverImage: {
      type: 'image',
      url: 'https://picsum.photos/seed/blog4/600/400',
      publicId: 'blogs/blog4',
    },
    author: 'Vikram Desai',
    tags: ['operations', 'cashless', 'technology', 'fec'],
    isPublished: true,
    publishedAt: '2026-03-22T10:00:00.000Z',
    createdAt: '2026-03-15T10:00:00.000Z',
    updatedAt: '2026-03-22T10:00:00.000Z',
  },
  {
    _id: 'blog-5',
    title: 'Hotel Recreation Programmes That Support Occupancy',
    slug: 'hotel-recreation-programmes-that-support-occupancy',
    excerpt: 'How resorts and hotels can add entertainment amenities without creating an unmanaged cost centre.',
    content:
      '<p>Hospitality recreation should balance amenity value with optional day-pass economics.</p><p>Quiet-hours policies and brand-fit finishes matter as much as attraction selection.</p><p>Coordinate MEP and housekeeping early to avoid opening delays.</p>',
    // Intentionally no coverImage for fallback testing.
    author: 'Ananya Bose',
    tags: ['hotels', 'resorts', 'planning', 'family'],
    isPublished: true,
    publishedAt: '2026-03-05T10:00:00.000Z',
    createdAt: '2026-02-28T10:00:00.000Z',
    updatedAt: '2026-03-05T10:00:00.000Z',
  },
  {
    _id: 'blog-6',
    title: 'Arcade Mix Selection Without Prize Cost Creep',
    slug: 'arcade-mix-selection-without-prize-cost-creep',
    excerpt: 'Using data-led cabinet selection to protect margin while keeping the floor feeling fresh.',
    content:
      '<p>Arcade success depends on mix density, prize economics and service access — not cabinet count alone.</p><p>Refresh cycles should be planned before launch so the floor does not age in place.</p><p>Operators need clear SKUs for tickets, redemption and premium play.</p>',
    coverImage: {
      type: 'image',
      url: 'https://picsum.photos/seed/blog6/600/400',
      publicId: 'blogs/blog6',
    },
    author: 'Bowling Planet Team',
    tags: ['arcade', 'operations', 'roi', 'fec'],
    isPublished: true,
    publishedAt: '2026-02-18T10:00:00.000Z',
    createdAt: '2026-02-10T10:00:00.000Z',
    updatedAt: '2026-02-18T10:00:00.000Z',
  },
  {
    _id: 'blog-7',
    title: 'Franchise vs Consulting: Choosing the Right Model',
    slug: 'franchise-vs-consulting-choosing-the-right-model',
    excerpt: 'A clear comparison for investors deciding between turnkey consulting programmes and franchise routes.',
    content:
      '<p>Not every operator needs the same commercial structure.</p><p>Consulting-led programmes prioritise custom mix and site fit; franchise models trade flexibility for brand packaging.</p><p>Map capital, location quality and operating appetite before choosing a path.</p>',
    coverImage: {
      type: 'image',
      url: 'https://picsum.photos/seed/blog7/600/400',
      publicId: 'blogs/blog7',
    },
    author: 'Rajesh Mehta',
    tags: ['franchise', 'investors', 'planning', 'roi'],
    isPublished: true,
    publishedAt: '2026-01-30T10:00:00.000Z',
    createdAt: '2026-01-20T10:00:00.000Z',
    updatedAt: '2026-01-30T10:00:00.000Z',
  },
  {
    _id: 'blog-8',
    title: 'What Landlords Should Ask Before Approving an FEC Lease',
    slug: 'what-landlords-should-ask-before-approving-an-fec-lease',
    excerpt: 'Due diligence questions that protect mall assets while enabling strong entertainment tenants.',
    content:
      '<p>Landlords should validate operator experience, power/civil assumptions and neighbour impact.</p><p>Demand transparency on dwell, package models and exit scenarios.</p><p>A well-planned FEC can lift footfall; a poorly specified one becomes a liability.</p>',
    coverImage: {
      type: 'image',
      url: 'https://picsum.photos/seed/blog8/600/400',
      publicId: 'blogs/blog8',
    },
    author: 'Sneha Iyer',
    tags: ['malls', 'investors', 'planning', 'operations'],
    isPublished: true,
    publishedAt: '2026-01-12T10:00:00.000Z',
    createdAt: '2026-01-05T10:00:00.000Z',
    updatedAt: '2026-01-12T10:00:00.000Z',
  },
]

export const mockBlogsListView: BlogListItem[] = mockBlogs.map(({ content: _content, ...rest }) => rest)

export const mockBlogsPagination: IPaginationMeta = {
  page: 1,
  limit: 4,
  total: mockBlogs.length,
  totalPages: Math.ceil(mockBlogs.length / 4),
}
