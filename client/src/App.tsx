/**
 * Bowling Planet — App entry point
 * ─────────────────────────────────
 * Thin orchestrator: imports components and composes the page.
 * All logic lives in /components and /hooks.
 */

import Nav             from './components/Nav'
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
import ContactFooter   from './components/ContactFooter'

export default function App() {
  return (
    <>
      {/* ── Global sticky nav ─────────────────────────── */}
      <Nav />

      <main>
        {/* 1. Hero — Static cinematic section */}
        <Hero />

        {/* 2. Stats bar */}
        <StatsBar />

        {/* Trusted By Brands */}
        <TrustedBrands />

        {/* 3. About / Founder */}
        <AboutSection />

        {/* 4. Portfolio / projects (Our Prestigious Projects) */}
        <PortfolioSection />

        {/* 5. Services (pre-opening + operations) */}
        <ServicesSection />

        {/* 6. Products & equipment */}
        <ProductsSection />

        {/* 7. Franchise opportunity */}
        <FranchiseSection />

        {/* 8. Why Bowling Planet */}
        <WhySection />

        {/* 9. Careers */}
        <CareersSection />
      </main>

      {/* 10. Contact + Footer */}
      <ContactFooter />
    </>
  )
}
