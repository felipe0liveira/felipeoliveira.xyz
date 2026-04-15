import { isProductionClient } from './environment'

interface GAEvent {
  action: string
  category: string
  label?: string
  value?: number
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>,
    ) => void
  }
}

export const GA_TRACKING_ID = 'G-JPZH84LFP7'

// Send custom event to Google Analytics
export function sendGAEvent({ action, category, label, value }: GAEvent) {
  // Only send events in production environment
  if (!isProductionClient()) {
    console.log('[Analytics - Dev]', { action, category, label, value })
    return
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track page views
export function trackPageView(url: string) {
  // Only track page views in production environment
  if (!isProductionClient()) {
    console.log('[Analytics - Dev] Page view:', url)
    return
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Predefined event types for convenience
export const GAEvents = {
  // Product events
  productView: (productName: string) =>
    sendGAEvent({
      action: 'view_product',
      category: 'Product',
      label: productName,
    }),

  productClick: (productName: string) =>
    sendGAEvent({
      action: 'click_product',
      category: 'Product',
      label: productName,
    }),

  productCarouselNavigation: (direction: 'next' | 'prev') =>
    sendGAEvent({
      action: 'carousel_navigation',
      category: 'Product',
      label: direction,
    }),

  // Button clicks
  buttonClick: (buttonName: string, location: string) =>
    sendGAEvent({
      action: 'click_button',
      category: 'Engagement',
      label: `${location} - ${buttonName}`,
    }),

  // Link clicks
  linkClick: (linkName: string, destination: string) =>
    sendGAEvent({
      action: 'click_link',
      category: 'Navigation',
      label: `${linkName} - ${destination}`,
    }),

  // Tooltip views
  tooltipView: (tooltipName: string) =>
    sendGAEvent({
      action: 'view_tooltip',
      category: 'Engagement',
      label: tooltipName,
    }),

  // FAQ interactions
  faqToggle: (question: string, isOpen: boolean) =>
    sendGAEvent({
      action: isOpen ? 'expand_faq' : 'collapse_faq',
      category: 'FAQ',
      label: question,
    }),

  // Testimonial interactions
  testimonialView: (testimonialAuthor: string) =>
    sendGAEvent({
      action: 'view_testimonial',
      category: 'Testimonial',
      label: testimonialAuthor,
    }),

  testimonialCarouselNavigation: (direction: 'next' | 'prev') =>
    sendGAEvent({
      action: 'carousel_navigation',
      category: 'Testimonial',
      label: direction,
    }),

  // Social media clicks
  socialMediaClick: (platform: string) =>
    sendGAEvent({
      action: 'click_social_media',
      category: 'Social',
      label: platform,
    }),

  // External link clicks
  externalLinkClick: (linkName: string, url: string) =>
    sendGAEvent({
      action: 'click_external_link',
      category: 'Outbound',
      label: `${linkName} - ${url}`,
    }),

  // User intent selection
  userIntentSelection: (intent: string) =>
    sendGAEvent({
      action: 'select_user_intent',
      category: 'User Intent',
      label: intent,
    }),
}
