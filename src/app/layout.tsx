import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/providers/Providers'
import { APP } from '@/constants/config'
import '@/styles/globals.css'
import '@/styles/components.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase:  new URL(APP.url),
  title:         { default: APP.name, template: `%s — ${APP.name}` },
  description:   APP.description,
  keywords:      ['internship', 'tech', 'Cameroon', 'Bamenda', 'software engineering', 'Tera-Tech'],
  authors:       [{ name: APP.name, url: APP.url }],
  creator:       APP.name,
  openGraph: {
    type:      'website',
    locale:    'en_CM',
    url:       APP.url,
    siteName:  APP.name,
    title:     APP.name,
    description: APP.description,
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@teratechcm',
    creator:     '@teratechcm',
  },
  robots: {
    index:         true,
    follow:        true,
    googleBot:   { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor:   '#0072CE',
  colorScheme:  'dark',
  width:        'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
