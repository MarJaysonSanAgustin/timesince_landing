import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone',
  // `output: 'standalone'` does not trace runtime fs reads at non-import paths.
  // The content loader reads content/, and ImageResponse reads the OG fonts, so both
  // must be traced in explicitly or they 500 in production only.
  outputFileTracingIncludes: {
    '/**': ['./assets/fonts/**', './content/**'],
  },
  async redirects() {
    // /blog folded into /guides. Permanent, because the three posts were
    // already indexed and all of them were guide-shaped to begin with.
    return [
      { source: '/blog', destination: '/guides', permanent: true },
      { source: '/blog/:slug', destination: '/guides/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
