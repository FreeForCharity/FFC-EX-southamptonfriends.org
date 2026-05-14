import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { faustina, lato, cantataOne } from '@/lib/fonts'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL('https://southamptonfriends.org'),
  title: {
    default: 'Southampton Friends Meeting',
    template: '%s | Southampton Friends Meeting',
  },
  description:
    'Southampton Monthly Meeting of the Religious Society of Friends — a small Quaker meeting in Southampton, Pennsylvania. Worship is held in person and online at 10:00 AM every Sunday.',
  keywords: [
    'Southampton Friends',
    'Southampton Quakers',
    'Religious Society of Friends',
    'Quaker meeting',
    'Bucks County Quakers',
    'Philadelphia Yearly Meeting',
    'unprogrammed worship',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://southamptonfriends.org/',
    siteName: 'Southampton Friends Meeting',
    title: 'Southampton Friends Meeting',
    description:
      'A small Quaker meeting in Southampton, Pennsylvania. Worship at 10:00 AM every Sunday, in person and online.',
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: '32x32' },
      { url: `${basePath}/icon.png`, type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: `${basePath}/apple-icon.png`, sizes: '180x180', type: 'image/png' }],
  },
  manifest: `${basePath}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={[
          'antialiased',
          'bg-paper',
          'text-ink',
          faustina.variable,
          lato.variable,
          cantataOne.variable,
        ].join(' ')}
        suppressHydrationWarning={true}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-ink focus:px-3 focus:py-2 focus:rounded focus:shadow"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
