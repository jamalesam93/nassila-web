'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { LocaleSwitcher } from './locale-switcher'
import { ThemeToggle } from './theme-toggle'
import { RELEASES_LATEST } from '@/lib/github-release'

export function SiteHeader() {
  const t = useTranslations('nav')

  const links = [
    { href: '/features' as const, label: t('features') },
    { href: '/docs/how-to' as const, label: t('docs') },
    { href: '/changelog' as const, label: t('changelog') },
    { href: '/about' as const, label: t('about') },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          Nassila
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <a
            href={RELEASES_LATEST}
            className="hidden rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            {t('download')}
          </a>
        </div>
      </div>
    </header>
  )
}
