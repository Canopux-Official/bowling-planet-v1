export const SITE = {
  name: 'Bowling Planet',
  legalName: 'Bowling Planet',
  url: 'https://www.bowlingplanet.co.in',
  email: 'pr@bowlingplanet.co.in',
  locale: 'en_IN',
  description:
    "India's leading Family Entertainment Center consulting and turnkey solutions company.",
} as const

export const ROUTES = {
  home: '/',
  products: '/products',
  productDetail: (slug: string) => `/products/${slug}`,
  contact: '/contact',
  franchise: '/franchise',
} as const

export const CTA = {
  bookConsultation: { label: 'Book Consultation', href: '/contact?intent=consultation' },
  downloadBrochure: { label: 'Download Brochure', href: '#brochure' },
  requestQuote: { label: 'Request Quote', href: '/contact?intent=quote' },
  talkToExperts: { label: 'Talk To Experts', href: '/contact?intent=experts' },
  requestProposal: { label: 'Request Detailed Proposal', href: '/contact?intent=proposal' },
} as const
