import { Card, CardContent } from '@/components/ui/card'
import { Check, X, Github } from 'lucide-react'
import { CO_BUILD_CRITERIA, CO_BUILD_DISQUALIFIERS, NOT_A_FUND_STATEMENT } from '@/app/data/positioning'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Co-build',
  description: 'Fit criteria and disqualifiers for a selective Sprinter Studio co-build.',
  alternates: { canonical: '/co-build' },
}

export default function CoBuildPage() {
  return (
    <main id="main-content" className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Propose a product wedge</h1>
          <p className="text-text-muted text-lg">{NOT_A_FUND_STATEMENT}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">This fits if</h2>
          <ul className="space-y-3">
            {CO_BUILD_CRITERIA.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-accent-green" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">This doesn&apos;t fit if</h2>
          <ul className="space-y-3">
            {CO_BUILD_DISQUALIFIERS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                <X className="w-4 h-4 mt-0.5 shrink-0 text-destructive/70" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <Card className="bg-surface border-border-subtle">
          <CardContent className="pt-6 space-y-3">
            <h2 className="text-lg font-semibold">How this works</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              This is a qualification page, not a submission form — there is no public intake open right
              now. If you already have a channel to reach Tyler directly, use it and reference the criteria
              above. If not, the link below is a starting point for a conversation, not a guaranteed
              response.
            </p>
            <a
              href="https://github.com/tylerdr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-green hover:text-accent-green/80 inline-flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" aria-hidden="true" /> github.com/tylerdr
            </a>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
