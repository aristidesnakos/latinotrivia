/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  },
  swcMinify: true,
  images: {
    domains: ['img.youtube.com', 'yvvfgwqhisrmzqbwqgxj.supabase.co', 'cdn.simpleicons.org','cdn.jsdelivr.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
};

module.exports = nextConfig;
