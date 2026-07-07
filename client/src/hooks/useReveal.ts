import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to a div ref.
 * Adds class `visible` when the element enters the viewport.
 * Unobserves after first trigger (fire-once).
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}
