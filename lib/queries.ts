import { shopifyClient, type ShopifyProduct, type ShopifyCart, type ShopifyCollection } from './shopify';

// ── Metafields ───────────────────────────────────────────────────────────────
// Accordion sections sourced per-product from Shopify. These must match the
// metafield definitions created in Shopify Admin (Settings → Custom data →
// Products), namespace `custom`, type "multi-line text". Keep this list and the
// accordion in ProductTemplate in sync.
export const PRODUCT_METAFIELD_NAMESPACE = 'custom';
export const PRODUCT_METAFIELD_KEYS = ['longDescription', 'composicion', 'envio', 'origen'] as const;

const metafieldIdentifiers = PRODUCT_METAFIELD_KEYS.map(
  key => `{ namespace: "${PRODUCT_METAFIELD_NAMESPACE}", key: "${key}" }`,
).join(', ');

// ── Fragments ──────────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  id
  handle
  title
  description
  descriptionHtml
  metafields(identifiers: [${metafieldIdentifiers}]) {
    key
    value
  }
  productType
  priceRange {
    minVariantPrice { amount currencyCode }
  }
  options {
    name
    values
  }
  images(first: 5) {
    edges { node { url altText } }
  }
  variants(first: 20) {
    edges {
      node {
        id
        title
        availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
      }
    }
  }
  collections(first: 5) {
    edges { node { handle title } }
  }
`;

// ── Product queries ────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const { data, errors } = await shopifyClient.request(`
    query AllProducts {
      products(first: 50) {
        edges { node { ${PRODUCT_FRAGMENT} } }
      }
    }
  `);
  if (errors) throw new Error(JSON.stringify(errors));
  return data.products.edges.map((e: { node: ShopifyProduct }) => e.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const { data, errors } = await shopifyClient.request(`
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) { ${PRODUCT_FRAGMENT} }
    }
  `, { variables: { handle } });
  if (errors) throw new Error(JSON.stringify(errors));
  return data.productByHandle ?? null;
}

export async function getProductsByCollection(collectionHandle: string): Promise<ShopifyProduct[]> {
  const { data, errors } = await shopifyClient.request(`
    query CollectionProducts($handle: String!) {
      collection(handle: $handle) {
        products(first: 50) {
          edges { node { ${PRODUCT_FRAGMENT} } }
        }
      }
    }
  `, { variables: { handle: collectionHandle } });
  if (errors) throw new Error(JSON.stringify(errors));
  return data.collection?.products.edges.map(
    (e: { node: ShopifyProduct }) => e.node
  ) ?? [];
}

export async function searchProducts(query: string): Promise<ShopifyProduct[]> {
  const { data, errors } = await shopifyClient.request(`
    query SearchProducts($query: String!) {
      products(first: 50, query: $query) {
        edges { node { ${PRODUCT_FRAGMENT} } }
      }
    }
  `, { variables: { query } });
  if (errors) throw new Error(JSON.stringify(errors));
  return data.products.edges.map((e: { node: ShopifyProduct }) => e.node);
}

// ── Collection queries ───────────────────────────────────────────────────────

// The Storefront API has no productsCount on Collection, so we read product ids
// and count them. `first: 250` is the per-connection max and is ample for this
// catalog; revisit with pagination if a collection ever exceeds it.
export async function getCollections(): Promise<ShopifyCollection[]> {
  const { data, errors } = await shopifyClient.request(`
    query Collections {
      collections(first: 50) {
        edges {
          node {
            handle
            title
            description
            products(first: 250) { edges { node { id } } }
          }
        }
      }
    }
  `);
  if (errors) throw new Error(JSON.stringify(errors));
  return data.collections.edges.map(
    (e: {
      node: {
        handle: string;
        title: string;
        description: string;
        products: { edges: unknown[] };
      };
    }) => ({
      handle: e.node.handle,
      title: e.node.title,
      description: e.node.description,
      productCount: e.node.products.edges.length,
    }),
  );
}

// ── Cart mutations ─────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  id
  checkoutUrl
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText }
            product { title handle }
          }
        }
      }
    }
  }
  cost {
    totalAmount { amount currencyCode }
  }
`;

export async function cartCreate(variantId: string, quantity = 1): Promise<ShopifyCart> {
  const { data, errors } = await shopifyClient.request(`
    mutation CartCreate($variantId: ID!, $quantity: Int!) {
      cartCreate(input: {
        lines: [{ merchandiseId: $variantId, quantity: $quantity }]
      }) {
        cart { ${CART_FRAGMENT} }
        userErrors { field message }
      }
    }
  `, { variables: { variantId, quantity } });
  if (errors) throw new Error(JSON.stringify(errors));
  if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors[0].message);
  return data.cartCreate.cart;
}

export async function cartLinesAdd(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  const { data, errors } = await shopifyClient.request(`
    mutation CartLinesAdd($cartId: ID!, $variantId: ID!, $quantity: Int!) {
      cartLinesAdd(cartId: $cartId, lines: [{ merchandiseId: $variantId, quantity: $quantity }]) {
        cart { ${CART_FRAGMENT} }
        userErrors { field message }
      }
    }
  `, { variables: { cartId, variantId, quantity } });
  if (errors) throw new Error(JSON.stringify(errors));
  return data.cartLinesAdd.cart;
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const { data, errors } = await shopifyClient.request(`
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FRAGMENT} }
        userErrors { field message }
      }
    }
  `, { variables: { cartId, lineIds } });
  if (errors) throw new Error(JSON.stringify(errors));
  return data.cartLinesRemove.cart;
}
