import { defineConfig, devices } from '@playwright/test';

// Dedicated port so the mocked test server never collides with (or gets
// reused from) a normal `next dev` running on 3000.
const PORT = Number(process.env.E2E_PORT ?? 3100);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Run the app with Shopify mocked at the fetch layer so server components
  // render deterministic fixtures without live storefront credentials.
  webServer: {
    // Production build/start (not `next dev`) so the suite is isolated from any
    // running dev server and matches how the app behaves in production.
    command: `next build && next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    env: {
      MOCK_SHOPIFY: '1',
      NEXT_DIST_DIR: '.next-e2e',
      NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: 'mock.myshopify.com',
      NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN: 'test-token',
    },
  },
});
