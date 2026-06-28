import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { LiveReleaseBadge } from '@/components/home/live-release-badge'
import { CURRENT_RELEASE } from '@/lib/release-train'
import { fetchLatestRelease, GITHUB_REPO, RELEASES_LATEST } from '@/lib/github-release'
import type { Locale } from '@/i18n/routing'

type Props = { params: Promise<{ locale: Locale }> }

export default async function DownloadPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'download' })
  const release = await fetchLatestRelease()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nassila',
    operatingSystem: 'Windows 10+',
    applicationCategory: 'DesktopApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    downloadUrl: release?.downloadUrl ?? RELEASES_LATEST,
    softwareVersion: release?.tagName ?? '1.1.2',
    license: 'https://opensource.org/licenses/MIT',
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
      <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>

      <section className="mt-10 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">{t('latest')}</h2>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <LiveReleaseBadge unavailableLabel="—" />
          <span className="text-sm text-muted-foreground">
            {t('releaseCodename')}:{' '}
            <span className="font-medium text-foreground">
              {locale === 'ar' ? CURRENT_RELEASE.codenameAr : CURRENT_RELEASE.codenameEn}
            </span>
          </span>
          <a
            href={release?.downloadUrl ?? RELEASES_LATEST}
            className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('title')}
          </a>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">{t('requirements')}</h2>
        <ul className="mt-3 list-disc space-y-2 ps-5 text-muted-foreground">
          <li>{t('reqOs')}</li>
          <li>{t('reqRam')}</li>
          <li>{t('reqDisk')}</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">{t('install')}</h2>
        <p className="mt-3 text-muted-foreground">{t('installSteps')}</p>
      </section>

      <section className="mt-10 text-sm text-muted-foreground">
        <p>
          {t('source')}:{' '}
          <a
            href={`https://github.com/${GITHUB_REPO}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/{GITHUB_REPO}
          </a>{' '}
          · {t('mit')}
        </p>
      </section>
    </div>
  )
}
