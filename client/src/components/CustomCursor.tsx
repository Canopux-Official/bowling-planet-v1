/**
 * CustomCursor — Desktop-only ring+dot cursor.
 * Uses mix-blend-mode: difference for a premium inversion effect.
 * Hidden on touch devices via CSS.
 */

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let ringX = 0, ringY = 0
    let raf: number

    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e

      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`
        dotRef.current.style.top  = `${y}px`
      }

      // Ring follows with spring-like lag
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      const animate = () => {
        ringX = lerp(ringX, x, 0.14)
        ringY = lerp(ringY, y, 0.14)
        if (ringRef.current) {
          ringRef.current.style.left = `${ringX}px`
          ringRef.current.style.top  = `${ringY}px`
        }
        raf = requestAnimationFrame(animate)
      }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(animate)
    }

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const interactive = el.closest('button, a, [data-cursor-hover], input, select, textarea')
      setHovering(!!interactive)
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', onEnter, { passive: true })
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onEnter)
      cancelAnimationFrame(raf)
      document.body.style.cursor = ''
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        className="custom-cursor cursor-dot"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}
        aria-hidden="true"
      />
      {/* Ring — lags behind for premium feel */}
      <div
        ref={ringRef}
        className={`custom-cursor cursor-ring ${hovering ? 'hover' : ''}`}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998 }}
        aria-hidden="true"
      />
    </>
  )
}
