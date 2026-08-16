import { Reveal } from '@/app/components/Reveal'
import { CheckCircle2, XCircle } from 'lucide-react'

const IS = [
  'A public experiment ledger with relationship, state, evidence, and last-verified date attached.',
  'A place to publish hypotheses, reusable technical patterns, distribution tests, and stop decisions.',
  'Evidence that Sprinter can shape and ship software — with the commercial value of each item evaluated separately.',
  'A transparency layer for builders, partners, investors, clients, and technically curious prospects.',
]

const IS_NOT = [
  'A claim that every domain is a company, every prototype has demand, or every live URL deserves continued investment.',
  'The main Sprinter commercial website. Portfolio AI buyers belong at sprinter.ai; one-company execution belongs at Sprinter Consulting.',
  'A fund, incubator accepting open submissions, or promise that autonomous agents run businesses without human accountability.',
  'Permission to divert attention from client delivery, Cab-O-Matic, Praxium, or other validated operating priorities.',
]

export function WhatThisIs() {
  return (
    <section className="py-20 px-6 bg-surface/50 border-y border-border-subtle">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-green">The contract</p>
          <h2 className="text-3xl md:text-5xl font-bold">The ledger makes uncertainty visible instead of marketing over it.</h2>
          <p className="text-text-muted leading-relaxed">
            The useful claim is not that Sprinter has many ventures. It is that Sprinter can ask better questions, build bounded tests, expose the evidence, and stop work that has not earned another cycle.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          <Reveal className="bg-background border border-border-subtle rounded-xl p-7 md:p-8">
            <h3 className="font-mono text-sm uppercase tracking-widest text-accent-green">What this is</h3>
            <ul className="mt-6 space-y-4">
              {IS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-accent-green" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="bg-background border border-border-subtle rounded-xl p-7 md:p-8">
            <h3 className="font-mono text-sm uppercase tracking-widest text-text-muted">What this is not</h3>
            <ul className="mt-6 space-y-4">
              {IS_NOT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
                  <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-text-muted" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
