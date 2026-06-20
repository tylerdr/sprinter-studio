'use client'

import Link from 'next/link'
import { Zap, Github, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-background/80 backdrop-blur-md border-b border-border-subtle shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Zap className="w-5 h-5 text-accent-green" />
          <span>sprinter.studio</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="#pipeline" className="text-text-muted hover:text-foreground transition-colors">
            Pipeline
          </Link>
          <Link href="/playbook" className="text-text-muted hover:text-foreground transition-colors">
            Playbook
          </Link>
          <a
            href="https://github.com/tylerdr/sprinter-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex h-11 w-11 items-center justify-center text-text-muted hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="studio-mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          id="studio-mobile-nav"
          className="md:hidden fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-background border-t border-border-subtle px-6 py-2"
        >
          <Link
            href="#pipeline"
            className="flex min-h-[48px] items-center text-sm text-text-muted hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Pipeline
          </Link>
          <Link
            href="/playbook"
            className="flex min-h-[48px] items-center text-sm text-text-muted hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Playbook
          </Link>
          <a
            href="https://github.com/tylerdr/sprinter-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[48px] items-center text-sm text-text-muted hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            GitHub
          </a>
        </nav>
      )}
    </header>
  )
}
