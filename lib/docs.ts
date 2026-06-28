import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'
import type { Locale } from '@/i18n/routing'

export type DocSectionKey =
  | 'docs.sectionStartHere'
  | 'docs.sectionGuides'
  | 'docs.sectionManuscript'
  | 'docs.sectionReference'
  | 'docs.sectionModelsRoadmap'

export type DocSection = {
  sectionKey: DocSectionKey
  slugs: string[]
}

export type DocMeta = {
  slug: string
  title: string
  description?: string
  section: DocSectionKey
}

export type DocPage = DocMeta & {
  content: string
  format: 'mdx' | 'md'
}

export type TocHeading = {
  id: string
  text: string
  level: 2 | 3
}

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'docs')

export const DOC_SECTIONS: DocSection[] = [
  { sectionKey: 'docs.sectionStartHere', slugs: ['getting-started'] },
  { sectionKey: 'docs.sectionGuides', slugs: ['how-to', 'user-guide', 'shortcuts'] },
  { sectionKey: 'docs.sectionManuscript', slugs: ['manuscript', 'sanad-setup', 'bibliography-bridge'] },
  { sectionKey: 'docs.sectionReference', slugs: ['verification', 'workers', 'troubleshooting'] },
  { sectionKey: 'docs.sectionModelsRoadmap', slugs: ['local-models', 'roadmap'] },
]

export const ALL_DOC_SLUGS = DOC_SECTIONS.flatMap((s) => s.slugs)

function sectionForSlug(slug: string): DocSectionKey {
  const found = DOC_SECTIONS.find((s) => s.slugs.includes(slug))
  return found?.sectionKey ?? 'docs.sectionGuides'
}

function resolveDocFile(locale: Locale, slug: string): { file: string; format: 'mdx' | 'md' } | null {
  for (const ext of ['mdx', 'md'] as const) {
    const file = path.join(CONTENT_ROOT, locale, `${slug}.${ext}`)
    if (fs.existsSync(file)) return { file, format: ext === 'mdx' ? 'mdx' : 'md' }
  }
  return null
}

export function getDocPage(locale: Locale, slug: string): DocPage | null {
  const resolved = resolveDocFile(locale, slug)
  if (!resolved) return null
  const raw = fs.readFileSync(resolved.file, 'utf8')
  const { data, content } = matter(raw)
  const section = (data.section as DocSectionKey | undefined) ?? sectionForSlug(slug)
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: data.description as string | undefined,
    section,
    content,
    format: resolved.format,
  }
}

export function getDocSections(locale: Locale): { sectionKey: DocSectionKey; pages: DocMeta[] }[] {
  return DOC_SECTIONS.map(({ sectionKey, slugs }) => ({
    sectionKey,
    pages: slugs
      .map((slug) => getDocPage(locale, slug))
      .filter((p): p is DocPage => p !== null)
      .map(({ slug, title, description, section }) => ({ slug, title, description, section })),
  })).filter((s) => s.pages.length > 0)
}

export function getAllDocMeta(locale: Locale): DocMeta[] {
  return getDocSections(locale).flatMap((s) => s.pages)
}

export function extractTocHeadings(content: string): TocHeading[] {
  const slugger = new GithubSlugger()
  const headings: TocHeading[] = []
  const lines = content.split('\n')
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue
    const level = match[1].length as 2 | 3
    const text = match[2].replace(/\*\*/g, '').replace(/`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    headings.push({ id: slugger.slug(text), text, level })
  }
  return headings
}

export function getDocStaticParams(): { locale: Locale; slug?: string[] }[] {
  const locales: Locale[] = ['en', 'ar']
  const indexParams = locales.map((locale) => ({ locale, slug: undefined as string[] | undefined }))
  const pageParams = locales.flatMap((locale) =>
    ALL_DOC_SLUGS.map((slug) => ({ locale, slug: [slug] })),
  )
  return [...indexParams, ...pageParams]
}
