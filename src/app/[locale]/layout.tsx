import type { Metadata } from 'next'
import { Playfair_Display, IBM_Plex_Mono, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '../globals.css'

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://festivals-morocco.vercel.app'),
  title: {
    default: 'Festivals Morocco - Art & Cultural Events Search',
    template: '%s | Festivals Morocco',
  },
  description:
    'Discover art exhibitions, cultural festivals, music events, and heritage celebrations across Morocco. Search by region, date, and category.',
  keywords: [
    'Morocco festivals',
    'Moroccan culture',
    'art events Morocco',
    'music festivals Morocco',
    'cultural events Marrakech',
    'Fes festival',
    'Gnaoua festival',
    'Mawazine',
    'Moroccan heritage',
    'African festivals',
  ],
  authors: [{ name: 'Slow Morocco' }],
  creator: 'Slow Morocco',
  publisher: 'Slow Morocco',
  openGraph: {
    title: 'Festivals Morocco - Discover Cultural Events',
    description:
      'Your guide to art, music, and cultural festivals across Morocco',
    url: 'https://festivals-morocco.vercel.app',
    siteName: 'Festivals Morocco',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'es_ES', 'ar_MA'],
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Festivals Morocco',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Festivals Morocco',
    description: 'Discover cultural events across Morocco',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://festivals-morocco.vercel.app',
    languages: {
      en: '/en',
      fr: '/fr',
      es: '/es',
      ar: '/ar',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification-code',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const isRTL = locale === 'ar'

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <head>
        <meta name="theme-color" content="#faf9f7" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
