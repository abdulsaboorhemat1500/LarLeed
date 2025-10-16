/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' since we're using Cloudflare Functions
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig