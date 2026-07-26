import { type FC, useEffect, useState } from 'react'
import SEO from '../../components/SEO'
import SectionProgressNav from '../../components/SectionProgressNav'
import CustomCursor from '../../components/CustomCursor'
import { homePageApi, type HomePageData } from '../../services/homePageApi'

// Sections
import Hero from './components/Hero'
import VideoShowcase from './components/VideoShowcase'
import CredibilityStrip from './components/CredibilityStrip'
import TrustedBrands from './components/TrustedBrands'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import PortfolioSection from './components/PortfolioSection'
import CaseStudiesSection from './components/CaseStudiesSection'
import ProductsSection from './components/ProductsSection'
import BlogPreviewSection from './components/BlogPreviewSection'
import FranchiseSection from './components/FranchiseSection'
import CareersSection from './components/CareersSection'
const LandingPage: FC = () => {
  const [data, setData] = useState<HomePageData | null>(null);

  useEffect(() => {
    homePageApi.getHomePageData().then(setData).catch(console.error);
  }, []);

  return (
    <>
      <SEO
        title="Bowling Planet | Premium FEC Consulting & Equipment"
        description="India's leading FEC consulting firm. From ROI feasibility to grand opening — we design, equip, and operate world-class family entertainment centers."
      />

      {/* Global interactive elements */}
      <CustomCursor />
      <SectionProgressNav />

      {/* 1. Hero (Dark) */}
      <Hero data={data?.hero} />

      {/* 1.5. Credibility Strip (Dark) */}
      <CredibilityStrip data={data?.stats} />

      {/* 2. Video Showcase (Dark) */}
      <VideoShowcase />

      {/* 3. Trusted Brands (Dark) */}
      <TrustedBrands data={data?.trustedBrands} />

      {/* 4. Services (Dark) */}
      <ServicesSection />

      {/* 6. Portfolio (Dark) */}
      <PortfolioSection data={data?.featuredProjects} />

      {/* 7. Case Studies (Light/Chalk) */}
      <CaseStudiesSection />

      {/* 8. Products (Dark/Surface) */}
      <ProductsSection data={data?.productInventory} />

      {/* 9. Blog Preview (Dark) */}
      <BlogPreviewSection />

      {/* 10. Franchise (Dark) */}
      <FranchiseSection />

      {/* 11. Careers (Light/Chalk) */}
      <CareersSection />

      {/* 12. About (Light/Chalk) - Moved to bottom */}
      <AboutSection />
    </>
  )
}

export default LandingPage
