import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-bd030be048334ccb85b400876a5cab94.r2.dev',
        pathname: '/test-storage/**'
      },
      {
        protocol: 'https',
        hostname: 'pub-026ef14ddd9f4accbb73db5607cd7043.r2.dev',
        pathname: '/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      }
    ],
  },
}

export default withNextIntl(withPayload(nextConfig, {devBundleServerPackages: false}))
