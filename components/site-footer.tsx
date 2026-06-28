'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { GITHUB_REPO } from '@/lib/github-release'

export function SiteFooter() {
  const t = useTranslations()
  const nav = useTranslations('nav')

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-semibold">Nassila</p>
          <p className="mt-2 text-sm text-muted-foreground">{t('footer.tagline')}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/docs" className="text-muted-foreground hover:text-foreground">
            {nav('docs')}
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
            {nav('privacy')}
          </Link>
          <Link href="/download" className="text-muted-foreground hover:text-foreground">
            {nav('download')}
          </Link>
          <a
            href={`https://github.com/${GITHUB_REPO}`}
            className="text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            {nav('github')}
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>{t('footer.license')}</p>
          <p className="mt-2">{t('footer.training')}</p>
        </div>
      </div>
    </footer>
  )
}
