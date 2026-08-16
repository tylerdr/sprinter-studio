import { Pipeline } from '@/app/components/Pipeline'
import { Reveal } from '@/app/components/Reveal'
import { listedVentures, ventures } from '@/app/data/ventures'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export function ExperimentLedger() {
  return (
    <section id="ledger" className="py-24 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <Reveal className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent-green">Experiment ledger</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">Public only when the record is supportable.</h2>
          </div>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              The repository contains {ventures.length} historical or current experiment records. Only {listedVentures.length} currently meet the public-listing rule: a labeled relationship, a defensible state, checkable evidence, and a recent verification date.
            </p>
            <p className="flex items-start gap-3 text-sm">
              <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0 text-accent-green" aria-hidden="true" />
              Delisting is not failure. It is the safe default when a URL, screenshot, description, ownership claim, demand signal, or operating state has not been re-verified.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-xl border border-border-subtle bg-surface p-5 md:p-7">
            <Pipeline />
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
            An experiment can advance, revise, pause, or stop. A public URL alone never upgrades its state.
          </p>
          <Link
            href="/ventures"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'border-border-subtle hover:bg-surface inline-flex items-center gap-2',
            )}
          >
            Inspect every listed record
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
