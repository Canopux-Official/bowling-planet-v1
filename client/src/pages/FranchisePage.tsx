/**
 * Franchise Page — Full conversion-focused page
 * Composed from modular franchise/ components
 */
import { type FC } from 'react'
import FranchiseHero          from '../components/franchise/FranchiseHero'
import FranchiseTrustBar      from '../components/franchise/FranchiseTrustBar'
import FranchiseWhyUs         from '../components/franchise/FranchiseWhyUs'
import FranchiseInvestment    from '../components/franchise/FranchiseInvestment'
import FranchiseProcess       from '../components/franchise/FranchiseProcess'
import FranchiseOfferings     from '../components/franchise/FranchiseOfferings'
import FranchiseQualifications from '../components/franchise/FranchiseQualifications'
import FranchiseFAQ           from '../components/franchise/FranchiseFAQ'
import FranchiseApply         from '../components/franchise/FranchiseApply'

const FranchisePage: FC = () => {
  return (
    <>
      {/* 1. Hero + value props grid */}
      <FranchiseHero />

      {/* 2. Trust bar — numbers at a glance */}
      <FranchiseTrustBar />

      {/* 3. Why Partner with Us — 12 reasons */}
      <FranchiseWhyUs />

      {/* 4. Investment Models — interactive tier selector */}
      <FranchiseInvestment />

      {/* 5. The 7-Step Process */}
      <FranchiseProcess />

      {/* 6. Product Offerings — 700+ games catalogue */}
      <FranchiseOfferings />

      {/* 7. Partner Qualifications */}
      <FranchiseQualifications />

      {/* 8. FAQ Accordion */}
      <FranchiseFAQ />

      {/* 9. Application Form — the conversion point */}
      <FranchiseApply />
    </>
  )
}

export default FranchisePage
