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
    // Only show once per session, and never show if they already submitted
    if (sessionStorage.getItem('bp_exit_intent_shown') || localStorage.getItem('bp_exit_intent_submitted')) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (sessionStorage.getItem('bp_exit_intent_shown') || localStorage.getItem('bp_exit_intent_submitted')) return

      // If mouse moves up towards the address bar/close button
      if (e.clientY <= 0) {
        setShow(true)
        sessionStorage.setItem('bp_exit_intent_shown', 'true')
        logCTAEvent('Exit Intent Modal Shown')
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [logCTAEvent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const submitEvent = { label: 'Exit Intent Modal Submitted', timestamp: new Date().toISOString(), path: window.location.pathname }
    setSubmitted(true)
    logCTAEvent('Exit Intent Modal Submitted')
    localStorage.setItem('bp_exit_intent_submitted', 'true')
    
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
            eventLog: [...state.eventLog, submitEvent],
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
      <div className="exit-intent-card" style={{
        position: 'relative',
        maxWidth: 500,
        width: '100%',
        borderRadius: 24,
        textAlign: 'center',
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px ${theme.colors.teal}30`,
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
            <h3 className="font-display exit-intent-title">
              Check your inbox!
            </h3>
            <p className="exit-intent-desc" style={{ marginBottom: 0 }}>
              We'll send you our expert guide on starting a successful Bowling Center shortly.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="font-display exit-intent-title">
              Wait! Don't leave without our <span className="text-gradient">Free Guide</span>
            </h3>
            <p className="exit-intent-desc">
              Enter your email to receive our comprehensive guide on setting up a highly profitable Bowling & FEC Center.
            </p>
            <form onSubmit={handleSubmit} className="exit-intent-form">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="exit-intent-input"
              />
              <button
                type="submit"
                className="btn btn-primary exit-intent-submit"
              >
                Get Guide <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .exit-intent-card {
          padding: 40px;
        }
        .exit-intent-title {
          color: ${theme.colors.text1};
          font-size: 28px;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .exit-intent-desc {
          color: ${theme.colors.text2};
          font-size: 16px;
          margin-bottom: 32px;
        }
        .exit-intent-form {
          display: flex;
          gap: 12px;
          flex-direction: row;
        }
        .exit-intent-input {
          flex: 1;
          padding: 14px 20px;
          border-radius: 12px;
          border: 1px solid ${theme.colors.border};
          background-color: rgba(255,255,255,0.05);
          color: ${theme.colors.text1};
          font-size: 16px;
          outline: none;
        }
        .exit-intent-input:focus {
          border-color: ${theme.colors.teal};
        }
        .exit-intent-submit {
          padding: 14px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 16px;
        }
        
        @media (max-width: 600px) {
          .exit-intent-card {
            padding: 32px 24px;
          }
          .exit-intent-title {
            font-size: 24px;
            margin-bottom: 12px;
          }
          .exit-intent-desc {
            font-size: 15px;
            margin-bottom: 24px;
          }
          .exit-intent-form {
            flex-direction: column;
            gap: 16px;
          }
          .exit-intent-submit {
            width: 100%;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default ExitIntentModal
