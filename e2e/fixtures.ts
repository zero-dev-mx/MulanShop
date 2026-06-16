import { test as base, expect } from '@playwright/test';
import { resolveMockOperation } from '../lib/shopify.mock';

// Server-side product reads are mocked via the app's customFetchApi
// (MOCK_SHOPIFY). Cart mutations run client-side in the browser, so we
// intercept the storefront GraphQL endpoint there and return the same
// fixtures, keeping the whole flow deterministic and offline.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(/\/api\/[^/]+\/graphql\.json/, async route => {
      const body = route.request().postDataJSON() as {
        query?: string;
        variables?: Record<string, unknown>;
      } | null;
      const data = resolveMockOperation(body?.query ?? '', body?.variables ?? {});
      await route.fulfill({ json: { data } });
    });
    await use(page);
  },
});

export { expect };
