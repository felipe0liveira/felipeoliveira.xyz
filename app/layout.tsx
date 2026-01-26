import type { Metadata, Viewport } from 'next'
import './globals.css'
import PageViewTracker from '@/components/PageViewTracker'

export const viewport: Viewport = {
  themeColor: '#c3ff00',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://felipeoliveira.xyz'),
  title: 'Felipe Oliveira - AI Engineer & Fullstack Developer',
  description:
    'Software engineer specialized in AI Engineering, building intelligent systems and scalable autonomous agents. Expertise in fullstack development with React, Next.js, Node.js, Python, and cloud technologies. Former engineer at Gympass, Nubank, and PagSeguro PagBank.',
  keywords: [
    'AI Engineer',
    'Fullstack Developer',
    'Software Engineer',
    'Artificial Intelligence',
    'Machine Learning',
    'Autonomous Agents',
    'React Developer',
    'Next.js',
    'Node.js',
    'Python',
    'TypeScript',
    'Cloud Engineering',
    'CI/CD',
    'Felipe Oliveira',
    'Google AI SDK',
    'Model Context Protocol',
    'MCP Server',
    'Frontend Development',
    'Backend Development',
    'São José dos Campos',
    'Brazil',
  ],
  authors: [{ name: 'Felipe Oliveira' }],
  creator: 'Felipe Oliveira',
  publisher: 'Felipe Oliveira',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://felipeoliveira.xyz',
    siteName: 'Felipe Oliveira - AI Engineer & Fullstack Developer',
    title: 'Felipe Oliveira - Building the Future with Intelligent Systems',
    description:
      'AI Engineer and Fullstack Developer specializing in autonomous agents, LLM integration, and production-ready applications. Experience at Gympass, Nubank, and PagSeguro PagBank.',
    images: [
      {
        url: '/images/me.png',
        width: 1200,
        height: 630,
        alt: 'Felipe Oliveira - AI Engineer and Fullstack Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Oliveira - AI Engineer & Fullstack Developer',
    description:
      'Building intelligent systems and scalable autonomous agents. Expertise in AI Engineering, React, Next.js, Node.js, and cloud technologies.',
    images: ['/images/me.png'],
    creator: '@felipe0liveira',
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
  alternates: {
    canonical: 'https://felipeoliveira.xyz',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-black text-white antialiased'>
        {children}
        <PageViewTracker />
      </body>
    </html>
  )
}
