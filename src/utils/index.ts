import { request } from './http'
import { getUserLanguage } from './userLanguage'
import { 
  injectGoogleAnalytics, 
  trackPageView, 
  trackEvent, 
  isAnalyticsReady,
  GA_TRACKING_ID 
} from './analytics'

export { 
  request, 
  getUserLanguage,
  injectGoogleAnalytics,
  trackPageView,
  trackEvent,
  isAnalyticsReady,
  GA_TRACKING_ID
}
