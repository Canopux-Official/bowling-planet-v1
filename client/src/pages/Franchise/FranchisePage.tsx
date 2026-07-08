/**
 * Franchise Page — Full conversion-focused page
 * Composed from modular franchise/ components
 */
import { type FC } from 'react'
import FranchiseHero          from './components/FranchiseHero'
import FranchiseTrustBar      from './components/FranchiseTrustBar'
import FranchiseWhyUs         from './components/FranchiseWhyUs'
import FranchiseInvestment    from './components/FranchiseInvestment'
import FranchiseProcess       from './components/FranchiseProcess'
import FranchiseOfferings     from './components/FranchiseOfferings'
import FranchiseQualifications from './components/FranchiseQualifications'
import FranchiseFAQ           from './components/FranchiseFAQ'
import FranchiseApply         from './components/FranchiseApply'

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

