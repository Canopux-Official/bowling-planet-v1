import { type FC, useEffect, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { theme } from '../theme'
import { useLeadTracker } from '../context/LeadTrackerContext'
import { apiClient } from '../services/apiClient'

const ExitIntentModal: FC = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { logCTAEvent, state } = useLeadTracker()

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('bp_exit_intent_shown')) return

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse moves up towards the address bar/close button
      if (e.clientY <= 0) {
        setShow(true)
        sessionStorage.setItem('bp_exit_intent_shown', 'true')
        logCTAEvent('Exit Intent Modal Shown')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [logCTAEvent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubmitted(true)
    logCTAEvent('Exit Intent Modal Submitted')
    
    // Save as partial lead
    try {
      await apiClient('/leads/partial', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Exit Intent Lead',
          email,
          utm: state.utm,
          device: state.deviceInfo,
          sessionId: state.sessionId,
          behavior: {
            isReturningVisitor: state.isReturningVisitor,
            eventLog: state.eventLog,
          },
          enquiryItems: state.enquiryCart,
        }),
      })
    } catch (error) {
      console.error('Failed to save exit intent lead', error)
    }

    setTimeout(() => {
      setShow(false)
    }, 3000)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.3s ease',
      padding: '24px'
    }}>
      <div className="glass-card" style={{
        position: 'relative',
        maxWidth: 500,
        width: '100%',
        padding: '40px',
        borderRadius: 24,
        textAlign: 'center',
        boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${theme.colors.teal}30`,
      }}>
        <button
          onClick={() => {
            setShow(false)
            logCTAEvent('Exit Intent Modal Closed')
          }}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            color: theme.colors.text2,
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div>
            <h3 className="font-display" style={{ color: theme.colors.text1, fontSize: 24, marginBottom: 12 }}>
              Check your inbox!
            </h3>
            <p style={{ color: theme.colors.text2, fontSize: 16 }}>
              We'll send you our expert guide on starting a successful Bowling Center shortly.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="font-display" style={{ color: theme.colors.text1, fontSize: 28, marginBottom: 16, lineHeight: 1.2 }}>
              Wait! Don't leave without our <span className="text-gradient">Free Guide</span>
            </h3>
            <p style={{ color: theme.colors.text2, fontSize: 16, marginBottom: 32 }}>
              Enter your email to receive our comprehensive guide on setting up a highly profitable Bowling & FEC Center.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12 }}>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  borderRadius: 12,
                  border: `1px solid ${theme.colors.border}`,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: theme.colors.text1,
                  fontSize: 16,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '14px 24px',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 16,
                }}
              >
                Get Guide <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExitIntentModal
