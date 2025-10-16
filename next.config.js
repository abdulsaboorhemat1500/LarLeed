// next.config.js
module.exports = {
  // Skip API routes during build
  experimental: {
    esmExternals: true,
  },
  
  // Or use this for newer Next.js versions
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}