'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import type { DocSectionKey } from '@/lib/docs'

type Section = {
  sectionKey: DocSectionKey
  pages: { slug: string; title: string }[]
}

function sectionTitleKey(sectionKey: DocSectionKey): string {
  return sectionKey.replace('docs.', '')
}

export function DocsSidebar({
  sections,
  activeSlug,
}: {
  sections: Section[]
  activeSlug?: string
}) {
  const t = useTranslations('docs')

  return (
    <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
      <p className="mb-3 text-sm font-semibold">
        <Link
          href="/docs"
          className={!activeSlug ? 'text-primary' : 'text-foreground hover:text-primary'}
        >
          {t('title')}
        </Link>
      </p>
      <nav className="flex flex-col gap-5 text-sm">
        {sections.map(({ sectionKey, pages }) => (
          <div key={sectionKey}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t(sectionTitleKey(sectionKey) as never)}
            </p>
            <div className="flex flex-col gap-0.5">
              {pages.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className={`rounded-md px-2 py-1.5 transition-colors ${
                    activeSlug === doc.slug
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {doc.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
