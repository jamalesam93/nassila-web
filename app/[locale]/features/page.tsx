import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { FeatureStrip } from '@/components/home/feature-strip'
import type { Locale } from '@/i18n/routing'

type Props = { params: Promise<{ locale: Locale }> }

export default async function FeaturesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'features' })

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
      </div>
      <FeatureStrip />
    </div>
  )
}
