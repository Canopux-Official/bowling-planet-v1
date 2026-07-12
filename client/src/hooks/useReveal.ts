import { useCallback, useRef } from 'react'

export function useReveal(threshold = 0.12) {
  const obsRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback((el: HTMLDivElement | null) => {
    // clean up any previous observer
    if (obsRef.current) {
      obsRef.current.disconnect()
      obsRef.current = null
    }
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
    obsRef.current = obs
  }, [threshold])

  return ref
}