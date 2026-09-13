import Link from 'next/link'
import { Github } from 'lucide-react'

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
      {/* Identity and sibling nav sit on separate rows: sharing one flex row
          squeezed the descriptor into a four-line column beside the nav. */}
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 md:items-start">
        <div className="flex shrink-0 flex-wrap items-baseline justify-center gap-x-3 gap-y-1 md:justify-start">
          <span className="font-semibold">
            sprinter<span className="text-chalk-green">.</span>studio
          </span>
          <span className="text-text-muted text-sm">
            The venture studio of Sprinter
          </span>
        </div>
        <nav className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border-subtle pt-6 text-sm text-text-muted md:justify-start">
          <Link href="/#pipeline" className="hover:text-foreground transition-colors">
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
