import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { DOC_SECTIONS, getDocPage } from '@/lib/docs'
import type { Locale } from '@/i18n/routing'

export async function DocsIndex({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'docs' })

  return (
    <div className="max-w-3xl">
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">{t('title')}</h1>
      <p className="mb-8 leading-relaxed text-muted-foreground">{t('indexIntro')}</p>

      <div className="space-y-10">
        {DOC_SECTIONS.map(({ sectionKey, slugs }) => {
          const pages = slugs
            .map((slug) => getDocPage(locale, slug))
            .filter((p): p is NonNullable<typeof p> => p !== null)
          if (pages.length === 0) return null

          return (
            <section key={sectionKey}>
              <h2 className="mb-4 text-lg font-semibold">
                {t(sectionKey.replace('docs.', '') as never)}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/docs/${page.slug}`}
                      className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/50"
                    >
                      <span className="font-medium text-foreground">{page.title}</span>
                      {page.description ? (
                        <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        {t('changelogLink')}{' '}
        <Link href="/changelog" className="font-medium text-primary underline-offset-2 hover:underline">
          {t('changelogLinkLabel')}
        </Link>
      </p>
    </div>
  )
}
