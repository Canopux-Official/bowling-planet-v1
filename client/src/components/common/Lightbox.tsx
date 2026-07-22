import { type FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import MediaItem, { type CommonMedia } from './MediaItem'
import styles from './Lightbox.module.css'

interface LightboxProps {
  media: CommonMedia[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

const Lightbox: FC<LightboxProps> = ({ media, initialIndex, isOpen, onClose }) => {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    if (isOpen) setIndex(initialIndex)
  }, [isOpen, initialIndex])

  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % media.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + media.length) % media.length)
    }

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, media.length, onClose])

  if (!isOpen || media.length === 0) return null

  const current = media[index]

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Media viewer">
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close lightbox">
        Close
      </button>
      <div className={styles.stage}>
        <MediaItem media={current} alt="" controls={current.type === 'video'} />
      </div>
      {media.length > 1 ? (
        <div className={styles.nav}>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)}
            aria-label="Previous media"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % media.length)}
            aria-label="Next media"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>,
    document.body,
  )
}

export default Lightbox
