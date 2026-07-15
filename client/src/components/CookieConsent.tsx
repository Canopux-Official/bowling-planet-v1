import { type FC, useEffect, useState } from 'react'
import { theme } from '../theme'

const CookieConsent: FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if the user has already consented or rejected
    const consent = localStorage.getItem('bp_cookie_consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('bp_cookie_consent', 'accepted')
    setShow(false)
  }

  const handleReject = () => {
    localStorage.setItem('bp_cookie_consent', 'rejected')
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 24,
      right: 24,
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div className="glass-card" style={{
        padding: '24px 32px',
        borderRadius: 16,
        maxWidth: 800,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        pointerEvents: 'auto',
        boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${theme.colors.teal}30`,
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <h4 className="font-display" style={{ color: theme.colors.text1, fontSize: 18, marginBottom: 8 }}>
            We Value Your Privacy
          </h4>
          <p style={{ color: theme.colors.text2, fontSize: 14, lineHeight: 1.5, margin: 0 }}>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <button 
            onClick={handleReject}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: theme.colors.text1,
              padding: '10px 20px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            Reject
          </button>
          <button 
            onClick={handleAccept}
            className="btn btn-primary"
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
