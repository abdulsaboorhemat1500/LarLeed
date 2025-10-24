/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for Cloudflare compatibility
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable TypeScript and ESLint during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable experimental features for better compatibility
  experimental: {
    esmExternals: false,
  }
};

module.exports = nextConfig;