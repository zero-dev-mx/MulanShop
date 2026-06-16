import type { NextConfig } from "next";

const mockShopify = process.env.MOCK_SHOPIFY === '1';

const nextConfig: NextConfig = {
  // Allow E2E to build/start into an isolated output dir so it never collides
  // with a `next dev` server sharing the default .next directory.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    // When mocking, skip optimization so the server never fetches fixture
    // image URLs (which don't resolve).
    unoptimized: mockShopify,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
    ],
  },
};

export default nextConfig;
