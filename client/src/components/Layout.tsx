import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
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
