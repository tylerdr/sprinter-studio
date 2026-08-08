import { listedVentures, ventures, stateConfig, relationshipConfig } from '@/app/data/ventures'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ventures',
  description:
    'The full portfolio review state — relationship, public state, evidence, and last-verified date for every item under review.',
  alternates: { canonical: '/ventures' },
}

export default function VenturesPage() {
  const delistedCount = ventures.length - listedVentures.length

  return (
    <main id="main-content" className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Ventures</h1>
          <p className="text-text-muted max-w-2xl">
            Every item here carries a relationship (owned, operated, client work, or experiment), a public
            state, evidence, and a last-verified date. Nothing is listed until that record is backed by
            something checkable.
          </p>
        </div>

        {listedVentures.length === 0 ? (
          <Card className="bg-surface border-border-subtle">
            <CardContent className="pt-6 space-y-2">
              <p className="text-foreground font-medium">No portfolio items are listed publicly right now.</p>
              <p className="text-sm text-text-muted">
                {delistedCount} record{delistedCount === 1 ? ' is' : 's are'} in internal review, pending a
                live-URL check and current evidence. Delisting is never deletion — records are re-listed once
                verified.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {listedVentures.map((venture) => {
              const state = stateConfig[venture.publicState]
              return (
                <Link key={venture.slug} href={`/ventures/${venture.slug}`}>
                  <Card className="bg-surface border-border-subtle h-full hover:border-accent-green/40 transition-colors">
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-lg font-semibold">{venture.name}</h2>
                        <Badge variant="outline" className="border-border-subtle text-text-muted shrink-0">
                          {relationshipConfig[venture.relationship].label}
                        </Badge>
                      </div>
                      <Badge variant="outline" style={{ color: state.hex, borderColor: `${state.hex}40` }} className="w-fit">
                        {state.label}
                      </Badge>
                      <p className="text-sm text-text-muted leading-relaxed">{venture.description}</p>
                      <p className="text-xs text-text-muted">Last verified {venture.lastVerified}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
