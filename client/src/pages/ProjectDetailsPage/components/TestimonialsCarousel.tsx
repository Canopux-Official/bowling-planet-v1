import type { FC } from 'react'

import MediaItem from '../../../components/common/MediaItem'
import StarRating from '../../../components/common/StarRating'
import styles from './TestimonialsCarousel.module.css'
import type { ITestimonial } from '../../ProjectsPage/types'

interface TestimonialsCarouselProps {
  testimonials?: ITestimonial[]
}

const MARQUEE_THRESHOLD = 4

const TestimonialsCarousel: FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null

  const shouldLoop = testimonials.length > MARQUEE_THRESHOLD
  // Only duplicate when looping — otherwise this would create visible
  // duplicate cards with nothing to justify the extra scroll width.
  const items = shouldLoop ? [...testimonials, ...testimonials] : testimonials

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className={styles.heading}>
        Client feedback
      </h2>
      <div className={shouldLoop ? styles.marqueeViewport : styles.staticViewport}>
        <div className={shouldLoop ? styles.track : styles.staticTrack}>
          {items.map((item, i) => (
            <article
              key={`${item.clientName}-${item.message.slice(0, 24)}-${i}`}
              className={styles.card}
              aria-hidden={shouldLoop && i >= testimonials.length}
            >
              <div className={styles.header}>
                {item.clientImage ? (
                  <div className={styles.avatar}>
                    <MediaItem media={item.clientImage} alt={item.clientName} />
                  </div>
                ) : null}
                <div>
                  <p className={styles.client}>{item.clientName}</p>
                  {(item.designation || item.companyName) ? (
                    <p className={styles.meta}>
                      {[item.designation, item.companyName].filter(Boolean).join(' · ')}
                    </p>
                  ) : null}
                </div>
              </div>
              <p className={styles.message}>{item.message}</p>
              {typeof item.rating === 'number' ? (
                <div className={styles.rating}>
                  <StarRating rating={item.rating} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel