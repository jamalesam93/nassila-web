import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { MarkdownContent } from '@/components/docs/markdown-content'
import type { Locale } from '@/i18n/routing'
import { getAllDocs, getDocPage } from '@/lib/docs'

type Props = {
  params: Promise<{ locale: Locale; slug?: string[] }>
}

export default async function DocsPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const docSlug = slug?.[0] ?? 'how-to'
  const page = getDocPage(locale, docSlug)
  if (!page) notFound()

  const docs = getAllDocs(locale)

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[220px_1fr]">
      <DocsSidebar docs={docs} activeSlug={docSlug} />
      <div>
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">{page.title}</h1>
        <MarkdownContent content={page.content} />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'ar']
  const slugs = ['how-to', 'user-guide', 'manuscript']
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug: [slug] })))
}
