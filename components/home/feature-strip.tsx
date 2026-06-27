'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

const FEATURE_KEYS = ['import', 'validate', 'verify', 'integrity', 'manuscript', 'export'] as const

const FEATURE_MEDIA: Record<(typeof FEATURE_KEYS)[number], string | null> = {
  import: '/media/ui-import.png',
  validate: '/media/ui-validate.png',
  verify: '/media/ui-bibliography.png',
  integrity: '/media/ui-integrity.png',
  manuscript: '/media/ui-loop.png',
  export: null,
}

export function FeatureStrip() {
  const t = useTranslations('features')
  const home = useTranslations('home')

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">{home('featuresTitle')}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{home('featuresSubtitle')}</p>
        <div className="mt-10 space-y-16">
          {FEATURE_KEYS.map((key, i) => {
            const media = FEATURE_MEDIA[key]
            const reverse = media !== null && i % 2 === 1
            return (
              <div
                key={key}
                className={
                  media
                    ? `grid items-center gap-8 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`
                    : 'max-w-2xl'
                }
              >
                <div>
                  <h3 className="text-lg font-semibold">{t(`${key}.title`)}</h3>
                  <p className="mt-2 text-muted-foreground">{t(`${key}.body`)}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{t('shownIn')}</p>
                </div>
                {media ? <FeatureShot src={media} alt={t(`${key}.title`)} /> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeatureShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={640}
        height={400}
        className="h-auto w-full object-cover object-top"
      />
    </div>
  )
}
