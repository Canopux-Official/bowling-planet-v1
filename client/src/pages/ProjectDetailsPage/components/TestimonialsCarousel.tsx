import type { FC } from 'react'

import MediaItem from '../../../components/common/MediaItem'
import StarRating from '../../../components/common/StarRating'
import styles from './TestimonialsCarousel.module.css'
import type { ITestimonial } from '../../ProjectsPage/types'

interface TestimonialsCarouselProps {
  testimonials?: ITestimonial[]
}

const TestimonialsCarousel: FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className={styles.heading}>
        Client feedback
      </h2>
      <div className={styles.track}>
        {testimonials.map((item) => (
          <article key={`${item.clientName}-${item.message.slice(0, 24)}`} className={styles.card}>
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
    </section>
  )
}

export default TestimonialsCarousel
