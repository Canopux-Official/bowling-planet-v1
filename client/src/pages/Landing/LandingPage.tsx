import { type FC, useEffect, useState } from 'react'
import Hero            from './components/Hero'
import StatsBar        from './components/StatsBar'
import TrustedBrands   from './components/TrustedBrands'
import AboutSection    from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProductsSection from './components/ProductsSection'
import FranchiseSection from './components/FranchiseSection'
import PortfolioSection from './components/PortfolioSection'
import WhySection      from './components/WhySection'
import CareersSection  from './components/CareersSection'
import ContactSection  from './components/ContactSection'
import { homePageApi, type HomePageData } from '../../services/homePageApi'
import SEO from '../../components/SEO'

const LandingPage: FC = () => {
  const [data, setData] = useState<HomePageData | null>(null);

  useEffect(() => {
    homePageApi.getHomePageData().then(setData).catch(console.error);
  }, []);

  return (
    <>
      <SEO 
        title="India's Best Entertainment Centers" 
        description="We design, equip, and operate world-class family entertainment centers including bowling alleys, VR arenas, and trampoline parks."
      />
      <Hero data={data?.hero} />
      <StatsBar data={data?.stats} />
      <TrustedBrands data={data?.trustedBrands} />
      <AboutSection />
      <PortfolioSection data={data?.featuredProjects} />
      <ServicesSection />
      <ProductsSection data={data?.productInventory} />
      <FranchiseSection />
      <WhySection />
      <CareersSection />
      <ContactSection />
    </>
  )
}

export default LandingPage


