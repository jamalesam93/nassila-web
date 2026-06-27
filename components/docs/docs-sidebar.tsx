'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import type { DocMeta } from '@/lib/docs'

export function DocsSidebar({ docs, activeSlug }: { docs: DocMeta[]; activeSlug: string }) {
  const t = useTranslations('docs')

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <p className="mb-3 text-sm font-semibold">{t('title')}</p>
      <nav className="flex flex-col gap-1 text-sm">
        {docs.map((doc) => (
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
      </nav>
    </aside>
  )
}
