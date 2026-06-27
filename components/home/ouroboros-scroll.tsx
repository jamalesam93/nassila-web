'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

const STAGE_KEYS = ['upload', 'sources', 'audit', 'explain', 'export'] as const
const STAGE_COUNT = STAGE_KEYS.length
const ORBIT_PERIOD_MS = 18_000

/** Nassila semantic hues — vibrant but on-brand (teal / audit / warn), not AI purple. */
const STAGE_PALETTE = [
  { fill: 'hsl(192 58% 38%)', ring: 'hsl(192 75% 52%)', label: 'hsl(192 55% 28%)' },
  { fill: 'hsl(199 62% 42%)', ring: 'hsl(199 80% 55%)', label: 'hsl(199 50% 32%)' },
  { fill: 'hsl(168 52% 36%)', ring: 'hsl(168 70% 48%)', label: 'hsl(168 45% 28%)' },
  { fill: 'hsl(38 92% 48%)', ring: 'hsl(38 95% 58%)', label: 'hsl(38 70% 32%)' },
  { fill: 'hsl(210 48% 44%)', ring: 'hsl(210 65% 58%)', label: 'hsl(210 40% 34%)' },
] as const

const CX = 250
const CY = 175
const RX = 210
const RY = 118

const ORBIT_PATH = `M ${CX},${CY - RY} A ${RX},${RY} 0 1,1 ${CX - 0.01},${CY - RY} Z`

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function pointOnEllipse(t: number) {
  const angle = t * Math.PI * 2 - Math.PI / 2
  return {
    x: CX + RX * Math.cos(angle),
    y: CY + RY * Math.sin(angle),
    nx: Math.cos(angle),
    ny: Math.sin(angle),
  }
}

function stageFromProgress(progress: number) {
  if (!Number.isFinite(progress)) return 0
  const normalized = ((progress % 1) + 1) % 1
  const index = Math.floor(normalized * STAGE_COUNT)
  return Math.min(STAGE_COUNT - 1, Math.max(0, index))
}

export function OuroborosScroll() {
  const home = useTranslations('home')
  const loop = useTranslations('loop')
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)

  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef<number>(0)
  const startRef = useRef(0)
  const progressRef = useRef(0)

  const active = stageFromProgress(progress)
  const activeKey = STAGE_KEYS[active]
  const traveler = pointOnEllipse(progress)

  const syncProgress = useCallback((value: number) => {
    progressRef.current = value
    setProgress(value)
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    startRef.current = performance.now() - progressRef.current * ORBIT_PERIOD_MS

    const tick = (now: number) => {
      if (!paused) {
        const elapsed = now - startRef.current
        const next = (elapsed % ORBIT_PERIOD_MS) / ORBIT_PERIOD_MS
        syncProgress(next)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reduceMotion, paused, syncProgress])

  const selectStage = useCallback(
    (index: number) => {
      const next = index / STAGE_COUNT
      progressRef.current = next
      startRef.current = performance.now() - next * ORBIT_PERIOD_MS
      syncProgress(next)
      setPaused(true)
      window.setTimeout(() => setPaused(false), 2800)
    },
    [syncProgress],
  )

  return (
    <section className="py-20" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{home('loopTitle')}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{home('loopSubtitle')}</p>
        </div>

        <div className="ouroboros-stage relative mx-auto mt-12 max-w-4xl">
          <svg
            viewBox="0 0 500 360"
            className="h-auto w-full"
            role="img"
            aria-label={loop(activeKey)}
          >
            <defs>
              <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(192 65% 45%)" />
                <stop offset="35%" stopColor="hsl(168 55% 42%)" />
                <stop offset="65%" stopColor="hsl(38 90% 52%)" />
                <stop offset="100%" stopColor="hsl(199 60% 48%)" />
              </linearGradient>
              <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="traveler-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <ellipse
              cx={CX}
              cy={CY}
              rx={RX + 28}
              ry={RY + 18}
              className="fill-primary/[0.04] dark:fill-primary/[0.08]"
            />

            <ellipse
              cx={CX}
              cy={CY}
              rx={RX}
              ry={RY}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity="0.6"
            />

            <path
              d={ORBIT_PATH}
              fill="none"
              stroke="url(#orbit-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="ouroboros-orbit-track"
              opacity="0.85"
            />

            <path
              d={ORBIT_PATH}
              fill="none"
              stroke="url(#orbit-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              className="ouroboros-orbit-flow"
              opacity="0.35"
            />

            {!reduceMotion && (
              <g filter="url(#traveler-glow)">
                <circle
                  cx={traveler.x}
                  cy={traveler.y}
                  r={7}
                  fill={STAGE_PALETTE[active].ring}
                  className="ouroboros-traveler"
                />
                <circle cx={traveler.x} cy={traveler.y} r={3} fill="white" opacity="0.95" />
              </g>
            )}

            {STAGE_KEYS.map((key, i) => {
              const pt = pointOnEllipse(i / STAGE_COUNT)
              const isActive = active === i
              const palette = STAGE_PALETTE[i]

              return (
                <g
                  key={key}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={loop(key)}
                  aria-current={isActive ? 'step' : undefined}
                  onClick={() => selectStage(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      selectStage(i)
                    }
                  }}
                >
                  {isActive && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={26}
                      fill={palette.ring}
                      opacity="0.22"
                      className="ouroboros-pulse"
                    />
                  )}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 20 : 14}
                    fill={isActive ? palette.fill : 'hsl(var(--card))'}
                    stroke={palette.ring}
                    strokeWidth={isActive ? 3 : 2}
                    filter={isActive ? 'url(#node-glow)' : undefined}
                    className="transition-[r] duration-500 ease-out"
                  />
                  <text
                    x={pt.x}
                    y={pt.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isActive ? 'white' : palette.fill}
                    style={{ fontSize: isActive ? 13 : 11, fontWeight: 600, pointerEvents: 'none' }}
                  >
                    {i + 1}
                  </text>
                </g>
              )
            })}
          </svg>

          <div
            className="mx-auto mt-2 max-w-xl rounded-lg border border-border bg-card px-6 py-5 text-center shadow-sm transition-colors duration-500"
            style={{ borderColor: `color-mix(in srgb, ${STAGE_PALETTE[active].ring} 35%, hsl(var(--border)))` }}
            aria-live="polite"
          >
            <p
              className="text-lg font-semibold transition-colors duration-500"
              style={{ color: STAGE_PALETTE[active].label }}
            >
              {loop(activeKey)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {loop(`${activeKey}Desc`)}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {STAGE_KEYS.map((key, i) => (
              <button
                key={key}
                type="button"
                onClick={() => selectStage(i)}
                className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-300"
                style={
                  active === i
                    ? {
                        backgroundColor: STAGE_PALETTE[i].fill,
                        color: 'white',
                        boxShadow: `0 0 0 2px color-mix(in srgb, ${STAGE_PALETTE[i].ring} 40%, transparent)`,
                      }
                    : {
                        backgroundColor: 'hsl(var(--muted))',
                        color: 'hsl(var(--muted-foreground))',
                      }
                }
                aria-pressed={active === i}
              >
                {i + 1}. {loop(key)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
