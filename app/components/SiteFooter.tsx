import Link from 'next/link'
import { Github, Zap } from 'lucide-react'

import { outbound } from '@/lib/links'

/**
 * Lives in the root layout, not on the homepage. It used to be a local
 * function inside page.tsx's <main>, which meant /playbook and every
 * /ventures/[slug] page dead-ended at their prev/next row with no brand,
 * no nav, and no route back to the parent Sprinter system.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent-green" />
          <span className="font-semibold">sprinter.studio</span>
          <span className="text-text-muted text-sm ml-2">
            The venture studio of Sprinter
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
          <Link href="#pipeline" className="hover:text-foreground transition-colors">
            Experiment ledger
          </Link>
          <Link href="/playbook" className="hover:text-foreground transition-colors">
            Playbook
          </Link>
          <a
            href={outbound.executiveAccelerator}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Executive AI Accelerator
          </a>
          <a
            href={outbound.portfolioAccelerator}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Portfolio accelerator
          </a>
          <a
            href={outbound.consulting}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Sprinter Consulting — the execution practice of Sprinter
          </a>
          <a
            href={outbound.amble}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Amble — the company brain, built by Sprinter
          </a>
          <a
            href={outbound.tyler}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Founded by Tyler Dreher
          </a>
          <a
            href={outbound.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
