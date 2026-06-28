'use client'

import { useState } from 'react'

export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  const text = String(children).trim()

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="group relative my-4">
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm leading-relaxed text-foreground">
        <code>{text}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        className="absolute end-2 top-2 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy code"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
