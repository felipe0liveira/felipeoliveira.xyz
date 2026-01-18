import type { Metadata, Viewport } from 'next'
import './globals.css'
import PageViewTracker from '@/components/PageViewTracker'

export const viewport: Viewport = {
  themeColor: '#f57f24',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://felipeoliveira.xyz'),
  title: 'PASeguros - Protegendo o que importa para você',
  description:
    'PASeguros é uma empresa Joseense, que atua no mercado desde 2010. Trabalhamos com todos os ramos de seguros, seja para você ou para sua empresa. Hoje temos uma carteira sólida e estabelecida, devido a excelência no atendimento, feito de forma personalizada, oferecendo soluções para todas as necessidades dos nossos clientes.',
  keywords: [
    'seguros',
    'seguro auto',
    'seguro residencial',
    'seguro empresarial',
    'seguro de vida',
    'PASeguros',
    'Patricia Araujo Seguros',
    'corretora de seguros',
    'seguros São José dos Campos',
    'proteção familiar',
    'seguro personalizado',
  ],
  authors: [{ name: 'PASeguros' }],
  creator: 'PASeguros',
  publisher: 'PASeguros',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://felipeoliveira.xyz',
    siteName: 'PASeguros - Patricia Araujo Seguros',
    title: 'PASeguros - Protegendo o que importa para você',
    description:
      'Desde 2010 oferecendo soluções personalizadas em seguros. Proteja você, sua família e seu patrimônio com atendimento de excelência.',
    images: [
      {
        url: '/images/insurance/insurance-life-2.jpg',
        width: 1200,
        height: 630,
        alt: 'PASeguros - Seguro de Vida',
      },
      {
        url: '/images/insurance/insurance-auto-3.jpg',
        width: 1200,
        height: 630,
        alt: 'PASeguros - Seguro Auto',
      },
      {
        url: '/images/insurance/insurance-home-3.jpg',
        width: 1200,
        height: 630,
        alt: 'PASeguros - Seguro Residencial',
      },
      {
        url: '/images/insurance/insurance-business.jpg',
        width: 1200,
        height: 630,
        alt: 'PASeguros - Seguro Empresarial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PASeguros - Protegendo o que importa para você',
    description:
      'Desde 2010 oferecendo soluções personalizadas em seguros. Proteja você, sua família e seu patrimônio.',
    images: ['/images/insurance/insurance-life-2.jpg'],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className='bg-gray-50 text-gray-800 antialiased'>
        {children}
        <PageViewTracker />
      </body>
    </html>
  )
}
