/**
 * Canonical positioning copy. Rendered in exactly three places — the shared
 * Footer, the homepage Co-build section, and /llms.txt — so the claim never
 * drifts between surfaces. See documents/DECISIONS.md for the ADR.
 */

export const POSITIONING_STATEMENT =
  'Sprinter Studio is a truth-labeled, services-backed venture portfolio. We build and operate our own products, take on selective client work, and co-build with domain insiders who bring distribution, cash, a real wedge, and clean IP.'

export const NOT_A_FUND_STATEMENT =
  'Sprinter Studio is services-backed, not a fund. We do not raise outside capital, promise portfolio returns, or manage other people’s money.'

export const CO_BUILD_CTA_LABEL = 'Propose a product wedge'

export const CO_BUILD_CRITERIA = [
  'You are a domain insider — you own the problem, not just an idea about it.',
  'You have real distribution or design-partner access to the people who would use it.',
  'You can fund the first bounded build.',
  'There is one specific product wedge, not a general idea or a request to "see what AI can do."',
  'Background IP and data rights are clean — no encumbrances, no disputes.',
] as const

export const CO_BUILD_DISQUALIFIERS = [
  'No named workflow, no user, and no sponsor — just an idea.',
  'Unpaid speculative work, or a success-fee-only arrangement.',
  'No access to the users, data, or people who make the decision.',
  'A request for free product development with no cash, distribution, or clean IP behind it.',
] as const
