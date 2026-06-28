'use client'

import { Children, isValidElement, useState, type ReactElement, type ReactNode } from 'react'

type TabProps = { label: string; children: ReactNode }

export function Tab(_: TabProps) {
  return null
}

Tab.displayName = 'Tab'

export function Tabs({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> =>
      isValidElement(child) && (child.type as { displayName?: string }).displayName === 'Tab',
  )
  const [active, setActive] = useState(0)

  if (tabs.length === 0) return null

  return (
    <div className="my-6">
      <div
        className="flex flex-wrap gap-1 border-b border-border"
        role="tablist"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.props.label}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`rounded-t-md px-3 py-2 text-sm transition-colors ${
              active === i
                ? 'border-b-2 border-primary font-medium text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">
        {tabs[active]?.props.children}
      </div>
    </div>
  )
}
