import { pipelineVentures, stageConfig } from '@/app/data/ventures'

/**
 * Hand-authored SVG diagram of the Amble → Sprint → Sail methodology.
 * Engineering-drawing language: datum rail, stage nodes, gate checkpoints
 * as diamonds, mono annotations, registration marks. Stage counts are
 * derived from the ventures data — never hardcoded.
 */

type Phase = 'amble' | 'sprint' | 'sail'

const phaseMeta: Record<Phase, { name: string; phase: string; sub: string }> = {
  amble: { name: 'AMBLE', phase: 'PHASE 01', sub: 'IDEATE & VALIDATE' },
  sprint: { name: 'SPRINT', phase: 'PHASE 02', sub: 'BUILD & DEPLOY' },
  sail: { name: 'SAIL', phase: 'PHASE 03', sub: 'GROW & SCALE' },
}

/** Line-art glyph paths in a 24×24 box, stroke inherits from parent. */
function GlyphPaths({ phase }: { phase: Phase }) {
  if (phase === 'amble') {
    // Spiral — divergent exploration
    return (
      <path d="M12 12a1.5 1.5 0 0 0 3 0 3 3 0 0 0-6 0 4.5 4.5 0 0 0 9 0 6 6 0 0 0-12 0 7.5 7.5 0 0 0 15 0" />
    )
  }
  if (phase === 'sprint') {
    // Crosshair target — focused execution
    return (
      <>
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    )
  }
  // Sail — distribution and growth
  return (
    <>
      <path d="M12 3v13" />
      <path d="M12 4c-3 2.5-5.5 6-6.8 10H12Z" />
      <path d="M3.5 17h17l-2.5 3.5H6Z" />
    </>
  )
}

/** Standalone phase glyph, colored by stage. Replaces the old phase emoji. */
export function PhaseGlyph({ phase, className }: { phase: Phase; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ color: stageConfig[phase].hex }}
      aria-hidden="true"
    >
      <GlyphPaths phase={phase} />
    </svg>
  )
}

const NODE_X: Record<Phase, number> = { amble: 160, sprint: 480, sail: 800 }
const GATES = [
  { x: 320, id: 'GATE 01', label: 'BUILD-READY' },
  { x: 640, id: 'GATE 02', label: 'LAUNCH' },
]
const CHEVRON_X = [252, 390, 572, 710]

export function PlaybookDiagram({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const full = variant === 'full'
  const height = full ? 300 : 150
  const railY = full ? 150 : 64
  const nodeR = full ? 46 : 32
  const ringR = full ? 56 : 39
  const glyphScale = full ? 1.75 : 1.25
  const phases: Phase[] = ['amble', 'sprint', 'sail']

  return (
    <div className="overflow-x-auto" role="img" aria-label="The Amble, Sprint, Sail decision framework: a question enters at Amble, passes Gate 1 (build-ready) into Sprint for a bounded test, and passes Gate 2 (launch) into Sail only when the evidence justifies continued investment. A stage is a confidence label, not a trophy; work can also revise, pause, or stop.">
      <svg
        viewBox={`0 0 960 ${height}`}
        fill="none"
        className="w-full min-w-[560px] h-auto"
        aria-hidden="true"
      >
        {/* Datum rail */}
        <text x="40" y={railY - 12} className="font-mono" fontSize="10" letterSpacing="0.2em" fill="#555555">IDEAS</text>
        <text x="916" y={railY - 12} className="font-mono" fontSize="10" letterSpacing="0.2em" fill="#555555" textAnchor="end">REVENUE</text>
        <line x1="40" y1={railY} x2="914" y2={railY} stroke="#222222" strokeWidth="1" />
        <path d={`M914 ${railY - 5}l9 5-9 5Z`} fill="#444444" />
        {CHEVRON_X.map((x) => (
          <path key={x} d={`M${x} ${railY - 4}l5 4-5 4`} stroke="#444444" strokeWidth="1" />
        ))}

        {/* Gate checkpoints */}
        {GATES.map((gate) => (
          <g key={gate.id}>
            <path
              d={`M${gate.x} ${railY - 12}l12 12-12 12-12-12Z`}
              fill="#0a0a0a"
              stroke="#888888"
              strokeWidth="1.5"
            />
            <path d={`M${gate.x - 4} ${railY}l3 3 5.5-6`} stroke="#888888" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <text x={gate.x} y={railY - 26} className="font-mono" fontSize={full ? 10 : 9} letterSpacing="0.2em" fill="#aaaaaa" textAnchor="middle">{gate.id}</text>
            <text x={gate.x} y={railY + 32} className="font-mono" fontSize={full ? 9 : 8} letterSpacing="0.15em" fill="#666666" textAnchor="middle">{gate.label}</text>
          </g>
        ))}

        {/* Stage nodes */}
        {phases.map((phase) => {
          const x = NODE_X[phase]
          const hex = stageConfig[phase].hex
          const count = pipelineVentures.filter((v) => v.stage === phase).length
          const glyphOffset = 12 * glyphScale
          return (
            <g key={phase}>
              {full && (
                <>
                  <line x1={x} y1={railY - nodeR - 10} x2={x} y2={railY - nodeR - 28} stroke="#333333" strokeWidth="1" />
                  <text x={x} y={railY - nodeR - 36} className="font-mono" fontSize="10" letterSpacing="0.15em" fill="#888888" textAnchor="middle">
                    {count} {count === 1 ? 'VENTURE' : 'VENTURES'}
                  </text>
                </>
              )}
              <circle cx={x} cy={railY} r={ringR} stroke={hex} strokeWidth="1" strokeDasharray="2 5" opacity="0.35" />
              <circle cx={x} cy={railY} r={nodeR} fill="#0a0a0a" stroke={hex} strokeWidth="1.5" />
              <g
                transform={`translate(${x - glyphOffset} ${railY - glyphOffset}) scale(${glyphScale})`}
                stroke={hex}
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <GlyphPaths phase={phase} />
              </g>
              {full && (
                <text x={x} y={railY + nodeR + 34} className="font-mono" fontSize="10" letterSpacing="0.25em" fill="#555555" textAnchor="middle">{phaseMeta[phase].phase}</text>
              )}
              <text x={x} y={railY + nodeR + (full ? 58 : 30)} className="font-mono" fontSize={full ? 20 : 14} fontWeight="600" letterSpacing="0.15em" fill={hex} textAnchor="middle">{phaseMeta[phase].name}</text>
              <text x={x} y={railY + nodeR + (full ? 76 : 46)} className="font-mono" fontSize={full ? 10 : 9} letterSpacing="0.15em" fill="#888888" textAnchor="middle">{phaseMeta[phase].sub}</text>
            </g>
          )
        })}

        {/* Registration marks + figure caption (full variant only) */}
        {full && (
          <>
            {[
              [16, 16],
              [16, 284],
              [944, 284],
            ].map(([x, y]) => (
              <path key={`${x}-${y}`} d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} stroke="#222222" strokeWidth="1" />
            ))}
            <text x="944" y="20" className="font-mono" fontSize="9" letterSpacing="0.15em" fill="#444444" textAnchor="end">
              FIG. 01 · VENTURE FLOW · N = {pipelineVentures.length}
            </text>
          </>
        )}
      </svg>
    </div>
  )
}
