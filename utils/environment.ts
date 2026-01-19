// Environment utilities for conditional features
export const PRODUCTION_DOMAIN = 'felipeoliveira.xyz';
export const SANDBOX_DOMAIN = 'sandbox.felipeoliveira.xyz';

// Check if we're in production environment (server-side)
export function isProduction(): boolean {
  const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || '';
  return url.includes(PRODUCTION_DOMAIN);
}

// Check if we're in production environment (client-side)
export function isProductionClient(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === PRODUCTION_DOMAIN;
}

// Get the current environment name
export function getEnvironment(): 'production' | 'sandbox' | 'development' {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === PRODUCTION_DOMAIN) return 'production';
    if (hostname === SANDBOX_DOMAIN) return 'sandbox';
    return 'development';
  }
  
  const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || '';
  if (url.includes(PRODUCTION_DOMAIN)) return 'production';
  if (url.includes(SANDBOX_DOMAIN)) return 'sandbox';
  return 'development';
}
