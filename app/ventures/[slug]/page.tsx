import { listedVentures, stateConfig, relationshipConfig } from '@/app/data/ventures'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const instant = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const venture = listedVentures.find((v) => v.slug === slug)
  if (!venture) return { title: 'Venture Not Found', robots: { index: false, follow: false } }
  return {
    title: venture.name,
    description: venture.description,
    alternates: { canonical: `/ventures/${venture.slug}` },
    openGraph: {
      title: `${venture.name} | Sprinter Studio`,
      description: venture.description,
      url: `https://sprinter.studio/ventures/${venture.slug}`,
      type: 'website',
    },
  }
}

export default async function VenturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const venture = listedVentures.find((v) => v.slug === slug)

  if (!venture) {
    notFound()
  }

  const state = stateConfig[venture.publicState]
  const ventureIndex = listedVentures.findIndex((v) => v.slug === slug)
  const prev = ventureIndex > 0 ? listedVentures[ventureIndex - 1] : null
  const next = ventureIndex < listedVentures.length - 1 ? listedVentures[ventureIndex + 1] : null

  return (
    <main id="main-content" className="min-h-screen pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/ventures"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-8 text-text-muted hover:text-foreground inline-flex items-center gap-2')}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Ventures
        </Link>

        <Card className="bg-surface border-border-subtle">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge style={{ backgroundColor: `${state.hex}20`, color: state.hex, borderColor: `${state.hex}40` }} variant="outline">
                {state.label}
              </Badge>
              <Badge variant="outline" className="border-border-subtle text-text-muted">
                {relationshipConfig[venture.relationship].label}
              </Badge>
              <Badge variant="outline" className="border-border-subtle text-text-muted">
                {venture.archetype}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-none tracking-tight">{venture.name}</h1>
            <p className="text-text-muted">{venture.domain}</p>
          </CardHeader>
          {venture.screenshot && (
            <div className="px-4">
              <div className="relative w-full aspect-[16/10] rounded-lg border border-border-subtle overflow-hidden">
                <div
                  className="absolute inset-x-0 top-0 h-1 z-10"
                  style={{ backgroundColor: state.hex }}
                />
                <Image
                  src={venture.screenshot}
                  alt={`${venture.name} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">About this venture</h2>
              <p className="text-text-muted leading-relaxed">{venture.description}</p>
            </div>

            {(venture.icp || venture.monetization) && (
              <>
                <Separator className="bg-border-subtle" />
                <dl className="space-y-5">
                  {venture.icp && (
                    <div>
                      <dt className="text-sm font-medium text-foreground mb-1">Who it&apos;s for</dt>
                      <dd className="text-text-muted leading-relaxed">{venture.icp}</dd>
                    </div>
                  )}
                  {venture.monetization && (
                    <div>
                      <dt className="text-sm font-medium text-foreground mb-1">How it makes money</dt>
                      <dd className="text-text-muted leading-relaxed">{venture.monetization}</dd>
                    </div>
                  )}
                </dl>
              </>
            )}

            <Separator className="bg-border-subtle" />

            <div>
              <h2 className="text-sm font-medium text-foreground mb-2">Evidence</h2>
              {venture.evidence.length === 0 ? (
                <p className="text-sm text-text-muted">No public evidence attached yet.</p>
              ) : (
                <ul className="space-y-1.5">
                  {venture.evidence.map((e, i) => (
                    <li key={i} className="text-sm text-text-muted">
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-accent-green hover:text-accent-green/80 inline-flex items-center gap-1">
                        {e.label ?? e.kind} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>{' '}
                      — {e.kind}, {e.capturedAt}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-text-muted mt-2">Last verified {venture.lastVerified}</p>
            </div>

            {venture.publicState === 'live' && venture.url && (
              <a
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), 'bg-accent-green text-background hover:bg-accent-green/90 inline-flex items-center gap-2')}
              >
                Visit Live Site <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-8">
          {prev ? (
            <Link
              href={`/ventures/${prev.slug}`}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-text-muted hover:text-foreground inline-flex items-center gap-2')}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              {prev.name}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/ventures/${next.slug}`}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'text-text-muted hover:text-foreground inline-flex items-center gap-2')}
            >
              {next.name}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  )
}
