import { useEffect, type FC } from 'react'
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

const Layout: FC = () => {
  const { logCTAEvent } = useLeadTracker()
  useEngagementTracker({ logEvent: logCTAEvent })
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
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
