import type { FC } from 'react'
import styles from './StarRating.module.css'

interface StarRatingProps {
  rating: number
}

const StarRating: FC<StarRatingProps> = ({ rating }) => {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)))

  return (
    <div className={styles.rating} role="img" aria-label={`${clamped} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < clamped ? undefined : styles.empty} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
