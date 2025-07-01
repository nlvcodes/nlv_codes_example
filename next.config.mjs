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
    ],
  },
}

export default withNextIntl(withPayload(nextConfig, {devBundleServerPackages: false}))
