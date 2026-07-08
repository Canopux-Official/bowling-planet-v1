import { type FC } from 'react'
import Hero            from '../components/Hero'
import StatsBar        from '../components/StatsBar'
import TrustedBrands   from '../components/TrustedBrands'
import AboutSection    from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import ProductsSection from '../components/ProductsSection'
import FranchiseSection from '../components/FranchiseSection'
import PortfolioSection from '../components/PortfolioSection'
import WhySection      from '../components/WhySection'
import CareersSection  from '../components/CareersSection'
import ContactSection  from '../components/ContactSection'

const LandingPage: FC = () => {
  return (
    <>
      <Hero />
      <StatsBar />
      <TrustedBrands />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <ProductsSection />
      <FranchiseSection />
      <WhySection />
      <CareersSection />
      <ContactSection />
    </>
  )
}

export default LandingPage
