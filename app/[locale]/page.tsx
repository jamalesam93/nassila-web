import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AppShowreel } from '@/components/home/app-showreel'
import { FeatureStrip } from '@/components/home/feature-strip'
import { LiveReleaseBadge } from '@/components/home/live-release-badge'
import { OuroborosScroll } from '@/components/home/ouroboros-scroll'
import { TryCitationDemo } from '@/components/home/try-citation-demo'
import { RELEASES_LATEST } from '@/lib/github-release'
import type { Locale } from '@/i18n/routing'

type Props = { params: Promise<{ locale: Locale }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'home' })
  const release = await getTranslations({ locale, namespace: 'release' })

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t('heroTitle')}</h1>
            <p className="mt-4 text-xl text-primary">{t('heroTagline')}</p>
            <p className="mt-3 max-w-lg text-muted-foreground">{t('heroSubtitle')}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={RELEASES_LATEST}
                className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('downloadCta')}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                {t('seeHow')}
              </a>
            </div>
            <div className="mt-6">
              <Suspense fallback={<span className="text-sm text-muted-foreground">{release('loading')}</span>}>
                <LiveReleaseBadge unavailableLabel={release('unavailable')} />
              </Suspense>
            </div>
          </div>
          <AppShowreel />
        </div>
      </section>
      <TryCitationDemo />
      <OuroborosScroll />
      <FeatureStrip />
    </>
  )
}
