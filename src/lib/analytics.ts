// Google Analytics configuration and utilities
export const GA_TRACKING_ID = 'G-JPZH84LFP7'

// Extend the Window interface to include gtag
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

/**
 * Injects Google Analytics script into the document head
 * This function dynamically loads the gtag script and initializes Google Analytics
 */
export const injectGoogleAnalytics = (): void => {
  // Check if we're in a browser environment and gtag is not already loaded
  if (typeof window === 'undefined') {
    return
  }

  // Check if gtag script is already loaded by looking for the script tag
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"]`)
  if (existingScript) {
    return
  }

  // Initialize dataLayer
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    
    // Define gtag function
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }

    // Set initial timestamp
    window.gtag('js', new Date())
    
    // Configure Google Analytics
    window.gtag('config', GA_TRACKING_ID)

    // Create and inject the script tag
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    
    // Insert script into document head
    document.head.appendChild(script)
  }
}

/**
 * Track page views
 * @param url - The page URL to track
 */
export const trackPageView = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

/**
 * Track custom events
 * @param action - The action being tracked
 * @param category - The category of the event
 * @param label - Optional label for the event
 * @param value - Optional value for the event
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * Check if Google Analytics is loaded and ready
 * @returns boolean indicating if GA is available
 */
export const isAnalyticsReady = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}
