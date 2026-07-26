import { type FC, useRef } from 'react'
import { motion } from 'framer-motion'

const VideoShowcase: FC = () => {
  const containerRef = useRef<HTMLElement>(null)

  // Parallax effect for the overlay content
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ['start end', 'end start']
  // })
  // const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={containerRef}
      style={{
        background: '#000',
        paddingTop: 100,
        paddingBottom: 0,
      }}
    >
      {/* ── Section Heading ──────────────────────────────────────── */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', marginBottom: 64, textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="font-display"
          style={{
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            color: '#fff',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Immersive Experiences,{' '}
          <span style={{ fontStyle: 'italic', color: '#5FC1D1' }}>Engineered.</span>
        </motion.h2>
      </div>

      {/* ── Video Container ───────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          minHeight: 600,
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            src="/showcase.mp4"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.9) contrast(1.1)',
            }}
          />
        </div>

        {/* ── Edge Gradients for smooth blending ─────────────────── */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, rgba(0,0,0,1) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  )
}

export default VideoShowcase
