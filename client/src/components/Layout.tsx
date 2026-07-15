import { type FC, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import SplashScreen from './SplashScreen'
import FloatingWhatsApp from './FloatingWhatsApp'
import { EnquiryCartWidget } from './EnquiryCartWidget'
import CookieConsent from './CookieConsent'
import ExitIntentModal from './ExitIntentModal'
import { useLeadTracker } from '../context/LeadTrackerContext'
import { useEngagementTracker } from '../hooks/useEngagementTracker'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

const Layout: FC = () => {
  const { logCTAEvent } = useLeadTracker()
  useEngagementTracker({ logEvent: logCTAEvent })

  return (
    <>
      <ScrollToTop />
      <SplashScreen />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <EnquiryCartWidget />
      <CookieConsent />
      <ExitIntentModal />
    </>
  )
}

export default Layout
