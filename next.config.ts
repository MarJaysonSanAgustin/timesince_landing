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
};

export default nextConfig;
