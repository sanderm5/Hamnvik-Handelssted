import type { NextConfig } from 'next';

const pages = [
  'historie',
  'servering',
  'kulturformidling',
  'restaurering',
  'arkiv',
  'kontakt',
  'program',
  'referanser',
  'personvern',
  'vilkar',
];

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/', destination: '/nb' },
      ...pages.map(page => ({
        source: `/${page}`,
        destination: `/nb/${page}`,
      })),
    ];
  },
};

export default nextConfig;
