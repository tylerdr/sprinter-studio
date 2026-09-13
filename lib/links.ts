/**
 * Canonical outbound destinations for sprinter.studio.
 *
 * Every cross-domain link ships the Studio UTM pair. Keep cross-site links here
 * rather than hard-coding bare URLs in components.
 */
const UTM = '?utm_source=studio&utm_medium=site'

export const outbound = {
  executiveAccelerator: `https://sprinter.ai/executive-ai-accelerator${UTM}`,
  portfolioAccelerator: `https://sprinter.ai/portfolio-executive-ai-accelerator${UTM}`,
  skillsCheck: `https://sprinter.ai/ai-skills-check${UTM}`,
  productWedgeReview: `https://sprinter.ai/product-wedge-review${UTM}`,
  // Temporary aliases keep older components compiling while copy migrates.
  workshop: `https://sprinter.ai/executive-ai-accelerator${UTM}`,
  portfolioPack: `https://sprinter.ai/portfolio-executive-ai-accelerator${UTM}`,
  sprinterAi: `https://sprinter.ai${UTM}`,
  consulting: `https://sprinterconsulting.com${UTM}`,
  tyler: `https://tylerdreher.com${UTM}`,
  amble: `https://ambleideation.com${UTM}`,
  github: 'https://github.com/tylerdr/sprinter-studio',
  // Not a site, so no UTM pair; the tracker records the address as destination.
  partnerInquiry: 'mailto:hi@sprinter.ai?subject=Partner%20incubation%20proposal',
} as const

/**
 * Sibling-property roster shared by the footer and the mobile drawer. Labels
 * reuse the existing descriptor strings; the hostname prints in mono under
 * each (BRAND.md OutboundLink pattern).
 */
export const siblings = [
  { label: 'Sprinter — the parent brand and build engine', host: 'sprinter.ai', href: outbound.sprinterAi },
  { label: 'Sprinter Consulting — the execution practice of Sprinter', host: 'sprinterconsulting.com', href: outbound.consulting },
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
