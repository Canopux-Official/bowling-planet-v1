/**
 * Franchise Page — Full conversion-focused page
 * Composed from modular franchise/ components
 */
import { type FC, useEffect, useState } from 'react'
import SEO from '../../components/SEO'
import { franchisePageApi, type FranchisePageData } from '../../services/franchisePageApi'
import FranchiseHero          from './components/FranchiseHero'
import FranchiseTrustBar      from './components/FranchiseTrustBar'
import FranchiseWhyUs         from './components/FranchiseWhyUs'
import FranchiseInvestment    from './components/FranchiseInvestment'
import FranchiseProcess       from './components/FranchiseProcess'
import FranchiseOfferings     from './components/FranchiseOfferings'
import FranchiseQualifications from './components/FranchiseQualifications'
import FranchiseFAQ           from './components/FranchiseFAQ'
import FranchiseApply         from './components/FranchiseApply'
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
    <>
      <SEO 
        title="Franchise Opportunities" 
        description="Partner with Bowling Planet and start your own world-class family entertainment center."
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data?.faqs?.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          })) || []
        }}
      />
      {/* 1. Hero + value props grid */}
      <FranchiseHero valueProps={data?.valueProps || []} />

      {/* 2. Trust bar — numbers at a glance */}
      <FranchiseTrustBar />

      {/* 3. Why Partner with Us — 12 reasons */}
      <FranchiseWhyUs />

      <RoiCalculatorSection/>

      {/* 4. Investment Models — interactive tier selector */}
      <FranchiseInvestment tiers={data?.investmentTiers || []} />

      {/* 5. The 7-Step Process */}
      <FranchiseProcess />

      {/* 6. Product Offerings — 700+ games catalogue */}
      <FranchiseOfferings />

      {/* 7. Partner Qualifications */}
      <FranchiseQualifications />

      {/* 8. FAQ Accordion */}
      <FranchiseFAQ faqs={data?.faqs || []} />

      {/* 9. Application Form — the conversion point */}
      <FranchiseApply />

      
    </>
  )
}

export default FranchisePage

