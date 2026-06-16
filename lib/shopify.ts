import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import type { CustomFetchApi } from '@shopify/graphql-client';

// In E2E/test runs the storefront API is mocked at the fetch layer. The mock
// module is imported lazily so its fixtures never ship in a production build.
const customFetchApi: CustomFetchApi | undefined =
  process.env.MOCK_SHOPIFY === '1'
    ? async (url, init) => {
        const { mockShopifyFetch } = await import('./shopify.mock');
        return mockShopifyFetch(url, init);
      }
    : undefined;

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2025-04',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
  customFetchApi,
});

// ── Types ──────────────────────────────────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  options: { name: string; values: string[] }[];
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        selectedOptions: { name: string; value: string }[];
        price: { amount: string; currencyCode: string };
      };
    }[];
  };
  collections: { edges: { node: { handle: string; title: string } }[] };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { title: string; handle: string };
          price: { amount: string; currencyCode: string };
          image: { url: string; altText: string | null } | null;
        };
      };
    }[];
  };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
}
