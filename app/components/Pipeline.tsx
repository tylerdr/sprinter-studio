"use client"

import { listedVentures, stateConfig, relationshipConfig } from "@/app/data/ventures"
import type { Venture, PublicState } from "@/app/data/ventures"
import { Reveal } from "@/app/components/Reveal"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const STATES: PublicState[] = ["live", "in-development", "validating", "paused", "archived"]

function VentureCard({ venture, index }: { venture: Venture; index: number }) {
  const config = stateConfig[venture.publicState]

  return (
    <Reveal delay={index * 0.05} duration={0.3}>
      <Link href={`/ventures/${venture.slug}`}>
        <div
          className="group relative rounded-lg border p-3 transition-all hover:scale-[1.02] motion-reduce:hover:scale-100 cursor-pointer bg-card"
          style={{ borderColor: `${config.hex}30` }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {venture.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">{venture.domain}</p>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] shrink-0"
              style={{ color: config.hex, borderColor: `${config.hex}40` }}
            >
              {relationshipConfig[venture.relationship].label}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{venture.description}</p>
          <p className="text-[10px] mt-1.5" style={{ color: config.hex }}>
            {config.label} · Last verified {venture.lastVerified}
          </p>
        </div>
      </Link>
    </Reveal>
  )
}

export function Pipeline() {
  const nonEmptyStates = STATES.filter((state) => listedVentures.some((v) => v.publicState === state))

  if (nonEmptyStates.length === 0) {
    return (
      <p className="text-sm text-text-muted text-center max-w-lg mx-auto">
        No portfolio items are publicly listed right now. Every item goes through relationship, evidence,
        and last-verified review before it appears here.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
      {nonEmptyStates.map((state) => {
        const config = stateConfig[state]
        const stateVentures = listedVentures.filter((v) => v.publicState === state)

        return (
          <div key={state} className="space-y-3">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: `${config.hex}40` }}>
              <h3 className="text-lg font-semibold" style={{ color: config.hex }}>
                {config.label}
              </h3>
              <Badge
                variant="outline"
                className="ml-auto text-xs"
                style={{ borderColor: `${config.hex}40`, color: config.hex }}
              >
                {stateVentures.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {stateVentures.map((venture, i) => (
                <VentureCard key={venture.slug} venture={venture} index={i} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
