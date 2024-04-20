/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
    distDir: 'build',
    output: 'export'
};

export default nextConfig;
