import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vieux-carre-ups-prod.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  },
  basePath   : '/support',
  assetPrefix: '/support'
}

export default nextConfig
