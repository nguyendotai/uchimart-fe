/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Xóa `output: 'export'`
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
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
