import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'vieux-carre-ups-prod.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
