import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Locale } from '@/i18n/routing'

export type DocMeta = {
  slug: string
  title: string
  description?: string
  order: number
}

export type DocPage = DocMeta & {
  content: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'docs')

export const DOC_NAV: { slug: string; order: number }[] = [
  { slug: 'how-to', order: 1 },
  { slug: 'user-guide', order: 2 },
  { slug: 'manuscript', order: 3 },
]

export function getDocSlugs(locale: Locale): string[] {
  const dir = path.join(CONTENT_ROOT, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getDocPage(locale: Locale, slug: string): DocPage | null {
  const file = path.join(CONTENT_ROOT, locale, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  const nav = DOC_NAV.find((d) => d.slug === slug)
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: data.description as string | undefined,
    order: nav?.order ?? 99,
    content,
  }
}

export function getAllDocs(locale: Locale): DocMeta[] {
  const docs: DocMeta[] = []
  for (const item of DOC_NAV) {
    const page = getDocPage(locale, item.slug)
    if (page) {
      docs.push({
        slug: page.slug,
        title: page.title,
        description: page.description,
        order: page.order,
      })
    }
  }
  return docs
}
