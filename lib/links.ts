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
  // Temporary aliases keep older components compiling while copy migrates.
  workshop: `https://sprinter.ai/executive-ai-accelerator${UTM}`,
  portfolioPack: `https://sprinter.ai/portfolio-executive-ai-accelerator${UTM}`,
  consulting: `https://sprinterconsulting.com${UTM}`,
  tyler: `https://tylerdreher.com${UTM}`,
  amble: `https://ambleideation.com${UTM}`,
  github: 'https://github.com/tylerdr/sprinter-studio',
} as const
