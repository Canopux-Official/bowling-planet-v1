import { useState, useEffect, useRef } from 'react'

type Direction = 'up' | 'down' | null

/**
 * Tracks the current scroll direction.
 * Returns 'up' when scrolling toward top, 'down' when scrolling toward bottom.
 */
export function useScrollDirection(): Direction {
  const [direction, setDirection] = useState<Direction>(null)
  const prevY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (Math.abs(currentY - prevY.current) < 4) return // Ignore micro-jitter
      setDirection(currentY > prevY.current ? 'down' : 'up')
      prevY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
