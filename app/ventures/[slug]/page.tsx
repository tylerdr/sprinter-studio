import { ventures, stageConfig } from '@/app/data/ventures'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const venture = ventures.find((v) => v.slug === slug)
  if (!venture) return { title: 'Venture Not Found' }
  return {
    title: `${venture.name} | Sprinter Studio`,
    description: venture.description,
  }
}

export default async function VenturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const venture = ventures.find((v) => v.slug === slug)

  if (!venture) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Venture not found</h1>
          <Link href="/#pipeline" className={cn(buttonVariants({ variant: 'outline' }))}>
            Back to Pipeline
          </Link>
        </div>
      </main>
    )
  }

  const config = stageConfig[venture.stage]
  const ventureIndex = ventures.findIndex((v) => v.slug === slug)
  const prev = ventureIndex > 0 ? ventures[ventureIndex - 1] : null
  const next = ventureIndex < ventures.length - 1 ? ventures[ventureIndex + 1] : null

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#pipeline"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-8 text-text-muted hover:text-foreground inline-flex items-center gap-2')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pipeline
        </Link>

        <Card className="bg-surface border-border-subtle">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge style={{ backgroundColor: `${config.hex}20`, color: config.hex, borderColor: `${config.hex}40` }} variant="outline">
                {config.label}
              </Badge>
              <Badge variant="outline" className="border-border-subtle text-text-muted">
                {venture.archetype}
              </Badge>
            </div>
            <CardTitle className="text-3xl md:text-4xl">{venture.name}</CardTitle>
            <p className="text-text-muted">{venture.domain}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium text-text-muted mb-1">Status</p>
              <p style={{ color: config.hex }}>{venture.status}</p>
            </div>

            <Separator className="bg-border-subtle" />

            <div>
              <h2 className="text-lg font-semibold mb-3">About this venture</h2>
              <p className="text-text-muted leading-relaxed">{venture.description}</p>
            </div>

            {venture.url && (
              <a
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), 'bg-accent-green text-background hover:bg-accent-green/90 inline-flex items-center gap-2')}
              >
                Visit Live Site <ExternalLink className="w-4 h-4" />
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
              <ArrowLeft className="w-4 h-4" />
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
