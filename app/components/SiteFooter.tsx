import Link from 'next/link'
import { Github } from 'lucide-react'

import { family, outbound, related, trackOutbound } from '@/lib/links'

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
        <nav
          aria-label="Footer"
          className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border-subtle pt-6 text-center text-sm text-text-muted md:justify-start md:text-left"
        >
          <Link href="/#pipeline" className="hover:text-foreground transition-colors">
            Experiment ledger
          </Link>
          <Link href="/playbook" className="hover:text-foreground transition-colors">
            Playbook
          </Link>
          <Link
            href="/#working-with-sprinter"
            className="hover:text-foreground transition-colors"
          >
            Work with Sprinter
          </Link>
          <a
            href={outbound.github}
            target="_blank"
            {...trackOutbound('footer')}
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <Github className="w-4 h-4" aria-hidden="true" /> GitHub
          </a>
        </nav>

        <section aria-labelledby="sprinter-family" className="w-full border-t border-border-subtle pt-6">
          <h2
            id="sprinter-family"
            className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted md:text-left"
          >
            The Sprinter family
          </h2>
          <ul className="mt-4 grid w-full gap-x-6 gap-y-5 text-center text-sm sm:grid-cols-2 md:text-left lg:grid-cols-4">
            {family.map((member) => {
              const isHere = member.href === '/'
              const body = (
                <>
                  <span className={isHere ? 'text-chalk-green' : 'text-foreground'}>
                    {member.name}
                  </span>
                  <span className="mt-1 block text-text-muted">{member.line}</span>
                  <span className="mt-1 block font-mono text-xs text-chalk-3 group-hover:text-chalk-green">
                    {member.host}
                  </span>
                </>
              )
              return (
                <li key={member.host}>
                  {isHere ? (
                    <Link href="/" className="group inline-block">
                      {body}
                    </Link>
                  ) : (
                    <a
                      href={member.href}
                      target="_blank"
                      {...trackOutbound('footer-family')}
                      rel="noopener noreferrer"
                      className="group inline-block"
                    >
                      {body}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <ul className="flex w-full flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-chalk-3 md:justify-start">
          {related.map((item) => (
            <li key={item.host}>
              <a
                href={item.href}
                target="_blank"
                {...trackOutbound('footer-related')}
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {item.label} <span className="font-mono">· {item.host}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
