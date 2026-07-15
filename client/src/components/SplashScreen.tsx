import { useState, useEffect, type FC } from 'react'

const SplashScreen: FC = () => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')
  // If splash was already seen this session, start as invisible
  const [isVisible, setIsVisible] = useState(() => !sessionStorage.getItem('bp_splash_seen'))

  useEffect(() => {
    // Check if splash screen has been shown this session
    const hasSeenSplash = sessionStorage.getItem('bp_splash_seen')
    if (hasSeenSplash) {
      setIsVisible(false)
      return
    }

    // Phase: fade in (0-800ms) → hold (800-2600ms) → fade out (2600-3700ms)
    const t1 = setTimeout(() => setPhase('hold'), 800)
    const t2 = setTimeout(() => setPhase('out'), 2600)
    const t3 = setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('bp_splash_seen', 'true')
    }, 3700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: phase === 'out' ? 0 : 1,
      transition: phase === 'in'
        ? 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        : 'opacity 1.1s cubic-bezier(0.7, 0, 1, 1)',
      pointerEvents: phase === 'out' ? 'none' : 'all',
    }}>

      {/* ── Ambient glow ──────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(95,193,209,0.07) 0%, transparent 70%)',
        animation: 'ambientPulse 3s ease-in-out infinite',
      }} />

      {/* ── Outer ring ─────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        width: 480, height: 480,
        borderRadius: '50%',
        border: '1px solid rgba(95,193,209,0.12)',
        animation: 'ringRotate 12s linear infinite',
      }}>
        {/* Dot on outer ring */}
        <div style={{
          position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
          width: 8, height: 8, borderRadius: '50%',
          background: '#5FC1D1',
          boxShadow: '0 0 12px 4px rgba(95,193,209,0.6)',
        }} />
      </div>

      {/* ── Inner ring (reversed) ─────────────────────── */}
      <div style={{
        position: 'absolute',
        width: 340, height: 340,
        borderRadius: '50%',
        border: '1px solid rgba(109,189,78,0.10)',
        animation: 'ringRotateReverse 18s linear infinite',
      }}>
        {/* Dot on inner ring */}
        <div style={{
          position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
          width: 6, height: 6, borderRadius: '50%',
          background: '#6DBD4E',
          boxShadow: '0 0 10px 3px rgba(109,189,78,0.5)',
        }} />
      </div>

      {/* ── Logo + tagline ────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        animation: 'logoFloat 4s ease-in-out infinite',
      }}>
        {/* Glow halo behind logo */}
        <div style={{
          position: 'absolute',
          width: 220, height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(95,193,209,0.18) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -60%)',
          filter: 'blur(24px)',
          animation: 'haloPulse 2.5s ease-in-out infinite',
        }} />

        <img
          src="/logo.avif"
          alt="Bowling Planet"
          style={{
            height: 140,
            width: 'auto',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 0 36px rgba(95,193,209,0.45)) drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
          }}
        />

        {/* Tagline */}
        <p style={{
          fontFamily: '"Sora", sans-serif',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          margin: 0,
          animation: 'fadeInUp 0.9s 0.5s both',
        }}>
          Family Entertainment Consultants
        </p>
      </div>

      {/* ── Progress bar ──────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: 52,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 140,
        height: 2,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.07)',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <div style={{
          height: '100%',
          borderRadius: 2,
          background: 'linear-gradient(90deg, #5FC1D1, #6DBD4E)',
          boxShadow: '0 0 8px rgba(95,193,209,0.6)',
          animation: 'loadBar 2.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }} />
      </div>

      <style>{`
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ringRotateReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes haloPulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -60%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -60%) scale(1.25); }
        }
        @keyframes loadBar {
          0%   { width: 0%; }
          40%  { width: 55%; }
          75%  { width: 80%; }
          100% { width: 100%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default SplashScreen
