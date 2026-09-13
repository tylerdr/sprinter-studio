'use client'

import { track } from '@vercel/analytics'
import { useEffect } from 'react'

/**
 * One delegated listener instead of a client wrapper per link: server
 * components (footer, venture pages) only need `trackOutbound()` attributes.
 * Sends destination (host + path, UTMs stripped from the property only),
 * route, and placement. auxclick covers middle-click new-tab opens.
 */
export function OutboundTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest<HTMLAnchorElement>(
        'a[data-analytics-event]',
      )
      if (!anchor?.dataset.analyticsEvent) return
      const url = new URL(anchor.href)
      track(anchor.dataset.analyticsEvent, {
        destination: `${url.host}${url.pathname}`,
        route: window.location.pathname,
        placement: anchor.dataset.placement ?? 'unknown',
      })
    }
    document.addEventListener('click', onClick, { capture: true })
    document.addEventListener('auxclick', onClick, { capture: true })
    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      document.removeEventListener('auxclick', onClick, { capture: true })
    }
  }, [])

  return null
}
