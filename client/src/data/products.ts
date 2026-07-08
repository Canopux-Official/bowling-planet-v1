import type {
  BusinessType,
  Product,
  ProductCategory,
  ProductListItem,
} from '../types/product'

const IMAGES = {
  bowling: '/products/Bowling_Lane_Dubai.avif',
  arcade: '/products/Arcade_Games_Calicut.avif',
  softplayA: '/products/Softplay_Ahemdabad.avif',
  softplayD: '/products/Softplay_New_Delhi.avif',
} as const

const STANDARD_BENEFITS = [
  {
    id: 'ben-footfall',
    title: 'Higher Footfall',
    description:
      'Positioned as a destination programme, this solution attracts visitors who would not otherwise enter the property for retail alone.',
    metric: 'Destination draw',
  },
  {
    id: 'ben-dwell',
    title: 'Longer Customer Stay',
    description:
      'Timed sessions and package play extend dwell across F&B and adjoining zones without relying on discount-led promotions.',
    metric: 'Extended dwell',
  },
  {
    id: 'ben-revenue',
    title: 'Revenue Growth',
    description:
      'Lane fees, tickets, packages, events and adjacency spend create multiple yield layers for the operator.',
    metric: 'Multi-stream yield',
  },
  {
    id: 'ben-repeat',
    title: 'Repeat Visits',
    description:
      'Memberships, leagues, parties and seasonal programmes convert novelty visits into habitual return behaviour.',
    metric: 'Habitual return',
  },
  {
    id: 'ben-premium',
    title: 'Premium Experience',
    description:
      'Finish, lighting and guest flow reinforce the property’s positioning for landlords and investment partners.',
    metric: 'Brand lift',
  },
  {
    id: 'ben-ops',
    title: 'Operational Efficiency',
    description:
      'Training, SOPs and AMC options keep utilisation high and unplanned downtime under control.',
    metric: 'Uptime focus',
  },
]

const STANDARD_WHY = [
  { id: 'w1', title: 'Professional Consulting', description: 'Feasibility and mix planning before capital is committed.' },
  { id: 'w2', title: 'Planning', description: 'Layout, guest journey and adjacency with F&B and ancillary zones.' },
  { id: 'w3', title: 'Installation', description: 'Coordinated delivery from site readiness through commissioning.' },
  { id: 'w4', title: 'Training', description: 'Operator and floor staff training so opening standards hold.' },
  { id: 'w5', title: 'AMC', description: 'Maintenance structured for uptime, not reactive firefighting.' },
  { id: 'w6', title: 'Operations Support', description: 'Post-opening guidance on packages, staffing and utilisation.' },
  { id: 'w7', title: 'Long-term Partnership', description: 'Advisory as you expand zones or additional properties.' },
]

const STANDARD_INDUSTRIES = [
  { id: 'i1', title: 'Shopping Malls', description: 'Upper-floor and atrium destinations that convert mall traffic into timed entertainment guests.' },
  { id: 'i2', title: 'Hotels & Resorts', description: 'Guest amenity and event programming with all-weather reliability.' },
  { id: 'i3', title: 'Real Estate Developments', description: 'Mixed-use leisure anchors that support leasing narratives.' },
  { id: 'i4', title: 'Standalone FECs', description: 'Purpose-built entertainment destinations with full turnkey delivery.' },
]

const STANDARD_APPS = [
  { id: 'a1', title: 'Shopping Malls', description: 'Anchor or upper-floor destinations for family catchments.' },
  { id: 'a2', title: 'Hotels', description: 'Guest amenity and corporate event programming.' },
  { id: 'a3', title: 'Resorts', description: 'Indoor programme asset for weather-independent itineraries.' },
  { id: 'a4', title: 'Gaming Zones', description: 'Headline or support attraction within a wider floor.' },
  { id: 'a5', title: 'Corporate Recreation', description: 'Structured team events with measurable utilisation.' },
  { id: 'a6', title: 'Educational Institutions', description: 'Campus recreation where policy allows supervised play.' },
  { id: 'a7', title: 'Entertainment Parks', description: 'Indoor complement that stabilises off-season revenue.' },
]

const STANDARD_FAQS = [
  {
    id: 'faq-1',
    question: 'Is this equipment-only or a full turnkey programme?',
    answer:
      'Bowling Planet delivers consulting-led programmes — planning, supply, installation, training and optional AMC. Equipment is specified for your site, not sold as a catalogue SKU without context.',
  },
  {
    id: 'faq-2',
    question: 'How do we start a consultation?',
    answer:
      'Share site type, approximate footprint and investment range. We respond with a structured consultation on mix, space and commercial logic.',
  },
  {
    id: 'faq-3',
    question: 'Can this integrate with other attractions?',
    answer:
      'Yes. Mix planning is part of the consulting scope so adjacencies reinforce spend rather than compete randomly.',
  },
]

function makeProduct(input: {
  id: string
  slug: string
  name: string
  category: ProductCategory
  industries: string[]
  businessTypes: BusinessType[]
  applicationTags: string[]
  tagline: string
  headline: string
  subheadline: string
  image: string
  imageAlt: string
  featured?: boolean
  spaceRequired: string
  capacity: string
  specs: { label: string; value: string }[]
  featureTitles: [string, string, string]
}): Product {
  const [f1, f2, f3] = input.featureTitles
  return {
    id: input.id,
    slug: input.slug,
    name: input.name,
    category: input.category,
    industries: input.industries,
    businessTypes: input.businessTypes,
    applicationTags: input.applicationTags,
    tagline: input.tagline,
    headline: input.headline,
    subheadline: input.subheadline,
    heroImage: input.image,
    heroImageAlt: input.imageAlt,
    brochureUrl: `/brochures/${input.slug}.pdf`,
    featured: input.featured,
    overview: {
      industries: input.industries,
      spaceRequired: input.spaceRequired,
      capacity: input.capacity,
      applications: input.applicationTags,
      installation: 'Turnkey — design coordination, commissioning and training',
    },
    benefits: STANDARD_BENEFITS,
    gallery: [
      { id: `${input.id}-g1`, src: input.image, alt: input.imageAlt, caption: input.name },
      { id: `${input.id}-g2`, src: IMAGES.arcade, alt: 'Integrated entertainment floor', caption: 'Zone integration' },
      { id: `${input.id}-g3`, src: IMAGES.softplayD, alt: 'Family entertainment adjacency', caption: 'Family adjacency' },
      { id: `${input.id}-g4`, src: IMAGES.bowling, alt: 'Premium venue context', caption: 'Venue context' },
    ],
    specifications: input.specs,
    features: [
      {
        id: `${input.id}-f1`,
        title: f1,
        description:
          'Planned for commercial throughput — clear guest flow, staff supervision points and package-ready session lengths.',
        image: input.image,
        imageAlt: input.imageAlt,
      },
      {
        id: `${input.id}-f2`,
        title: f2,
        description:
          'Configurable for investment scale and catchment. Layout density and monetisation levers are set during consulting, not after opening.',
        image: IMAGES.arcade,
        imageAlt: 'Configurable entertainment floor',
      },
      {
        id: `${input.id}-f3`,
        title: f3,
        description:
          'Built for continuous operation with training, maintenance pathways and long-term partnership support.',
        image: IMAGES.softplayA,
        imageAlt: 'Operational entertainment environment',
      },
    ],
    applications: STANDARD_APPS,
    industrySections: STANDARD_INDUSTRIES,
    whyBowlingPlanet: STANDARD_WHY,
    caseStudies: [
      {
        id: `${input.id}-cs1`,
        slug: 'bowling-lane-dubai',
        title: 'Bowling Lane Dubai',
        location: 'Dubai, UAE',
        overview: 'Multi-lane bowling centrepiece within a premium leisure destination.',
        image: IMAGES.bowling,
        imageAlt: 'Bowling lanes Dubai',
        tags: ['Bowling', 'International'],
      },
      {
        id: `${input.id}-cs2`,
        slug: 'arcade-games-calicut',
        title: 'Arcade Games Calicut',
        location: 'Calicut, India',
        overview: 'Integrated games floor demonstrating adjacency and dwell strategy.',
        image: IMAGES.arcade,
        imageAlt: 'Arcade Calicut',
        tags: ['Arcade', 'FEC'],
      },
      {
        id: `${input.id}-cs3`,
        slug: 'softplay-new-delhi',
        title: 'Softplay New Delhi',
        location: 'New Delhi, India',
        overview: 'Family zone delivery for dense urban catchments.',
        image: IMAGES.softplayD,
        imageAlt: 'Soft play New Delhi',
        tags: ['Family', 'Urban'],
      },
    ],
    relatedProducts: [],
    faqs: STANDARD_FAQS,
    seo: {
      title: `${input.name} | Turnkey FEC Solutions | Bowling Planet`,
      description: `${input.tagline}. Consulting, planning, supply, installation and operations support from Bowling Planet.`,
      canonicalPath: `/products/${input.slug}`,
      ogImage: input.image,
      keywords: [input.name, input.category, 'FEC solutions', 'Bowling Planet', 'turnkey entertainment'],
    },
  }
}

export const PRODUCTS: Product[] = [
  makeProduct({
    id: 'p1',
    slug: 'professional-bowling-lane-system',
    name: 'Professional Bowling Lane System',
    category: 'Bowling',
    industries: ['Shopping Malls', 'Hotels & Resorts', 'FECs', 'Mixed-Use'],
    businessTypes: ['Turnkey FEC', 'Mall Entertainment', 'Hotel & Resort'],
    applicationTags: ['Family entertainment', 'Corporate events', 'League play'],
    tagline: 'Anchor attraction for destination entertainment',
    headline: 'Bowling that anchors the destination.',
    subheadline:
      'A complete lane programme for malls, hotels and purpose-built FECs — designed for throughput, safety and commercial longevity.',
    image: IMAGES.bowling,
    imageAlt: 'Professional bowling lanes in a premium venue',
    featured: true,
    spaceRequired: 'From 2,500 sq ft (2 lanes)',
    capacity: 'Up to 40+ players (8-lane configuration)',
    specs: [
      { label: 'Area Required', value: 'Approx. 1,000–1,200 sq ft per 2 lanes' },
      { label: 'Power', value: 'Dedicated circuits; load plan during engineering' },
      { label: 'Installation', value: '8–16 weeks typical after civil readiness' },
      { label: 'Warranty', value: 'Manufacturer-backed + handover warranty' },
      { label: 'Maintenance', value: 'Scheduled AMC with response SLAs' },
      { label: 'Players', value: '6–8 per lane per session' },
      { label: 'Age Group', value: 'All ages with bumper options' },
      { label: 'Safety', value: 'Approach zones and certified equipment standards' },
    ],
    featureTitles: ['Integrated scoring & guest flow', 'Configurable for investment scale', 'Built for continuous operation'],
  }),
  makeProduct({
    id: 'p2',
    slug: 'vr-arena-system',
    name: 'VR Arena System',
    category: 'VR Games',
    industries: ['FECs', 'Shopping Malls', 'Events'],
    businessTypes: ['Turnkey FEC', 'Mall Entertainment', 'Expansion Module'],
    applicationTags: ['Ticketed sessions', 'Corporate teams', 'Party packages'],
    tagline: 'Immersive multiplayer for modern FEC floors',
    headline: 'Immersion with commercial clarity.',
    subheadline: 'Arena-scale VR configured for throughput, supervision and package pricing.',
    image: IMAGES.arcade,
    imageAlt: 'VR-capable entertainment floor',
    featured: true,
    spaceRequired: 'From 800 sq ft per arena cell',
    capacity: '4–10+ players depending on format',
    specs: [
      { label: 'Area Required', value: 'From ~800 sq ft per arena' },
      { label: 'Power', value: 'UPS-capable circuit as per BOM' },
      { label: 'Installation', value: '3–6 weeks after site readiness' },
      { label: 'Warranty', value: 'Hardware + commissioning warranty' },
      { label: 'Maintenance', value: 'Software updates + hardware AMC' },
      { label: 'Players', value: 'Format-dependent group sizes' },
      { label: 'Age Group', value: 'Typically 8+ with supervision policy' },
      { label: 'Safety', value: 'Play-area demarcation and protocols' },
    ],
    featureTitles: ['Supervised throughput design', 'Package-ready commercial model', 'Content operations support'],
  }),
  makeProduct({
    id: 'p3',
    slug: 'premium-soft-play',
    name: 'Premium Soft Play',
    category: 'Kiddie Rides',
    industries: ['Shopping Malls', 'FECs', 'Hotels & Resorts'],
    businessTypes: ['Mall Entertainment', 'Hotel & Resort', 'Turnkey FEC'],
    applicationTags: ['Toddler zones', 'Party packages', 'Weekday memberships'],
    tagline: 'Family retention engineered for throughput',
    headline: 'Family zones built for repeat visits.',
    subheadline: 'Safety-led soft play designed for supervised capacity and package monetisation.',
    image: IMAGES.softplayA,
    imageAlt: 'Premium soft play installation',
    featured: true,
    spaceRequired: 'From 1,500 sq ft',
    capacity: 'Age-banded capacity with staff ratios',
    specs: [
      { label: 'Area Required', value: 'From ~1,500 sq ft usable' },
      { label: 'Power', value: 'Lighting & AV as per design' },
      { label: 'Installation', value: '4–10 weeks depending on structure' },
      { label: 'Warranty', value: 'Structure & materials as contracted' },
      { label: 'Maintenance', value: 'Hygiene SOPs + periodic inspection' },
      { label: 'Players', value: 'By age band and floor standards' },
      { label: 'Age Group', value: 'Typically 0–12 with separated levels' },
      { label: 'Safety', value: 'Impact materials, egress, supervision' },
    ],
    featureTitles: ['Age-banded zoning', 'Party-ready adjacency', 'Maintainable materials'],
  }),
  makeProduct({
    id: 'p4',
    slug: 'arcade-video-floor',
    name: 'Arcade & Video Floor',
    category: 'Arcade & Video',
    industries: ['FECs', 'Shopping Malls', 'Standalone Zones'],
    businessTypes: ['Turnkey FEC', 'Mall Entertainment', 'Standalone Zone'],
    applicationTags: ['Skill games', 'Racing', 'Video cabinets'],
    tagline: 'Curated cabinets planned for throughput',
    headline: 'Arcade programmed for dwell and yield.',
    subheadline: 'Cabinet mix, prize cost and power planning for sustained commercial performance.',
    image: IMAGES.arcade,
    imageAlt: 'Arcade and video games floor',
    featured: true,
    spaceRequired: 'From 1,200 sq ft',
    capacity: 'Concurrent play by cabinet count',
    specs: [
      { label: 'Area Required', value: 'From ~1,200 sq ft' },
      { label: 'Power', value: 'Distributed circuits per machine BOM' },
      { label: 'Installation', value: '2–6 weeks after flooring readiness' },
      { label: 'Warranty', value: 'Manufacturer terms per cabinet' },
      { label: 'Maintenance', value: 'Parts & technician AMC options' },
      { label: 'Players', value: 'Per cabinet specification' },
      { label: 'Age Group', value: 'All ages; mix by catchment' },
      { label: 'Safety', value: 'Cable management & clearance standards' },
    ],
    featureTitles: ['Data-led mix selection', 'Prize & ticket economics', 'Serviceable floor layout'],
  }),
  makeProduct({
    id: 'p5',
    slug: 'redemption-games-suite',
    name: 'Redemption Games Suite',
    category: 'Redemption',
    industries: ['FECs', 'Shopping Malls'],
    businessTypes: ['Turnkey FEC', 'Mall Entertainment', 'Expansion Module'],
    applicationTags: ['Ticket games', 'Skill redemption', 'Family play'],
    tagline: 'Repeat-play economics for FEC floors',
    headline: 'Redemption that sustains revisits.',
    subheadline: 'Ticket-based skill games specified for replay value and controlled prize cost.',
    image: IMAGES.arcade,
    imageAlt: 'Redemption games floor',
    spaceRequired: 'From 800 sq ft',
    capacity: 'High concurrent play density',
    specs: [
      { label: 'Area Required', value: 'From ~800 sq ft' },
      { label: 'Power', value: 'Per machine load schedule' },
      { label: 'Installation', value: '2–5 weeks' },
      { label: 'Warranty', value: 'Manufacturer-backed' },
      { label: 'Maintenance', value: 'Parts programme available' },
      { label: 'Players', value: 'High turnover per square foot' },
      { label: 'Age Group', value: 'Family-friendly skill games' },
      { label: 'Safety', value: 'Floor anchors & clear aisles' },
    ],
    featureTitles: ['Replay-led game selection', 'Prize cost control', 'High-density layouts'],
  }),
  makeProduct({
    id: 'p6',
    slug: 'prize-vending-systems',
    name: 'Prize Vending Systems',
    category: 'Prize Vending',
    industries: ['FECs', 'Shopping Malls', 'Standalone Zones'],
    businessTypes: ['Expansion Module', 'Standalone Zone', 'Mall Entertainment'],
    applicationTags: ['Merchandisers', 'Claw machines', 'Capsule toys'],
    tagline: 'Automated merchandising with clear ROI',
    headline: 'Vending that complements the floor.',
    subheadline: 'Prize and capsule systems planned for location, fill cost and surveillance.',
    image: IMAGES.arcade,
    imageAlt: 'Prize vending machines',
    spaceRequired: 'From 40 sq ft per unit cluster',
    capacity: 'Continuous unattended operation',
    specs: [
      { label: 'Area Required', value: 'Cluster footprints from ~40 sq ft' },
      { label: 'Power', value: 'Standard outlet per unit' },
      { label: 'Installation', value: '1–2 weeks' },
      { label: 'Warranty', value: 'Manufacturer terms' },
      { label: 'Maintenance', value: 'Fill & hopper service SOPs' },
      { label: 'Players', value: 'Self-serve throughput' },
      { label: 'Age Group', value: 'All ages' },
      { label: 'Safety', value: 'Anti-tip anchoring where required' },
    ],
    featureTitles: ['Location-led placement', 'Fill cost discipline', 'Low-staff operation'],
  }),
  makeProduct({
    id: 'p7',
    slug: 'major-attraction-modules',
    name: 'Major Attraction Modules',
    category: 'Major Attractions',
    industries: ['FECs', 'Entertainment Parks', 'Mixed-Use'],
    businessTypes: ['Turnkey FEC', 'Hotel & Resort'],
    applicationTags: ['Trampoline', 'Mini golf', 'Climbing', 'Go-karts'],
    tagline: 'Headline attractions for destination FECs',
    headline: 'Centrepiece attractions, delivered as programmes.',
    subheadline: 'Trampoline, mini golf, climbing and active-play modules sized to catchment and capital.',
    image: IMAGES.softplayD,
    imageAlt: 'Major family entertainment attraction',
    featured: true,
    spaceRequired: 'From 3,000 sq ft',
    capacity: 'High concurrent active play',
    specs: [
      { label: 'Area Required', value: 'From ~3,000 sq ft depending on format' },
      { label: 'Power', value: 'Format-specific engineering' },
      { label: 'Installation', value: '6–16 weeks' },
      { label: 'Warranty', value: 'Structure & systems as contracted' },
      { label: 'Maintenance', value: 'Inspection-led AMC' },
      { label: 'Players', value: 'Session or free-flow models' },
      { label: 'Age Group', value: 'Format-dependent' },
      { label: 'Safety', value: 'Certifiable structures & nets' },
    ],
    featureTitles: ['Catchment-led format choice', 'Sightline & supervision design', 'Scalable expansion path'],
  }),
  makeProduct({
    id: 'p8',
    slug: 'carnival-novelty-games',
    name: 'Carnival & Novelty Games',
    category: 'Carnivals',
    industries: ['FECs', 'Events', 'Entertainment Parks'],
    businessTypes: ['Standalone Zone', 'Expansion Module', 'Turnkey FEC'],
    applicationTags: ['Midway games', 'Festival programmes', 'Seasonal events'],
    tagline: 'Midway energy for FEC and event floors',
    headline: 'Carnival programmed for celebration traffic.',
    subheadline: 'Novelty and midway formats for parties, festivals and peak calendar days.',
    image: IMAGES.arcade,
    imageAlt: 'Carnival-style entertainment games',
    spaceRequired: 'Modular — from 600 sq ft',
    capacity: 'Burst capacity for events',
    specs: [
      { label: 'Area Required', value: 'Modular from ~600 sq ft' },
      { label: 'Power', value: 'Temporary or permanent as planned' },
      { label: 'Installation', value: '1–4 weeks' },
      { label: 'Warranty', value: 'Per attraction' },
      { label: 'Maintenance', value: 'Event-ready reset SOPs' },
      { label: 'Players', value: 'High short-cycle throughput' },
      { label: 'Age Group', value: 'Family & youth' },
      { label: 'Safety', value: 'Queue barriers & staff briefing' },
    ],
    featureTitles: ['Event-calendar monetisation', 'Modular deployment', 'Staff-simple operation'],
  }),
  makeProduct({
    id: 'p9',
    slug: 'debit-card-cashless-system',
    name: 'Debit Card & Cashless System',
    category: 'Debit Card Systems',
    industries: ['FECs', 'Shopping Malls', 'Entertainment Parks'],
    businessTypes: ['Turnkey FEC', 'Expansion Module'],
    applicationTags: ['Cashless play', 'Load stations', 'Reporting'],
    tagline: 'Guest payments and operations control',
    headline: 'Cashless infrastructure for the whole floor.',
    subheadline: 'Card, load and reporting systems that simplify guest spend and back-office control.',
    image: IMAGES.bowling,
    imageAlt: 'Entertainment venue operations systems',
    spaceRequired: 'Facility-wide — load points as designed',
    capacity: 'Venue-scale guest volume',
    specs: [
      { label: 'Area Required', value: 'Load/kiosk points as per layout' },
      { label: 'Power', value: 'Networked kiosk power & data' },
      { label: 'Installation', value: '2–6 weeks with network readiness' },
      { label: 'Warranty', value: 'Hardware & software terms' },
      { label: 'Maintenance', value: 'SLA-backed system support' },
      { label: 'Players', value: 'All guests via purse model' },
      { label: 'Age Group', value: 'All ages (parent-controlled loads)' },
      { label: 'Safety', value: 'PCI-aligned payment practices' },
    ],
    featureTitles: ['Unified purse across attractions', 'Operator reporting', 'Queue-light load design'],
  }),
  makeProduct({
    id: 'p10',
    slug: 'pre-owned-equipment-programme',
    name: 'Pre-Owned Equipment Programme',
    category: 'Pre-Owned',
    industries: ['FECs', 'Standalone Zones', 'Expansion Projects'],
    businessTypes: ['Standalone Zone', 'Expansion Module'],
    applicationTags: ['Refurbished machines', 'Capital-efficient opens', 'Zone refresh'],
    tagline: 'Certified refurbished supply for capital efficiency',
    headline: 'Refurbished programme, not scrap inventory.',
    subheadline: 'Inspected, restored equipment for operators who need faster payback without abandoning standards.',
    image: IMAGES.arcade,
    imageAlt: 'Refurbished arcade equipment',
    spaceRequired: 'As per selected machines',
    capacity: 'Matched to budgeted mix',
    specs: [
      { label: 'Area Required', value: 'Per selected configuration' },
      { label: 'Power', value: 'Per machine BOM' },
      { label: 'Installation', value: '2–5 weeks typical' },
      { label: 'Warranty', value: 'Limited refurbished warranty' },
      { label: 'Maintenance', value: 'Parts pathway included in handoff' },
      { label: 'Players', value: 'Per cabinet / attraction' },
      { label: 'Age Group', value: 'Mix-dependent' },
      { label: 'Safety', value: 'Inspection checklist before ship' },
    ],
    featureTitles: ['Inspection-led selection', 'Capital-efficient opens', 'Support after install'],
  }),
  makeProduct({
    id: 'p11',
    slug: 'spares-consumables-support',
    name: 'Spares & Consumables Support',
    category: 'Spares & Consumables',
    industries: ['FECs', 'Hotels & Resorts', 'Entertainment Parks'],
    businessTypes: ['Turnkey FEC', 'Expansion Module'],
    applicationTags: ['Parts supply', 'Consumables', 'Uptime support'],
    tagline: 'Operational continuity after opening',
    headline: 'Parts and consumables that protect uptime.',
    subheadline: 'Spares planning and consumables supply so operating days are not lost to avoidable shortages.',
    image: IMAGES.bowling,
    imageAlt: 'Entertainment operations support',
    spaceRequired: 'Back-of-house storage as advised',
    capacity: 'Multi-site operator support',
    specs: [
      { label: 'Area Required', value: 'Spare parts storage plan' },
      { label: 'Power', value: 'N/A' },
      { label: 'Installation', value: 'Ongoing supply programme' },
      { label: 'Warranty', value: 'As per parts manufacturer' },
      { label: 'Maintenance', value: 'Core offering' },
      { label: 'Players', value: 'N/A — ops support' },
      { label: 'Age Group', value: 'N/A' },
      { label: 'Safety', value: 'Genuine parts specification' },
    ],
    featureTitles: ['Critical parts stocking', 'Consumables cadence', 'Technician-ready kits'],
  }),
  makeProduct({
    id: 'p12',
    slug: 'hotel-resort-recreation-package',
    name: 'Hotel & Resort Recreation Package',
    category: 'Major Attractions',
    industries: ['Hotels & Resorts', 'Mixed-Use'],
    businessTypes: ['Hotel & Resort', 'Turnkey FEC'],
    applicationTags: ['Guest amenity', 'Family packages', 'All-weather programme'],
    tagline: 'Leisure programming for hospitality assets',
    headline: 'Recreation that supports the room night.',
    subheadline: 'Curated attraction mixes for hotels and resorts — amenity value with optional day-guest monetisation.',
    image: IMAGES.softplayD,
    imageAlt: 'Hotel family recreation zone',
    featured: true,
    spaceRequired: 'From 2,000 sq ft',
    capacity: 'Guest + day-pass models',
    specs: [
      { label: 'Area Required', value: 'From ~2,000 sq ft' },
      { label: 'Power', value: 'Hospitality MEP coordination' },
      { label: 'Installation', value: 'Aligned to fit-out schedule' },
      { label: 'Warranty', value: 'As per mix components' },
      { label: 'Maintenance', value: 'Hotel engineering handoff + AMC' },
      { label: 'Players', value: 'Guest occupancy driven' },
      { label: 'Age Group', value: 'Family-focused mix' },
      { label: 'Safety', value: 'Hotel brand & local codes' },
    ],
    featureTitles: ['Amenity vs ticket balance', 'Quiet-hours operations', 'Brand-fit finishes'],
  }),
]

/** Wire related products after catalogue exists */
PRODUCTS.forEach((product) => {
  product.relatedProducts = PRODUCTS.filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      summary: p.tagline,
      image: p.heroImage,
      imageAlt: p.heroImageAlt,
    }))
})

export const PRODUCT_LIST: ProductListItem[] = PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  category: p.category,
  industries: p.industries,
  businessTypes: p.businessTypes,
  applicationTags: p.applicationTags,
  tagline: p.tagline,
  image: p.heroImage,
  imageAlt: p.heroImageAlt,
  featured: p.featured,
}))

export const DEFAULT_PRODUCT_SLUG = 'professional-bowling-lane-system'

export const ALL_INDUSTRIES = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.industries)),
).sort()

export const ALL_APPLICATIONS = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.applicationTags)),
).sort()
