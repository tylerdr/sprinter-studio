import Link from 'next/link'
import { Zap, Github } from 'lucide-react'
import { NOT_A_FUND_STATEMENT } from '@/app/data/positioning'

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent-green" aria-hidden="true" />
            <span className="font-semibold">sprinter.studio</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
            <Link href="/ventures" className="hover:text-foreground transition-colors">Ventures</Link>
            <Link href="/co-build" className="hover:text-foreground transition-colors">Co-build</Link>
            <Link href="/playbook" className="hover:text-foreground transition-colors">Playbook</Link>
            <a href="https://sprinter.ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Sprinter AI</a>
            <a href="https://sprinterconsulting.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Consulting</a>
            <a href="https://ambleideation.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Amble</a>
            <a href="https://github.com/tylerdr/sprinter-studio" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" aria-hidden="true" /> GitHub
            </a>
          </nav>
        </div>
        <p className="text-xs text-text-muted text-center md:text-left max-w-2xl">{NOT_A_FUND_STATEMENT}</p>
      </div>
    </footer>
  )
}
