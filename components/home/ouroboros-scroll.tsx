'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState, useSyncExternalStore } from 'react'

const STAGE_KEYS = ['upload', 'sources', 'audit', 'explain', 'export'] as const
const STAGE_COUNT = STAGE_KEYS.length
const CYCLE_MS = 3200

const CX = 200
const CY = 130
const RX = 132
const RY = 78

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function ellipsePoint(index: number) {
  const angle = (index / STAGE_COUNT) * Math.PI * 2 - Math.PI / 2
  return {
    x: CX + RX * Math.cos(angle),
    y: CY + RY * Math.sin(angle),
  }
}

const ORBIT_PATH = `M ${CX},${CY - RY} A ${RX},${RY} 0 1,1 ${CX - 0.01},${CY - RY} Z`

export function OuroborosScroll() {
  const home = useTranslations('home')
  const t = useTranslations('loop')
  const [active, setActive] = useState(0)
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STAGE_COUNT)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <section className="py-16" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">{home('loopTitle')}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{home('loopSubtitle')}</p>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_minmax(260px,360px)]">
          <ol className="space-y-2">
            {STAGE_KEYS.map((key, i) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-full rounded-md border px-4 py-3 text-start transition-colors duration-300 ${
                    active === i
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <span className="me-2 font-mono text-xs text-primary">{i + 1}</span>
                  <span className="font-medium text-foreground">{t(key)}</span>
                  <p className="mt-1 ps-6 text-sm">{t(`${key}Desc`)}</p>
                </button>
              </li>
            ))}
          </ol>

          <div className="relative mx-auto w-full max-w-[360px]" aria-hidden>
            <svg viewBox="0 0 400 260" className="h-auto w-full">
              <ellipse
                cx={CX}
                cy={CY}
                rx={RX}
                ry={RY}
                fill="none"
                className="stroke-border"
                strokeWidth="1.5"
              />
              <path
                d={ORBIT_PATH}
                fill="none"
                className="stroke-primary/25"
                strokeWidth="2"
                strokeDasharray="5 7"
              />
              {STAGE_KEYS.map((_, i) => {
                const { x, y } = ellipsePoint(i)
                const isActive = active === i
                return (
                  <g key={i} className="transition-all duration-500">
                    <circle
                      cx={x}
                      cy={y}
                      r={isActive ? 14 : 9}
                      className={
                        isActive
                          ? 'fill-primary'
                          : 'fill-background stroke-primary/35'
                      }
                      strokeWidth={isActive ? 0 : 1.5}
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={isActive ? 'fill-primary-foreground' : 'fill-muted-foreground'}
                      style={{ fontSize: isActive ? 12 : 10, fontWeight: 500 }}
                    >
                      {i + 1}
                    </text>
                  </g>
                )
              })}
            </svg>
            <p className="mt-3 text-center text-sm font-medium text-primary">
              {t(STAGE_KEYS[active])}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
