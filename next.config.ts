/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Xóa `output: 'export'`
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    // domains: ['lh3.googleusercontent.com'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

module.exports = nextConfig;
