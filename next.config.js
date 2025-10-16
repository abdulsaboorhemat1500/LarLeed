// next.config.js
module.exports = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true,
  },
  
  // This prevents API routes from being built
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      config.externals.push({
        './pages/api': 'commonjs ./pages/api',
      });
    }
    return config;
  }
}