import type { MetadataRoute } from 'next'
import { ALL_DOC_SLUGS } from '@/lib/docs'
import { routing } from '@/i18n/routing'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nassila-web.vercel.app'

const staticPaths = ['', '/features', '/download', '/docs', '/changelog', '/privacy', '/about']
const docPaths = ALL_DOC_SLUGS.map((slug) => `/docs/${slug}`)

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...docPaths]
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
