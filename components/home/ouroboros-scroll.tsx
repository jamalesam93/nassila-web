'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const STAGE_KEYS = ['upload', 'sources', 'audit', 'explain', 'export'] as const

export function OuroborosScroll() {
  const home = useTranslations('home')
  const t = useTranslations('loop')
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - rect.top) / rect.height))
      const idx = Math.min(STAGE_KEYS.length - 1, Math.floor(progress * STAGE_KEYS.length))
      setActive(idx)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="py-16" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">{home('loopTitle')}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{home('loopSubtitle')}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <ol className="space-y-3">
            {STAGE_KEYS.map((key, i) => (
              <li
                key={key}
                className={`rounded-md border px-4 py-3 transition-colors ${
                  active === i
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card text-muted-foreground'
                }`}
              >
                <p className="font-medium text-foreground">{t(key)}</p>
                <p className="mt-1 text-sm">{t(`${key}Desc`)}</p>
              </li>
            ))}
          </ol>
          <div className="relative hidden min-h-[280px] lg:block">
            <svg viewBox="0 0 400 280" className="h-full w-full text-primary" aria-hidden>
              <path
                d="M 40 140 Q 100 40 200 60 T 360 140 T 200 220 T 40 140"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.25"
              />
              {STAGE_KEYS.map((_, i) => {
                const angle = (i / STAGE_KEYS.length) * Math.PI * 2 - Math.PI / 2
                const cx = 200 + Math.cos(angle) * 120
                const cy = 140 + Math.sin(angle) * 90
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={active === i ? 14 : 8}
                    fill="currentColor"
                    opacity={active === i ? 1 : 0.35}
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
