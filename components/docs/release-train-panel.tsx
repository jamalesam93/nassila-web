import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import {
  CURRENT_RELEASE,
  RELEASE_TRAIN,
} from '@/lib/release-train'
import type { Locale } from '@/i18n/routing'

export async function ReleaseTrainPanel({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'docs' })
  const isAr = locale === 'ar'
  const currentCodename = isAr ? CURRENT_RELEASE.codenameAr : CURRENT_RELEASE.codenameEn

  return (
    <section className="mb-10 rounded-lg border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">{t('releaseTrainTitle')}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t('releaseTrainIntro')}</p>
      <p className="mt-3 text-sm">
        <span className="font-medium text-foreground">{t('currentRelease')}:</span>{' '}
        <span className="text-muted-foreground">
          Nassila {CURRENT_RELEASE.version} · {currentCodename}
        </span>
      </p>

      <h3 className="mt-5 text-sm font-semibold text-foreground">{t('plannedReleases')}</h3>
      <ul className="mt-2 space-y-2 text-sm">
        {RELEASE_TRAIN.map((entry) => (
          <li key={entry.version} className="flex flex-wrap gap-x-2 gap-y-0.5">
            <span className="font-mono font-medium text-foreground">{entry.version}</span>
            <span className="text-muted-foreground">
              {isAr ? entry.codenameAr : entry.codenameEn} —{' '}
              {isAr ? entry.summaryAr : entry.summaryEn}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        {t('releaseTrainDetail')}{' '}
        <Link href="/docs/roadmap" className="font-medium text-primary underline-offset-2 hover:underline">
          {t('roadmapLink')}
        </Link>
        {' · '}
        <Link href="/changelog" className="font-medium text-primary underline-offset-2 hover:underline">
          {t('changelogLinkLabel')}
        </Link>
      </p>
    </section>
  )
}
