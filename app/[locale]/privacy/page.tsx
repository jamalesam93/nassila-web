import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'

type Props = { params: Promise<{ locale: Locale }> }

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'privacy' })

  const sections = ['offline', 'network', 'local'] as const

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
      <div className="mt-10 space-y-8">
        {sections.map((key) => (
          <section key={key}>
            <h2 className="text-lg font-semibold">{t(key)}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{t(`${key}Body`)}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
