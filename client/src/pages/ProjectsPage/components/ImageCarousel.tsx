import type { FC } from 'react'
import { useState, useEffect } from 'react'
import MediaItem from '../../../components/common/MediaItem'
import type { IProject } from '../types'
import { theme } from '../../../theme'

interface ImageCarouselProps {
  media: IProject['media']
  title: string
  accentColor: string
}

const ImageCarousel: FC<ImageCarouselProps> = ({ media, title, accentColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const images = media && media.length > 0 ? media : []
  const hasMultiple = images.length > 1

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [autoPlay, images.length])

  const goToSlide = (index: number) => {
    setAutoPlay(false)
    setCurrentIndex(index)
  }

  const handleMouseEnter = () => setAutoPlay(false)
  const handleMouseLeave = () => setAutoPlay(true)

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '16/10',
        background: theme.colors.surface2,
        overflow: 'hidden',
        borderRadius: '12px 12px 0 0',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Image */}
      {images.length > 0 ? (
        <MediaItem media={images[currentIndex]} alt={`${title} - Image ${currentIndex + 1}`} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: theme.colors.surface3,
          }}
          aria-hidden="true"
        />
      )}

      {/* Dot Indicators */}
      {hasMultiple && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '6px',
            zIndex: 10,
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
              style={{
                width: index === currentIndex ? '24px' : '8px',
                height: '8px',
                background: index === currentIndex ? accentColor : `${accentColor}66`,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: index === currentIndex ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.opacity =
                  index === currentIndex ? '1' : '0.6'
              }}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {hasMultiple && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            zIndex: 10,
            backdropFilter: 'blur(4px)',
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel