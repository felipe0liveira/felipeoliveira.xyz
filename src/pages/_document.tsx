/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				{/* Basic Meta Tags */}
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				
				{/* SEO Meta Tags */}
				<meta name="description" content="Felipe Oliveira - Full Stack Developer specializing in Next.js, TypeScript, React, and modern web technologies. Portfolio showcasing innovative projects and professional experience." />
				<meta name="keywords" content="Felipe Oliveira, Full Stack Developer, Next.js, TypeScript, React, JavaScript, Web Development, Software Engineer, Portfolio, Brazil Developer" />
				<meta name="author" content="Felipe Oliveira" />
				<meta name="robots" content="index, follow" />
				<meta name="googlebot" content="index, follow" />
				
				{/* Open Graph Meta Tags */}
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Felipe Oliveira - Full Stack Developer" />
				<meta property="og:description" content="Experienced Full Stack Developer creating innovative web solutions with modern technologies. Explore my portfolio and professional journey." />
				<meta property="og:image" content="/me.png" />
				<meta property="og:url" content="https://felipe0liveira.dev" />
				<meta property="og:site_name" content="Felipe Oliveira Portfolio" />
				<meta property="og:locale" content="en_US" />
				
				{/* Twitter Card Meta Tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:creator" content="@felipe0liveira" />
				<meta name="twitter:title" content="Felipe Oliveira - Full Stack Developer" />
				<meta name="twitter:description" content="Experienced Full Stack Developer creating innovative web solutions with modern technologies." />
				<meta name="twitter:image" content="/me.png" />
				
				{/* Additional SEO Tags */}
				<meta name="theme-color" content="#c0c0c0" />
				<meta name="msapplication-TileColor" content="#c0c0c0" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="Felipe Oliveira" />
				
				{/* Canonical URL */}
				<link rel="canonical" href="https://felipe0liveira.dev" />
				
				{/* Favicon and Icons */}
				<link rel='shortcut icon' href='/favicon.png' type='image/png' />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
				<link rel="apple-touch-icon" href="/favicon.png" />
				
				{/* PWA Manifest */}
				<link rel="manifest" href="/manifest.json" />
				
				{/* Structured Data - JSON-LD */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Person",
							"name": "Felipe Oliveira",
							"jobTitle": "Full Stack Developer",
							"description": "Experienced Full Stack Developer specializing in modern web technologies",
							"url": "https://felipe0liveira.dev",
							"image": "https://felipe0liveira.dev/me.png",
							"sameAs": [
								"https://github.com/felipe0liveira",
								"https://linkedin.com/in/felipe0liveira"
							],
							"knowsAbout": [
								"JavaScript",
								"TypeScript",
								"React",
								"Next.js",
								"Node.js",
								"Full Stack Development",
								"Web Development"
							],
							"alumniOf": {
								"@type": "Organization",
								"name": "Software Engineering"
							},
							"nationality": {
								"@type": "Country",
								"name": "Brazil"
							}
						})
					}}
				/>
				
				<title>Felipe Oliveira - Software Engineer</title>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
