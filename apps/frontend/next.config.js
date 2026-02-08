/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.mindgraphixsolution.com', 'cloudflare.mindgraphixsolution.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mindgraphixsolution.com',
      },
    ],
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
