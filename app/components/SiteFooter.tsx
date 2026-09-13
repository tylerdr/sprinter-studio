import Link from 'next/link'
import { Github } from 'lucide-react'

import { outbound, siblings, trackOutbound } from '@/lib/links'

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
        <nav className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border-subtle pt-6 text-center text-sm text-text-muted md:justify-start md:text-left">
          <Link href="/#pipeline" className="hover:text-foreground transition-colors">
            Experiment ledger
          </Link>
          <Link href="/playbook" className="hover:text-foreground transition-colors">
            Playbook
          </Link>
          <a
            href={outbound.executiveAccelerator}
            target="_blank"
            {...trackOutbound('footer')}
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Executive AI Accelerator
          </a>
          <a
            href={outbound.portfolioAccelerator}
            target="_blank"
            {...trackOutbound('footer')}
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Portfolio accelerator
          </a>
          <a
            href={outbound.github}
            target="_blank"
            {...trackOutbound('footer')}
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        </nav>
        <ul className="grid w-full gap-x-6 gap-y-4 text-center text-sm sm:grid-cols-2 md:text-left lg:grid-cols-4">
          {siblings.map((sibling) => (
            <li key={sibling.host}>
              <a
                href={sibling.href}
                target="_blank"
                {...trackOutbound('footer-roster')}
                rel="noopener noreferrer"
                className="group inline-block text-text-muted transition-colors hover:text-foreground"
              >
                {sibling.label}
                <span className="mt-0.5 block font-mono text-xs text-chalk-3 group-hover:text-chalk-green">
                  {sibling.host}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
