/**
 * Franchise Page — conversion-focused; APIs and forms unchanged
 * Desktop: sticky ROI (left) + scrolling content (right)
 * Mobile: Hero → Advantage → ROI → rest
 */
import { type FC, useEffect, useState } from 'react'
import SEO from '../../components/SEO'
import { franchisePageApi, type FranchisePageData } from '../../services/franchisePageApi'
import FranchiseHero from './components/FranchiseHero'
import FranchiseWhyUs from './components/FranchiseWhyUs'
import FranchiseInvestment from './components/FranchiseInvestment'
import FranchiseProcess from './components/FranchiseProcess'
import FranchiseOfferings from './components/FranchiseOfferings'
import FranchiseQualifications from './components/FranchiseQualifications'
import FranchiseFAQ from './components/FranchiseFAQ'
import FranchiseApply from './components/FranchiseApply'
import RoiCalculatorSection from '../Landing/components/roi-calculator/RoiCalculatorSection'

const FranchisePage: FC = () => {
  const [data, setData] = useState<FranchisePageData | null>(null)

  useEffect(() => {
    const fetchFranchiseData = async () => {
      try {
        const res = await franchisePageApi.getFranchisePageData()
        if (res.success && res.data) {
          setData(res.data)
        }
      } catch (err) {
        console.error('Failed to fetch franchise page data', err)
      }
    }
    fetchFranchiseData()
  }, [])

  return (
    <div className="franchise-catalogue bg-black text-[#F5F5F7]">
      <SEO
        title="Franchise Opportunities"
        description="Partner with Bowling Planet and start your own world-class family entertainment center."
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity:
            data?.faqs?.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })) || [],
        }}
      />

      <div className="mx-auto flex max-w-[1500px] flex-col pt-20 sm:pt-24 lg:grid lg:grid-cols-[minmax(300px,400px)_minmax(0,1fr)] lg:items-start">
        {/* Mobile: after Advantage (order-2). Desktop: left sticky column */}
        <aside className="order-2 border-y border-white/[0.08] lg:order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-20 lg:z-20 lg:h-[calc(100vh-5rem)] lg:border-y-0 lg:border-r lg:border-white/[0.08]">
          <RoiCalculatorSection compact panel />
        </aside>

        {/* Mobile first: intro + advantage */}
        <div className="order-1 min-w-0 lg:order-2 lg:col-start-2 lg:row-start-1">
          <FranchiseHero valueProps={data?.valueProps || []} />
          <FranchiseWhyUs />
        </div>

        {/* Mobile last: remaining sections */}
        <div className="order-3 min-w-0 lg:order-2 lg:col-start-2 lg:row-start-2">
          <FranchiseInvestment tiers={data?.investmentTiers || []} />
          <FranchiseProcess />
          <FranchiseOfferings />
          <FranchiseQualifications />
          <FranchiseFAQ faqs={data?.faqs || []} />
          <FranchiseApply />
        </div>
      </div>
    </div>
  )
}

export default FranchisePage
