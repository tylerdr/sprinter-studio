import { buttonVariants } from '@/components/ui/button'
import { Reveal } from '@/app/components/Reveal'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OPERATING_CONSTRAINT_STATEMENT } from '@/app/data/positioning'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-texture.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,136,0.05)_0%,_transparent_70%)]" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <Reveal immediate duration={0.6} y={30}>
          <p className="text-sm md:text-base font-mono text-accent-green mb-4 tracking-wider uppercase">
            Sprinter&apos;s public R&amp;D log
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            What we are testing, shipping,{' '}
            <span className="text-accent-green">and stopping.</span>
          </h1>
        </Reveal>

        <Reveal
          as="p"
          immediate
          duration={0.6}
          delay={0.2}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
        >
          A truth-labeled record of hypotheses, prototypes, live properties, reusable patterns, and
          stop decisions. A deployed site is evidence of execution — not proof of demand, revenue, or
          a standalone company.
        </Reveal>

        <Reveal
          as="p"
          immediate
          duration={0.6}
          delay={0.3}
          className="text-sm text-text-muted/80 max-w-xl mx-auto"
        >
          {OPERATING_CONSTRAINT_STATEMENT}
        </Reveal>

        <Reveal
          immediate
          duration={0.6}
          delay={0.4}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/ventures"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'bg-accent-green text-background hover:bg-accent-green/90 font-semibold inline-flex items-center gap-2',
            )}
          >
            Inspect the experiment ledger
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <a
            href="https://sprinter.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'border-border-subtle hover:bg-surface inline-flex items-center gap-2',
            )}
          >
            Work with Sprinter
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal
          immediate
          duration={0.6}
          delay={0.6}
          y={0}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-4 font-mono text-xs uppercase tracking-widest text-text-muted"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-orange" aria-hidden="true" />
            Hypothesis before build
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-blue" aria-hidden="true" />
            Evidence before advancement
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-1 bg-accent-green" aria-hidden="true" />
            Stop decisions published
          </span>
        </Reveal>
      </div>
    </section>
  )
}
