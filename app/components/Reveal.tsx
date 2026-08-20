'use client'

import { useEffect, useRef } from 'react'

const EASE = 'cubic-bezier(0.21, 0.55, 0.28, 1)'

/**
 * Entrance rise that only ever animates transform. Opacity is never
 * touched — not on the scroll path and not on the mount path — so server
 * HTML, pre-hydration paints, inert captures, and full-page screenshots
 * always show every element. An element the observer never reaches is
 * merely offset by its entrance distance, not hidden, which is why no
 * reveal-fallback timer is needed.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  x = 0,
  y = 20,
  immediate = false,
  className,
  id,
  as = 'div',
}: {
  children: React.ReactNode
  /** Transition delay, seconds. */
  delay?: number
  /** Transition duration, seconds. */
  duration?: number
  /** Entrance offset, px. */
  x?: number
  /** Entrance offset, px. */
  y?: number
  /** Animate on mount even when already in view (hero entrances). */
  immediate?: boolean
  className?: string
  id?: string
  as?: 'div' | 'p' | 'li'
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (
      !el ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const offset = () => {
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const settle = () => {
      el.style.transition = `transform ${duration}s ${EASE} ${delay}s`
      el.style.transform = 'translate(0px, 0px)'
    }
    const reset = () => {
      el.style.removeProperty('transform')
      el.style.removeProperty('transition')
    }

    // Elements already at/above the fold at hydration stay static unless
    // they opted into an immediate mount entrance.
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      if (!immediate) return
      offset()
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(settle)
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
        reset()
      }
    }

    offset()

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          settle()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      reset()
    }
  }, [delay, duration, immediate, x, y])

  const Comp = as as 'div'

  return (
    <Comp ref={ref} id={id} className={className}>
      {children}
    </Comp>
  )
}
