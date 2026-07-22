import {
  type FC,
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ExpandablePillsProps {
  children: ReactNode
  'aria-label'?: string
}

/**
 * One-row pill strip that reveals a "See more" control when pills overflow the container width.
 */
const ExpandablePills: FC<ExpandablePillsProps> = ({
  children,
  'aria-label': ariaLabel,
}) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)

  const measure = useCallback(() => {
    const el = rowRef.current
    if (!el) return

    if (!expanded) {
      setOverflows(el.scrollWidth > el.clientWidth + 1)
      return
    }

    // Expanded (wrapped): still overflows if content is taller than one pill row
    const first = el.firstElementChild as HTMLElement | null
    if (!first) {
      setOverflows(false)
      return
    }
    const oneRowHeight = first.offsetHeight + 8
    const stillOverflows = el.scrollHeight > oneRowHeight + 2
    setOverflows(stillOverflows)
    if (!stillOverflows) setExpanded(false)
  }, [expanded])

  useLayoutEffect(() => {
    measure()
    const el = rowRef.current
    if (!el) return

    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, children])

  return (
    <div className="space-y-2">
      <div
        ref={rowRef}
        aria-label={ariaLabel}
        className={
          expanded
            ? 'flex flex-wrap gap-2'
            : 'flex flex-nowrap gap-2 overflow-hidden'
        }
      >
        {children}
      </div>

      {overflows ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#5FC1D1] transition-colors hover:text-[#7FD4E0] hover:underline"
        >
          {expanded ? (
            <>
              See less
              <ChevronUp size={14} aria-hidden="true" />
            </>
          ) : (
            <>
              See more
              <ChevronDown size={14} aria-hidden="true" />
            </>
          )}
        </button>
      ) : null}
    </div>
  )
}

export default ExpandablePills
