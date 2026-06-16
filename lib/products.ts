import type { ShopifyCollection, ShopifyProduct } from './shopify';

export interface Category {
  id: string;
  label: string;
  count: number;
  blurb: string;
  featuredImage?: string;
}

// Curated set: defines which collections are surfaced, their order, and the
// editorial blurbs (which don't live in Shopify). Labels and counts here are
// only fallbacks — toCategories() refreshes them from the live storefront.
export const MULAN_CATEGORIES: Category[] = [
  { id: 'deportivo', label: 'Deportivo',      count: 4, blurb: 'Para el cuerpo en movimiento.' },
  { id: 'playa',     label: 'Playa',           count: 3, blurb: 'Para los días junto al agua.' },
  { id: 'vestidos-sets', label: 'Vestidos & Sets', count: 3, blurb: 'Para las noches que se cuentan.' },
];

// Overlays the live Shopify product count onto the curated set, keyed by
// collection handle. Label and blurb stay curated (editorial, Spanish — the
// Shopify title may differ, e.g. "Active Wear" for the `deportivo` handle). A
// curated category with no matching collection falls back to its static values.
export function toCategories(collections: ShopifyCollection[], products: ShopifyProduct[] = []): Category[] {
  const byHandle = new Map(collections.map(c => [c.handle, c]));
  return MULAN_CATEGORIES.map(cat => {
    const live = byHandle.get(cat.id);
    const representative = products.find(p =>
      p.collections.edges.some(e => e.node.handle === cat.id)
    );
    const featuredImage = representative?.images.edges[0]?.node.url;
    return {
      ...cat,
      ...(live ? { count: live.productCount } : {}),
      ...(featuredImage ? { featuredImage } : {}),
    };
  });
}

export function formatMXN(n: string | number): string {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  return '$' + num.toLocaleString('es-MX') + ' MXN';
}
