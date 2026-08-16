'use client'

import { useEffect, useRef } from 'react'

const FALLBACK_REVEAL_MS = 2500
const EASE = 'cubic-bezier(0.21, 0.55, 0.28, 1)'

/**
 * Fail-open scroll reveal. Server HTML ships fully visible — no
 * `opacity:0` ever reaches SSR/static output, so crawlers, no-JS
 * contexts, and anything reading the page before hydration always see
 * the content. Only elements still below the viewport at hydration get
 * the entrance state (applied imperatively, so React never renders a
 * hidden frame); a timer reveals everything for inert contexts (audits,
 * screenshots, JS crawlers that never interact) and real user input
 * cancels that shortcut so the observer drives the entrance.
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

    const hide = () => {
      el.style.opacity = '0'
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const show = () => {
      el.style.transition = `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`
      el.style.opacity = '1'
      el.style.transform = 'translate(0px, 0px)'
    }
    const reset = () => {
      el.style.removeProperty('opacity')
      el.style.removeProperty('transform')
      el.style.removeProperty('transition')
    }

    // Elements already at/above the fold at hydration stay static unless
    // they opted into an immediate mount entrance.
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      if (!immediate) return
      hide()
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(show)
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
        reset()
      }
    }

    hide()

    // Bare `scroll` is deliberately not in this list: hash navigation,
    // scroll restoration, and capture tooling fire it programmatically.
    const inputEvents = ['pointerdown', 'pointermove', 'wheel', 'touchstart', 'keydown'] as const

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal()
      },
      { rootMargin: '0px 0px -60px 0px' },
    )

    const teardown = () => {
      observer.disconnect()
      window.clearTimeout(fallback)
      for (const event of inputEvents) {
        window.removeEventListener(event, cancelFallback)
      }
    }
    const reveal = () => {
      teardown()
      show()
    }

    observer.observe(el)
    const fallback = window.setTimeout(reveal, FALLBACK_REVEAL_MS)
    const cancelFallback = () => window.clearTimeout(fallback)
    for (const event of inputEvents) {
      window.addEventListener(event, cancelFallback, { once: true, passive: true })
    }

    return () => {
      teardown()
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
