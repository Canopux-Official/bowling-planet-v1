// TEMPORARY: Replace with real API integration later.
import type { IPaginationMeta } from './mockBlogs'

export type ResourceType = 'pdf' | 'video' | 'tool' | 'link' | 'guide'

export interface IResource {
  _id: string
  title: string
  slug: string
  description: string
  type: ResourceType
  externalUrl: string
  category: string
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export const mockResources: IResource[] = [
  {
    _id: 'res-1',
    title: 'FEC Opening Checklist',
    slug: 'fec-opening-checklist',
    description: 'A practical PDF checklist covering civil readiness, staffing, safety and launch marketing.',
    type: 'pdf',
    externalUrl: 'https://example.com/resources/fec-opening-checklist',
    category: 'Operations',
    tags: ['opening', 'operations'],
    isPublished: true,
    createdAt: '2026-05-01T10:00:00.000Z',
    updatedAt: '2026-05-01T10:00:00.000Z',
  },
  {
    _id: 'res-2',
    title: 'Guest Journey Walkthrough Video',
    slug: 'guest-journey-walkthrough-video',
    description: 'Short video explaining entrance flow, ticket conversion and attraction sequencing.',
    type: 'video',
    externalUrl: 'https://example.com/resources/guest-journey-video',
    category: 'Design',
    tags: ['guest-flow', 'design'],
    isPublished: true,
    createdAt: '2026-04-20T10:00:00.000Z',
    updatedAt: '2026-04-20T10:00:00.000Z',
  },
  {
    _id: 'res-3',
    title: 'Attraction Mix Planner Tool',
    slug: 'attraction-mix-planner-tool',
    description: 'Interactive tool prompt for estimating floor mix ratios by catchment and capital band.',
    type: 'tool',
    externalUrl: 'https://example.com/resources/mix-planner',
    category: 'Finance',
    tags: ['planning', 'roi'],
    isPublished: true,
    createdAt: '2026-04-08T10:00:00.000Z',
    updatedAt: '2026-04-08T10:00:00.000Z',
  },
  {
    _id: 'res-4',
    title: 'IAAPA Industry Outlook',
    slug: 'iaapa-industry-outlook',
    description: 'External industry outlook link for owners tracking global attractions trends.',
    type: 'link',
    externalUrl: 'https://example.com/resources/iaapa-outlook',
    category: 'Marketing',
    tags: ['industry', 'research'],
    isPublished: true,
    createdAt: '2026-03-22T10:00:00.000Z',
    updatedAt: '2026-03-22T10:00:00.000Z',
  },
  {
    _id: 'res-5',
    title: 'Soft Play Safety Guide',
    slug: 'soft-play-safety-guide',
    description: 'Operator guide covering age banding, inspection cadence and incident reporting basics.',
    type: 'guide',
    externalUrl: 'https://example.com/resources/soft-play-safety-guide',
    category: 'Operations',
    tags: ['safety', 'soft-play'],
    isPublished: true,
    createdAt: '2026-03-10T10:00:00.000Z',
    updatedAt: '2026-03-10T10:00:00.000Z',
  },
  {
    _id: 'res-6',
    title: 'Franchise Pitch Deck Template',
    slug: 'franchise-pitch-deck-template',
    description: 'Presentation structure for investment conversations with mall and hotel partners.',
    type: 'pdf',
    externalUrl: 'https://example.com/resources/franchise-pitch-deck',
    category: 'Marketing',
    tags: ['franchise', 'sales'],
    isPublished: true,
    createdAt: '2026-02-28T10:00:00.000Z',
    updatedAt: '2026-02-28T10:00:00.000Z',
  },
  {
    _id: 'res-7',
    title: 'Layout Review Session Replay',
    slug: 'layout-review-session-replay',
    description: 'Recorded layout clinic for bowling adjacency and soft-play sightlines.',
    type: 'video',
    externalUrl: 'https://example.com/resources/layout-review-replay',
    category: 'Design',
    tags: ['layout', 'bowling'],
    isPublished: true,
    createdAt: '2026-02-12T10:00:00.000Z',
    updatedAt: '2026-02-12T10:00:00.000Z',
  },
  {
    _id: 'res-8',
    title: 'Capex Planning Spreadsheet',
    slug: 'capex-planning-spreadsheet',
    description: 'Starter spreadsheet structure for phased attraction investment modelling.',
    type: 'tool',
    externalUrl: 'https://example.com/resources/capex-spreadsheet',
    category: 'Finance',
    tags: ['finance', 'capex'],
    isPublished: true,
    createdAt: '2026-01-25T10:00:00.000Z',
    updatedAt: '2026-01-25T10:00:00.000Z',
  },
]

export const mockResourcesPagination: IPaginationMeta = {
  page: 1,
  limit: 4,
  total: mockResources.length,
  totalPages: Math.ceil(mockResources.length / 4),
}
