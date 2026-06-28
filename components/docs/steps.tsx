'use client'

import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'

type StepProps = { title: string; children: ReactNode }

export function Step(_: StepProps) {
  return null
}

Step.displayName = 'Step'

export function Steps({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<StepProps> =>
      isValidElement(child) && (child.type as { displayName?: string }).displayName === 'Step',
  )

  return (
    <ol className="my-6 space-y-4">
      {steps.map((step, i) => (
        <li key={step.props.title} className="flex gap-4">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
            aria-hidden
          >
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-1 font-medium text-foreground">{step.props.title}</p>
            <div className="text-sm leading-relaxed text-muted-foreground [&>p:last-child]:mb-0">
              {step.props.children}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
