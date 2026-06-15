import { shopifyClient, type ShopifyProduct, type ShopifyCart } from './shopify';

// ── Fragments ──────────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  id
  handle
  title
  description
  productType
  priceRange {
    minVariantPrice { amount currencyCode }
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
      collectionByHandle(handle: $handle) {
        products(first: 50) {
          edges { node { ${PRODUCT_FRAGMENT} } }
        }
      }
    }
  `, { variables: { handle: collectionHandle } });
  if (errors) throw new Error(JSON.stringify(errors));
  return data.collectionByHandle?.products.edges.map(
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
