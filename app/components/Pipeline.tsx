"use client"

import { ventures, stageConfig } from "@/app/data/ventures"
import type { Venture } from "@/app/data/ventures"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"

const stages: Array<Venture["stage"]> = ["amble", "sprint", "sail"]
const stageEmoji: Record<string, string> = { amble: "\ud83c\udf00", sprint: "\ud83c\udfaf", sail: "\u26f5" }

function VentureCard({ venture, index }: { venture: Venture; index: number }) {
  const config = stageConfig[venture.stage]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/ventures/${venture.slug}`}>
        <div
          className="group relative rounded-lg border p-3 transition-all hover:scale-[1.02] cursor-pointer bg-card"
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
              {venture.archetype}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{venture.description}</p>
          <p className="text-[10px] mt-1.5" style={{ color: config.hex }}>
            {venture.status}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export function Pipeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
      {stages.map((stage) => {
        const config = stageConfig[stage]
        const stageVentures = ventures.filter((v) => v.stage === stage)

        return (
          <div key={stage} className="space-y-3">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: `${config.hex}40` }}>
              <span className="text-xl">{stageEmoji[stage]}</span>
              <h3 className="text-lg font-semibold" style={{ color: config.hex }}>
                {config.label}
              </h3>
              <Badge
                variant="outline"
                className="ml-auto text-xs"
                style={{ borderColor: `${config.hex}40`, color: config.hex }}
              >
                {stageVentures.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {stageVentures.map((venture, i) => (
                <VentureCard key={venture.slug} venture={venture} index={i} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
