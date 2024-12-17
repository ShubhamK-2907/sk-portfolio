/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: ['./app'],
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
