import { isValidElement, type ReactNode } from 'react'

export function childrenToText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(childrenToText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return childrenToText(node.props.children)
  }
  return ''
}
