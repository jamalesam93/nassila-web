'use client'

import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from 'react'

type StepProps = { title: string; children: ReactNode }

function isStepElement(child: ReactNode): child is ReactElement<StepProps> {
  if (!isValidElement(child)) return false
  const props = child.props as StepProps & { variant?: string; label?: string }
  return (
    child.type === Step ||
    (typeof props.title === 'string' && props.label === undefined && props.variant === undefined)
  )
}

function collectSteps(children: ReactNode): ReactElement<StepProps>[] {
  const steps: ReactElement<StepProps>[] = []
  Children.forEach(children, (child) => {
    if (isStepElement(child)) {
      steps.push(child)
    } else if (isValidElement(child) && child.type === Fragment) {
      steps.push(...collectSteps((child.props as { children?: ReactNode }).children))
    }
  })
  return steps
}

/** Leaf marker — parent `Steps` renders content; MDX supplies children as props. */
export function Step(_: StepProps) {
  return null
}

Step.displayName = 'Step'

export function Steps({ children }: { children: ReactNode }) {
  const steps = collectSteps(children)

  if (steps.length === 0) return null

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
            <div className="text-sm leading-relaxed text-muted-foreground [&>p:last-child]:mb-0 [&_ol]:mb-0 [&_ul]:mb-0">
              {step.props.children}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
