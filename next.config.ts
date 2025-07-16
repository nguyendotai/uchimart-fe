/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Cho phép dùng `npm run build` tạo thư mục `out`
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // 🔴 Thêm dòng này để tránh lỗi khi export tĩnh
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
