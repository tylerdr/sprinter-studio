'use client'

import { family, outbound, related, trackOutbound, trackRoute } from '@/lib/links'
import Link from 'next/link'
import { ArrowDown, Github, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'bg-background border-b border-border-subtle'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-chalk-green focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to main content
      </a>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <span>
            sprinter<span className="text-chalk-green">.</span>studio
          </span>
          <span className="hidden lg:inline font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted font-normal">
            the venture studio of Sprinter
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          <Link
            href="/#pipeline"
            className="text-text-muted hover:text-foreground transition-colors"
          >
            Experiment ledger
          </Link>
          <Link
            href="/playbook"
            className="text-text-muted hover:text-foreground transition-colors"
          >
            Playbook
          </Link>
          <a
            href={outbound.github}
            target="_blank"
            {...trackOutbound('header-nav')}
            rel="noopener noreferrer"
            className="text-text-muted hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#working-with-sprinter"
            {...trackRoute('header-cta')}
            className="hidden sm:inline-flex min-h-11 items-center gap-1.5 rounded-sm bg-chalk-green px-4 text-sm font-semibold text-background hover:bg-chalk-green/85 transition-colors"
          >
            Work with Sprinter
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </Link>
          <button
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center text-text-muted hover:text-foreground"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="studio-mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="studio-mobile-nav"
          className="drawer-in lg:hidden fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-background border-t border-border-subtle px-6 py-2"
        >
          <Link
            href="/#pipeline"
            className="flex min-h-[48px] items-center text-sm text-text-muted hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Experiment ledger
          </Link>
          <Link
            href="/playbook"
            className="flex min-h-[48px] items-center text-sm text-text-muted hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Playbook
          </Link>
          <a
            href={outbound.github}
            target="_blank"
            {...trackOutbound('mobile-menu')}
            rel="noopener noreferrer"
            className="flex min-h-[48px] items-center text-sm text-text-muted hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            GitHub
          </a>
          <div className="mt-5 border-t border-border-subtle pt-5">
            <Link
              href="/#working-with-sprinter"
              {...trackRoute('mobile-menu-cta')}
              className="flex min-h-12 items-center justify-center gap-2 rounded-sm bg-chalk-green px-5 text-sm font-semibold text-background"
              onClick={() => setMenuOpen(false)}
            >
              Work with Sprinter
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
            The Sprinter family
          </p>
          <ul className="mt-3 space-y-4 pb-4">
            {family.map((member) => (
              <li key={member.host}>
                <a
                  href={member.href}
                  {...(member.href === '/'
                    ? {}
                    : {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        ...trackOutbound('mobile-menu-family'),
                      })}
                  className="block text-sm text-text-muted hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-foreground">{member.name}</span>
                  <span className="mt-0.5 block">{member.line}</span>
                  <span className="mt-0.5 block font-mono text-xs text-chalk-3">
                    {member.host}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-3 border-t border-border-subtle pt-4 pb-8">
            {related.map((item) => (
              <li key={item.host}>
                <a
                  href={item.href}
                  target="_blank"
                  {...trackOutbound('mobile-menu-related')}
                  rel="noopener noreferrer"
                  className="block text-xs text-chalk-3 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label} <span className="font-mono">· {item.host}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
