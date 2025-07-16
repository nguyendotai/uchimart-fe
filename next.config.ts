/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Cho phép dùng `npm run build` tạo thư mục `out`
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
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
