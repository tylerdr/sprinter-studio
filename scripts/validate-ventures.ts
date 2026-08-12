import { z } from 'zod'
import { ventureSchema } from '../app/data/venture.schema.ts'
import { ventures } from '../app/data/ventures.ts'

const result = z.array(ventureSchema).safeParse(ventures)

if (!result.success) {
  console.error('Venture data failed schema validation:')
  console.error(result.error.format())
  process.exit(1)
}

const STALE_DAYS = 90
const now = Date.now()
let staleCount = 0

for (const venture of result.data) {
  const ageDays = (now - new Date(venture.lastVerified).getTime()) / (1000 * 60 * 60 * 24)
  if (ageDays > STALE_DAYS) {
    staleCount += 1
    console.warn(
      `Warning: ${venture.slug} lastVerified ${venture.lastVerified} is ${Math.round(ageDays)} days old (> ${STALE_DAYS}).`,
    )
  }
}

console.log(
  `Validated ${result.data.length} venture record(s)${staleCount ? ` — ${staleCount} stale warning(s)` : ''}.`,
)
