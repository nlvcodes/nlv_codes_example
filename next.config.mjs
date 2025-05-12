import { withPayload } from '@payloadcms/next/withPayload'

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

export default withPayload(nextConfig, {devBundleServerPackages: false})
