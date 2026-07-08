import { type FC } from 'react'
import Hero            from '../components/landing/Hero'
import StatsBar        from '../components/landing/StatsBar'
import TrustedBrands   from '../components/landing/TrustedBrands'
import AboutSection    from '../components/landing/AboutSection'
import ServicesSection from '../components/landing/ServicesSection'
import ProductsSection from '../components/landing/ProductsSection'
import FranchiseSection from '../components/landing/FranchiseSection'
import PortfolioSection from '../components/landing/PortfolioSection'
import WhySection      from '../components/landing/WhySection'
import CareersSection  from '../components/landing/CareersSection'
import ContactSection  from '../components/landing/ContactSection'

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

