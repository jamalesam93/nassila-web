'use client'

import type { ReactNode } from 'react'

const variants = {
  info: 'border-primary/40 bg-primary/5 text-foreground',
  warning: 'border-amber-500/50 bg-amber-500/10 text-foreground',
  danger: 'border-destructive/50 bg-destructive/10 text-foreground',
} as const

export function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: keyof typeof variants
  title?: string
  children: ReactNode
}) {
  return (
    <aside
      className={`my-6 rounded-lg border px-4 py-3 text-sm leading-relaxed ${variants[variant]}`}
      role="note"
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="text-muted-foreground [&>p:last-child]:mb-0">{children}</div>
    </aside>
  )
}
