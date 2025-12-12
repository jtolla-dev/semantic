import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb', // Increased to handle larger PDF files
    },
  },
}

export default nextConfig
