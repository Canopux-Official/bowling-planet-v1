import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  
  useEffect(() => {
    // Some browsers need a tiny delay or instant behavior to override browser default scroll restoration
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 0)
  }, [pathname])
  
  return null
}

export default ScrollToTop
