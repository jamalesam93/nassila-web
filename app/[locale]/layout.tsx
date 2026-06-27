import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Source_Serif_4 } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Providers } from '@/components/theme-provider'
import { routing, type Locale } from '@/i18n/routing'
import '../globals.css'

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-plex',
  weight: ['400', '500', '600'],
})

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-ibm-plex-arabic',
  weight: ['400', '500', '600'],
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  weight: ['400', '600'],
})

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nassila-web.vercel.app'
  return {
    metadataBase: new URL(base),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${ibmPlex.variable} ${ibmPlexArabic.variable} ${sourceSerif.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{
          fontFamily:
            locale === 'ar'
              ? 'var(--font-ibm-plex-arabic), var(--font-ibm-plex), sans-serif'
              : 'var(--font-ibm-plex), sans-serif',
        }}
      >
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
