/**
 * Canonical Sprinter Studio positioning. Keep the homepage, footer, metadata,
 * FAQ, and llms surface aligned to this language.
 */

export const POSITIONING_STATEMENT =
  'Sprinter Studio is Sprinter’s public R&D log: a record of hypotheses, prototypes, live properties, reusable patterns, and stop decisions. A deployed site is evidence of execution, not proof of demand, revenue, or a standalone company.'

export const OPERATING_CONSTRAINT_STATEMENT =
  'Client delivery and validated products come first. Experiments earn continued attention only through useful evidence, reusable capability, qualified demand, strategic leverage, or revenue.'

export const NOT_A_FUND_STATEMENT =
  'Sprinter Studio is not a fund, a list of companies, or a claim that software runs itself. Sprinter does not raise capital here, promise portfolio returns, or manage other people’s money.'

export const CO_BUILD_CTA_LABEL = 'Pressure-test a product wedge at sprinter.ai'

export const CO_BUILD_CRITERIA = [
  'You are a domain insider who owns the workflow and can describe the current pain precisely.',
  'You have real distribution, customer access, or committed design partners.',
  'You can fund the first bounded decision and build stages.',
  'There is one specific product wedge, not a broad request to “see what AI can do.”',
  'Background IP, data, and commercial rights are clean and can be documented.',
] as const

export const CO_BUILD_DISQUALIFIERS = [
  'No named workflow, user, sponsor, or distribution path.',
  'Unpaid speculative product development or success-fee-only work.',
  'No access to representative users, data, documents, or decision makers.',
  'A request to count a deployed site as a validated company before demand evidence exists.',
] as const
