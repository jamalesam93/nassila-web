import fs from 'node:fs'
import path from 'node:path'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { MarkdownContent } from '@/components/docs/markdown-content'
import type { Locale } from '@/i18n/routing'

type Props = { params: Promise<{ locale: Locale }> }

function getChangelog(locale: Locale): string {
  const localized = path.join(process.cwd(), 'content', 'changelog', `${locale}.md`)
  const fallback = path.join(process.cwd(), 'content', 'changelog', 'en.md')
  const file = fs.existsSync(localized) ? localized : fallback
  if (!fs.existsSync(file)) return '# Changelog\n\nSee GitHub releases.'
  return fs.readFileSync(file, 'utf8').replace(/^---[\s\S]*?---\n/, '')
}

export default async function ChangelogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'changelog' })
  const content = getChangelog(locale)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">{t('title')}</h1>
      <p className="mb-8 text-muted-foreground">{t('subtitle')}</p>
      <MarkdownContent content={content} />
    </div>
  )
}
