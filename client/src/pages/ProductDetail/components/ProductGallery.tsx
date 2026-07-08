import { type FC, useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductGallery: FC<Props> = ({ product }) => {
  const [active, setActive] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const images = product.gallery

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((i) => (i + dir + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    if (!fullscreen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [fullscreen, go])

  if (!images.length) return null

  const current = images[active]

  return (
    <section
      aria-labelledby="gallery-title"
      style={{ background: theme.colors.surface, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
    >
      <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
            Gallery
          </motion.div>
          <motion.h2
            id="gallery-title"
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 40,
              color: theme.colors.text1,
            }}
          >
            Installations in context
          </motion.h2>

          <motion.div variants={fadeUp}>
            <button
              type="button"
              aria-label={`Open fullscreen gallery — ${current.alt}`}
              onClick={() => setFullscreen(true)}
              style={{
                width: '100%',
                padding: 0,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.void,
                cursor: 'zoom-in',
                overflow: 'hidden',
                borderRadius: 4,
                display: 'block',
              }}
            >
              <img
                src={current.src}
                alt={current.alt}
                style={{ width: '100%', height: 'min(68vh, 640px)', objectFit: 'cover', display: 'block' }}
              />
            </button>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                marginTop: 16,
                flexWrap: 'wrap',
              }}
            >
              <p style={{ margin: 0, color: theme.colors.text2, fontSize: 14 }}>
                {current.caption || current.alt}
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn btn-ghost" style={{ padding: '10px 18px' }} onClick={() => go(-1)} aria-label="Previous image">
                  ←
                </button>
                <button type="button" className="btn btn-ghost" style={{ padding: '10px 18px' }} onClick={() => go(1)} aria-label="Next image">
                  →
                </button>
              </div>
            </div>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '24px 0 0',
                display: 'flex',
                gap: 10,
                overflowX: 'auto',
              }}
            >
              {images.map((img, i) => (
                <li key={img.id}>
                  <button
                    type="button"
                    aria-label={img.alt}
                    aria-current={i === active}
                    onClick={() => setActive(i)}
                    style={{
                      padding: 0,
                      border: `1px solid ${i === active ? theme.colors.teal : theme.colors.border}`,
                      background: 'transparent',
                      cursor: 'pointer',
                      width: 96,
                      height: 64,
                      overflow: 'hidden',
                      borderRadius: 2,
                      opacity: i === active ? 1 : 0.55,
                    }}
                  >
                    <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: 'rgba(0,0,0,0.96)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setFullscreen(false)}
              style={{ position: 'absolute', top: 20, right: 20 }}
              aria-label="Close fullscreen gallery"
            >
              Close
            </button>
            <img
              src={current.src}
              alt={current.alt}
              style={{ maxWidth: 'min(1200px, 100%)', maxHeight: '80vh', objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button type="button" className="btn btn-ghost" onClick={() => go(-1)} aria-label="Previous image">← Previous</button>
              <button type="button" className="btn btn-ghost" onClick={() => go(1)} aria-label="Next image">Next →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProductGallery
