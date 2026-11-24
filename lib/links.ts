/**
 * Canonical outbound destinations for sprinter.studio.
 *
 * Every cross-domain link ships the Studio UTM pair. Keep cross-site links here
 * rather than hard-coding bare URLs in components.
 */
const UTM = '?utm_source=studio&utm_medium=site'

export const outbound = {
  executiveAccelerator: `https://sprinterconsulting.com/executive-ai-accelerator${UTM}`,
  portfolioAccelerator: `https://sprinterconsulting.com/portfolio-executive-ai-accelerator${UTM}`,
  skillsCheck: `https://sprinter.ai/ai-skills-check${UTM}`,
  productWedgeReview: `https://sprinter.ai/product-wedge-review${UTM}`,
  // Temporary aliases keep older components compiling while copy migrates.
  workshop: `https://sprinterconsulting.com/executive-ai-accelerator${UTM}`,
  portfolioPack: `https://sprinterconsulting.com/portfolio-executive-ai-accelerator${UTM}`,
  sprinterAi: `https://sprinter.ai${UTM}`,
  consulting: `https://sprinterconsulting.com${UTM}`,
  dataworks: `https://sprinterdataworks.com${UTM}`,
  tyler: `https://tylerdreher.com${UTM}`,
  amble: `https://ambleideation.com${UTM}`,
  github: 'https://github.com/tylerdr/sprinter-studio',
  // Not a site, so no UTM pair; the tracker records the address as destination.
  partnerInquiry: 'mailto:hi@sprinter.ai?subject=Partner%20incubation%20proposal',
} as const

/**
 * "The Sprinter family" — the shared footer block on all four Sprinter sites.
 * Names and one-liners are the canonical wording from the 2026-11-23 web
 * family brief; keep them identical to the other three sites. Studio's own
 * row links home rather than out.
 */
export const family = [
  {
    name: 'Sprinter AI',
    line: 'Vertical AI products, built with the people who know the work.',
    host: 'sprinter.ai',
    href: outbound.sprinterAi,
  },
  {
    name: 'Sprinter Consulting',
    line: 'Hands-on AI enablement and workflow implementation for leaders and operating teams.',
    host: 'sprinterconsulting.com',
    href: outbound.consulting,
  },
  {
    name: 'Sprinter Dataworks',
    line: 'Understand, prepare and license your business data to help fund your AI work.',
    host: 'sprinterdataworks.com',
    href: outbound.dataworks,
  },
  {
    name: 'Sprinter Studio',
    line: 'Our venture studio: partner incubations and internal experiments, published in public.',
    host: 'sprinter.studio',
    href: '/',
  },
] as const

/** Related properties outside the four-site family. */
export const related = [
  { label: 'Amble — the company brain, built by Sprinter', host: 'ambleideation.com', href: outbound.amble },
  { label: 'Founded by Tyler Dreher', host: 'tylerdreher.com', href: outbound.tyler },
] as const

/**
 * Marks an outbound anchor for the delegated click tracker mounted in the
 * root layout (`OutboundTracker`). Spread onto the `<a>`; the href (with its
 * UTM pair) is left untouched.
 */
export function trackOutbound(placement: string) {
  return {
    'data-analytics-event': 'outbound_click',
    'data-placement': placement,
  } as const
}

/**
 * Marks an on-site link to the "Work with Sprinter" router (`/#working-with-sprinter`)
 * so the delegated tracker records it separately from true outbound clicks.
 */
export function trackRoute(placement: string) {
  return {
    'data-analytics-event': 'route_click',
    'data-placement': placement,
  } as const
}
