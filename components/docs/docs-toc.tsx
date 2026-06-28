'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { TocHeading } from '@/lib/docs'

export function DocsToc({ headings }: { headings: TocHeading[] }) {
  const t = useTranslations('docs')
  const [activeId, setActiveId] = useState(() => {
    if (typeof window === 'undefined') return ''
    const hash = window.location.hash.slice(1)
    return headings.some((h) => h.id === hash) ? hash : ''
  })

  useEffect(() => {
    if (headings.length === 0) return

    const observed = new Map<string, IntersectionObserverEntry>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          observed.set(entry.target.id, entry)
        }
        const visible = [...observed.entries()]
          .filter(([, e]) => e.isIntersecting)
          .sort((a, b) => a[1].boundingClientRect.top - b[1].boundingClientRect.top)

        if (visible.length > 0) {
          const id = visible[0][0]
          const heading = headings.find((h) => h.id === id)
          if (heading?.level === 3) {
            setActiveId(id)
          } else if (heading?.level === 2) {
            setActiveId(id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] },
    )

    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t('onThisPage')}
        </p>
            <nav className="flex flex-col gap-1 border-s-2 border-border ps-3 text-sm">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`border-s-2 py-0.5 transition-colors ${
                h.level === 3 ? 'ms-3 border-transparent' : '-ms-3 border-transparent ps-3'
              } ${
                activeId === h.id
                  ? 'border-primary font-medium text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveId(h.id)}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
