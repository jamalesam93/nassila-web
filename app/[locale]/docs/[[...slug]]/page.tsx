import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { DocContent } from '@/components/docs/doc-content'
import { DocsIndex } from '@/components/docs/docs-index'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsToc } from '@/components/docs/docs-toc'
import type { Locale } from '@/i18n/routing'
import { extractTocHeadings, getDocPage, getDocSections, getDocStaticParams } from '@/lib/docs'

type Props = {
  params: Promise<{ locale: Locale; slug?: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const docSlug = slug?.[0]
  if (!docSlug) {
    return { title: 'Documentation' }
  }
  const page = getDocPage(locale, docSlug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
  }
}

export default async function DocsPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const sections = getDocSections(locale)
  const docSlug = slug?.[0]

  if (!docSlug) {
    return (
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr]">
        <DocsSidebar sections={sections} />
        <DocsIndex locale={locale} />
      </div>
    )
  }

  const page = getDocPage(locale, docSlug)
  if (!page) notFound()

  const tocHeadings = extractTocHeadings(page.content)

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_200px]">
      <DocsSidebar sections={sections} activeSlug={docSlug} />
      <div>
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">{page.title}</h1>
        <DocContent content={page.content} format={page.format} />
      </div>
      <DocsToc headings={tocHeadings} />
    </div>
  )
}

export function generateStaticParams() {
  return getDocStaticParams()
}
