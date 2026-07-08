import { type FC, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import SplashScreen from './SplashScreen'
import FloatingWhatsApp from './FloatingWhatsApp'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

const Layout: FC = () => {
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
    </>
  )
}

export default Layout
