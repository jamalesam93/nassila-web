'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(next: Locale) {
    if (next === locale) return
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="inline-flex rounded-md border border-border text-sm" role="group" aria-label="Language">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`px-2.5 py-1.5 transition-colors first:rounded-s-md last:rounded-e-md ${
            locale === loc
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
          aria-pressed={locale === loc}
        >
          {loc === 'en' ? 'EN' : 'عربي'}
        </button>
      ))}
    </div>
  )
}
