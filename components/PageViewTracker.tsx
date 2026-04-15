'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { GA_TRACKING_ID, trackPageView } from '@/utils/analytics'
import { isProductionClient } from '@/utils/environment'
import { Suspense } from 'react'
import Script from 'next/script'

function PageViewTrackerComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(url)
  }, [pathname, searchParams])

  return null
}

export default function PageViewTracker() {
  const shouldLoadGA = isProductionClient()

  return (
    <>
      {shouldLoadGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy='afterInteractive'
          />
          <Script id='google-analytics' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      <Suspense fallback={null}>
        <PageViewTrackerComponent />
      </Suspense>
    </>
  )
}
