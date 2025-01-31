/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  distDir: 'build', 
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
