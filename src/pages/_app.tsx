import '@/styles/globals.css'
import '98.css'
import type { AppProps } from 'next/app'
import { Container, Layout } from '@components/Layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { injectGoogleAnalytics, trackPageView } from '@/utils'

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useEffect(() => {
		// Initialize Google Analytics
		injectGoogleAnalytics()
	}, [])

	useEffect(() => {
		// Track page views on route change
		const handleRouteChange = (url: string) => {
			trackPageView(url)
		}

		router.events.on('routeChangeComplete', handleRouteChange)
		
		// Track initial page load
		trackPageView(router.asPath)

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events, router.asPath])

	return (
		<Layout>
			<Container>
				<Component {...pageProps} />
			</Container>
		</Layout>
	)
}
