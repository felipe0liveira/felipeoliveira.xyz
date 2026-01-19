import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Compress pages
  compress: true,

  // Production source maps (disable for smaller builds)
  productionBrowserSourceMaps: false,

  // Strict mode
  reactStrictMode: true,

  // Redirects from root domain to subdomain
  async redirects() {
    return [
      {
        // Redirect from www to production subdomain
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.felipeoliveira.xyz',
          },
        ],
        destination: 'https://felipeoliveira.xyz/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
