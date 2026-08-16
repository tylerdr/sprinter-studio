'use client'

import { outbound } from '@/lib/links'
import Link from 'next/link'
import { ArrowUpRight, Github, Menu, X, Zap } from 'lucide-react'
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-background/85 backdrop-blur-md border-b border-border-subtle shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-accent-green focus:px-3 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to main content
      </a>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Zap className="w-5 h-5 text-accent-green" />
          <span>sprinter.studio</span>
          <span className="hidden lg:inline font-mono text-[10px] uppercase tracking-widest text-text-muted font-normal">
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
            rel="noopener noreferrer"
            className="text-text-muted hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={outbound.skillsCheck}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex min-h-11 items-center gap-1.5 bg-accent-green px-4 text-sm font-semibold text-background hover:bg-accent-green/90 transition-colors"
          >
            Free AI Skills Check
            <ArrowUpRight className="w-4 h-4" />
          </a>
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
          className="lg:hidden fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-background border-t border-border-subtle px-6 py-2"
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
            rel="noopener noreferrer"
            className="flex min-h-[48px] items-center text-sm text-text-muted hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            GitHub
          </a>
          <div className="mt-5 border-t border-border-subtle pt-5 space-y-3">
            <a
              href={outbound.skillsCheck}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 bg-accent-green px-5 text-sm font-semibold text-background"
              onClick={() => setMenuOpen(false)}
            >
              Free AI Skills Check
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={outbound.workshop}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center border border-border-subtle px-5 text-sm text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              AI Productivity Workshop — $2,500
            </a>
            <a
              href={outbound.portfolioPack}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center border border-border-subtle px-5 text-sm text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              Portfolio AI Training Pack — $10,000
            </a>
            <a
              href={outbound.consulting}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center text-sm text-text-muted"
              onClick={() => setMenuOpen(false)}
            >
              Workflow setup and implementation
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
