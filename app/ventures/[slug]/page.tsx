import { ventures, stageConfig } from '@/app/data/ventures'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const venture = ventures.find((item) => item.slug === slug)
  if (!venture) return { title: 'Experiment Not Found' }

  return {
    title: `${venture.name} experiment`,
    description: venture.description,
    alternates: { canonical: `/ventures/${venture.slug}` },
    openGraph: {
      title: `${venture.name} experiment | Sprinter Studio`,
      description: venture.description,
      url: `https://sprinter.studio/ventures/${venture.slug}`,
      type: 'website',
    },
  }
}

export default async function VenturePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const venture = ventures.find((item) => item.slug === slug)

  if (!venture) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Experiment not found</h1>
          <Link
            href="/#pipeline"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Back to experiment ledger
          </Link>
        </div>
      </main>
    )
  }

  const config = stageConfig[venture.stage]
  const ventureIndex = ventures.findIndex((item) => item.slug === slug)
  const previous = ventureIndex > 0 ? ventures[ventureIndex - 1] : null
  const next =
    ventureIndex < ventures.length - 1 ? ventures[ventureIndex + 1] : null

  return (
    <main id="main" className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#pipeline"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'mb-8 text-text-muted hover:text-foreground inline-flex items-center gap-2',
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to experiment ledger
        </Link>

        <div className="mb-5 border border-border-subtle bg-surface px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent-green">
            Experiment record
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Stage and status describe the current evidence, not the maturity or
            value of a company. A public URL may be a prototype, tool, content
            property, validation surface, or active product. This record should
            change when the evidence does.
          </p>
        </div>

        <Card className="bg-surface border-border-subtle">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                style={{
                  backgroundColor: `${config.hex}20`,
                  color: config.hex,
                  borderColor: `${config.hex}40`,
                }}
                variant="outline"
              >
                {config.label}
              </Badge>
              <Badge
                variant="outline"
                className="border-border-subtle text-text-muted"
              >
                {venture.archetype}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-none tracking-tight">
              {venture.name}
            </h1>
            <p className="text-text-muted">{venture.domain}</p>
          </CardHeader>

          {venture.screenshot && (
            <div className="px-4">
              <div className="relative w-full aspect-[16/10] rounded-lg border border-border-subtle overflow-hidden">
                <div
                  className="absolute inset-x-0 top-0 h-1 z-10"
                  style={{ backgroundColor: config.hex }}
                />
                <Image
                  src={venture.screenshot}
                  alt={`${venture.name} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-xs font-mono text-text-muted">
                {venture.domain}
              </p>
            </div>
          )}

          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-text-muted mb-1">
                Current status
              </p>
              <p style={{ color: config.hex }}>{venture.status}</p>
            </div>

            <Separator className="bg-border-subtle" />

            <div>
              <h2 className="text-lg font-semibold mb-3">
                About this experiment
              </h2>
              <p className="text-text-muted leading-relaxed">
                {venture.description}
              </p>
            </div>

            {(venture.icp || venture.monetization || venture.signal) && (
              <>
                <Separator className="bg-border-subtle" />
                <dl className="space-y-5">
                  {venture.icp && (
                    <div>
                      <dt className="text-sm font-medium text-foreground mb-1">
                        Intended audience
                      </dt>
                      <dd className="text-text-muted leading-relaxed">
                        {venture.icp}
                      </dd>
                    </div>
                  )}
                  {venture.monetization && (
                    <div>
                      <dt className="text-sm font-medium text-foreground mb-1">
                        Monetization hypothesis
                      </dt>
                      <dd className="text-text-muted leading-relaxed">
                        {venture.monetization}
                      </dd>
                    </div>
                  )}
                  {venture.signal && (
                    <div>
                      <dt className="text-sm font-medium text-foreground mb-1">
                        Current hypothesis or signal
                      </dt>
                      <dd className="text-text-muted leading-relaxed">
                        {venture.signal}
                      </dd>
                    </div>
                  )}
                </dl>
              </>
            )}

            {venture.url && (
              <a
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants(),
                  'bg-accent-green text-background hover:bg-accent-green/90 inline-flex items-center gap-2',
                )}
              >
                Open public property <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-8 gap-4">
          {previous ? (
            <Link
              href={`/ventures/${previous.slug}`}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'text-text-muted hover:text-foreground inline-flex items-center gap-2',
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              {previous.name}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/ventures/${next.slug}`}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'text-text-muted hover:text-foreground inline-flex items-center gap-2',
              )}
            >
              {next.name}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  )
}
