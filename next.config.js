/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line to disable static export
  // output: 'export',
  
  trailingSlash: true,
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig