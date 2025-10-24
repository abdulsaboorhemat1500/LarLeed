/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Keep this for static export
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;