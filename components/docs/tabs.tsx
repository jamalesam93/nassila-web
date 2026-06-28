'use client'

import { Children, Fragment, isValidElement, useState, type ReactElement, type ReactNode } from 'react'

type TabProps = { label: string; children: ReactNode }

function isTabElement(child: ReactNode): child is ReactElement<TabProps> {
  if (!isValidElement(child)) return false
  const props = child.props as TabProps & { title?: string }
  return child.type === Tab || (typeof props.label === 'string' && props.title === undefined)
}

function collectTabs(children: ReactNode): ReactElement<TabProps>[] {
  const tabs: ReactElement<TabProps>[] = []
  Children.forEach(children, (child) => {
    if (isTabElement(child)) {
      tabs.push(child)
    } else if (isValidElement(child) && child.type === Fragment) {
      tabs.push(...collectTabs((child.props as { children?: ReactNode }).children))
    }
  })
  return tabs
}

/** Leaf marker — parent `Tabs` renders content. */
export function Tab(_: TabProps) {
  return null
}

Tab.displayName = 'Tab'

export function Tabs({ children }: { children: ReactNode }) {
  const tabs = collectTabs(children)
  const [active, setActive] = useState(0)

  if (tabs.length === 0) return null

  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-1 border-b border-border" role="tablist">
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
      <div className="pt-4 text-sm leading-relaxed text-muted-foreground [&>p:last-child]:mb-0" role="tabpanel">
        {tabs[active]?.props.children}
      </div>
    </div>
  )
}
