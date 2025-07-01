import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains       : ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vieux-carre-ups-prod.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
