import { type FC, useEffect, useState } from 'react'
import { useGlobalSettings } from '../context/GlobalSettingsContext'
import { useLeadTracker } from '../context/LeadTrackerContext'

const FloatingWhatsApp: FC = () => {
  const { settings } = useGlobalSettings()
  const { logCTAEvent } = useLeadTracker()
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Check if splash screen is running this session
    const hasSeenSplash = sessionStorage.getItem('bp_splash_seen')
    
    if (hasSeenSplash) {
      setIsVisible(true)
    } else {
      // Delay to allow splash screen to finish (3700ms in SplashScreen.tsx)
      const timer = setTimeout(() => setIsVisible(true), 4000)
      return () => clearTimeout(timer)
    }
  }, [])
  
  // Default to placeholder if not loaded yet
  const whatsappNumber = settings?.socials?.whatsappNumber || '919876543210'

  if (!isVisible) return null
  
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      onClick={(e) => {
        e.preventDefault()
        logCTAEvent('Floating WhatsApp Icon Clicked')
        setTimeout(() => {
          window.open(`https://wa.me/${whatsappNumber}`, '_blank')
        }, 300)
      }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="floating-widget"
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 9999,
        width: 60,
        height: 60,
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 211, 102, 0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.4)'
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="white"
        style={{ marginLeft: 2, marginTop: 2 }} // Optical alignment
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  )
}

export default FloatingWhatsApp
