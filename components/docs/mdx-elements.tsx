import type { MDXComponents } from 'mdx/types'
import { Callout } from './callout'
import { childrenToText } from './children-to-text'
import { CodeBlock } from './code-block'
import { Step, Steps } from './steps'
import { Tab, Tabs } from './tabs'

export const mdxComponents: MDXComponents = {
  Callout,
  CodeBlock,
  Steps,
  Step,
  Tabs,
  Tab,
  h1: (props) => (
    <h1 className="mb-4 mt-8 text-3xl font-semibold tracking-tight first:mt-0 scroll-mt-24" {...props} />
  ),
  h2: (props) => (
    <h2
      className="mb-3 mt-10 scroll-mt-24 border-b border-border pb-2 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mb-2 mt-8 scroll-mt-24 text-lg font-semibold" {...props} />
  ),
  h4: (props) => (
    <h4 className="mb-2 mt-6 scroll-mt-24 text-base font-semibold" {...props} />
  ),
  p: (props) => <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />,
  ul: (props) => (
    <ul className="mb-4 ms-5 list-disc space-y-1 text-muted-foreground" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 ms-5 list-decimal space-y-1 text-muted-foreground" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a className="font-medium text-primary underline-offset-2 hover:underline" {...props} />
  ),
  code: ({ children, className, ...props }) => {
    const text = childrenToText(children)
    if (className?.includes('language-') || text.includes('\n')) {
      return <CodeBlock>{children}</CodeBlock>
    }
    return (
      <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm text-foreground" {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => <>{children}</>,
  table: (props) => (
    <div className="mb-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-muted/80" {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="border-b border-border last:border-b-0" {...props} />,
  th: (props) => (
    <th className="border border-border px-3 py-2 text-start font-medium text-foreground" {...props} />
  ),
  td: (props) => (
    <td className="border border-border px-3 py-2 text-muted-foreground align-top" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="mb-4 border-s-2 border-primary ps-4 text-muted-foreground" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
}
