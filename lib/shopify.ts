import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2025-04',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
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
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
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
