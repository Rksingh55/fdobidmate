/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['d3nn873nee648n.cloudfront.net'],
      },
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
