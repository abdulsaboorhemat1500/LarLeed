// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove API routes since they're now separate
  async rewrites() {
    return []
  }
}

module.exports = nextConfig