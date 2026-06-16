// Deterministic Shopify fixtures + a fetch shim used only for tests.
// Wired into shopifyClient via customFetchApi when MOCK_SHOPIFY === '1',
// so server-component data fetching is intercepted without live creds.
import type { CustomFetchApi } from '@shopify/graphql-client';
import type { ShopifyProduct, ShopifyCart } from './shopify';

type Cat = 'deportivo' | 'playa' | 'vestidos';

function product(
  handle: string,
  title: string,
  productType: string,
  amount: string,
  collection: Cat,
  sizes: string[] = ['CH', 'M', 'G'],
): ShopifyProduct {
  return {
    id: `gid://shopify/Product/${handle}`,
    handle,
    title,
    description: `${title} — pieza de muestra para pruebas.`,
    productType,
    priceRange: { minVariantPrice: { amount, currencyCode: 'MXN' } },
    options: [{ name: 'Talla', values: sizes }],
    images: {
      edges: [{ node: { url: `https://mock.test/${handle}.jpg`, altText: title } }],
    },
    variants: {
      edges: sizes.map(size => ({
        node: {
          id: `gid://shopify/ProductVariant/${handle}-${size}`,
          title: size,
          availableForSale: true,
          selectedOptions: [{ name: 'Talla', value: size }],
          price: { amount, currencyCode: 'MXN' },
        },
      })),
    },
    collections: {
      edges: [{ node: { handle: collection, title: collection } }],
    },
  };
}

export const MOCK_PRODUCTS: ShopifyProduct[] = [
  product('vestido-noche', 'Vestido Noche', 'Vestido', '4290.00', 'vestidos'),
  product('top-marea', 'Top Marea', 'Top', '720.00', 'deportivo'),
  product('short-arena', 'Short Arena', 'Short', '1290.00', 'playa'),
  product('legging-bruma', 'Legging Bruma', 'Legging', '1490.00', 'deportivo'),
  product('salida-sol', 'Salida Sol', 'Salida de baño', '1890.00', 'playa'),
];

const edges = (list: ShopifyProduct[]) => ({ edges: list.map(node => ({ node })) });

function findVariant(variantId: string) {
  for (const p of MOCK_PRODUCTS) {
    const v = p.variants.edges.find(e => e.node.id === variantId);
    if (v) return { p, v: v.node };
  }
  return null;
}

function buildCart(
  lines: { variantId: string; quantity: number }[],
): ShopifyCart {
  const lineEdges = lines.flatMap(({ variantId, quantity }, i) => {
    const match = findVariant(variantId);
    if (!match) return [];
    const { p, v } = match;
    return [{
      node: {
        id: `gid://shopify/CartLine/${i}`,
        quantity,
        merchandise: {
          id: v.id,
          title: v.title,
          product: { title: p.title, handle: p.handle },
          price: v.price,
          image: p.images.edges[0]?.node ?? null,
        },
      },
    }];
  });

  const total = lineEdges.reduce((sum, e) => {
    const m = e.node.merchandise;
    return sum + parseFloat(m.price.amount) * e.node.quantity;
  }, 0);

  return {
    id: 'gid://shopify/Cart/mock',
    checkoutUrl: 'https://mock.test/checkout',
    lines: { edges: lineEdges },
    cost: { totalAmount: { amount: total.toFixed(2), currencyCode: 'MXN' } },
  };
}

function resolve(query: string, vars: Record<string, unknown>): unknown {
  if (query.includes('CartCreate')) {
    return {
      cartCreate: {
        cart: buildCart([{ variantId: String(vars.variantId), quantity: Number(vars.quantity) || 1 }]),
        userErrors: [],
      },
    };
  }
  if (query.includes('CartLinesAdd')) {
    return {
      cartLinesAdd: {
        cart: buildCart([{ variantId: String(vars.variantId), quantity: Number(vars.quantity) || 1 }]),
        userErrors: [],
      },
    };
  }
  if (query.includes('CartLinesRemove')) {
    return { cartLinesRemove: { cart: buildCart([]), userErrors: [] } };
  }
  if (query.includes('ProductByHandle')) {
    const found = MOCK_PRODUCTS.find(p => p.handle === vars.handle) ?? null;
    return { productByHandle: found };
  }
  if (query.includes('CollectionProducts')) {
    const list = MOCK_PRODUCTS.filter(p =>
      p.collections.edges.some(e => e.node.handle === vars.handle),
    );
    return { collectionByHandle: list.length ? { products: edges(list) } : null };
  }
  if (query.includes('SearchProducts')) {
    const q = String(vars.query ?? '').toLowerCase();
    const list = MOCK_PRODUCTS.filter(p =>
      `${p.title} ${p.productType} ${p.handle}`.toLowerCase().includes(q),
    );
    return { products: edges(list) };
  }
  // AllProducts (and any other product list query)
  return { products: edges(MOCK_PRODUCTS) };
}

export const mockShopifyFetch: CustomFetchApi = async (_url, init) => {
  let body: { query?: string; variables?: Record<string, unknown> } = {};
  try {
    body = JSON.parse((init?.body as string) ?? '{}');
  } catch {
    // ignore
  }
  const data = resolve(body.query ?? '', body.variables ?? {});
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
