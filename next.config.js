/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    isrMemoryCacheSize: 0,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
