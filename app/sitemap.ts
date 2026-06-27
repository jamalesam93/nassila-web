import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nassila-web.vercel.app'

const paths = ['', '/features', '/download', '/docs/how-to', '/docs/user-guide', '/docs/manuscript', '/changelog', '/privacy', '/about']

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  )
}
