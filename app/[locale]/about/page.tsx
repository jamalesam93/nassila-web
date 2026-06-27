import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'

type Props = { params: Promise<{ locale: Locale }> }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })
  const home = await getTranslations({ locale, namespace: 'home' })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
      <p className="mt-4 text-xl text-primary">{home('heroTagline')}</p>
      <p className="mt-3 text-muted-foreground">{home('heroSubtitle')}</p>
      <div className="mt-10 space-y-6 leading-relaxed text-muted-foreground">
        <p>{t('sanad')}</p>
        <p>{t('notRm')}</p>
        <p>{t('ai')}</p>
      </div>
    </div>
  )
}
