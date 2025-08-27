import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '98.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'Felipe Oliveira - Software Engineer',
  description: 'Personal website and portfolio of Felipe Oliveira, Software Engineer',
  keywords: ['Felipe Oliveira', 'Software Engineer', 'Portfolio', 'Web Development'],
  authors: [{ name: 'Felipe Oliveira' }],
  creator: 'Felipe Oliveira',
  publisher: 'Felipe Oliveira',
  openGraph: {
    title: 'Felipe Oliveira - Software Engineer',
    description: 'Personal website and portfolio of Felipe Oliveira, Software Engineer',
    url: 'https://felipeoliveira.xyz',
    siteName: 'Felipe Oliveira',
    images: [
      {
        url: '/me.png',
        width: 800,
        height: 600,
        alt: 'Felipe Oliveira',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Oliveira - Software Engineer',
    description: 'Personal website and portfolio of Felipe Oliveira, Software Engineer',
    images: ['/me.png'],
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
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
