import { MULAN_CATEGORIES, formatMXN, toCategories } from './products';
import type { ShopifyCollection } from './shopify';

const collection = (
  handle: string,
  title: string,
  productCount: number,
): ShopifyCollection => ({ handle, title, description: '', productCount });

describe('formatMXN', () => {
  it('formats whole numbers', () => {
    expect(formatMXN(1290)).toBe('$1,290 MXN');
  });
  it('formats four-digit prices', () => {
    expect(formatMXN(4290)).toBe('$4,290 MXN');
  });
  it('formats three-digit prices', () => {
    expect(formatMXN(720)).toBe('$720 MXN');
  });
  it('formats Shopify string prices', () => {
    expect(formatMXN('1290.00')).toBe('$1,290 MXN');
  });
});

describe('MULAN_CATEGORIES', () => {
  it('has 3 categories', () => {
    expect(MULAN_CATEGORIES).toHaveLength(3);
  });
  it('category ids match product categories', () => {
    const catIds = MULAN_CATEGORIES.map(c => c.id);
    expect(catIds).toContain('deportivo');
    expect(catIds).toContain('playa');
    expect(catIds).toContain('vestidos-sets');
  });
});

describe('toCategories', () => {
  it('overlays the live count onto the curated set, preserving order, label and blurb', () => {
    const result = toCategories([
      collection('playa', 'Playa MX', 5),
      // Shopify title differs from the curated label on purpose.
      collection('deportivo', 'Active Wear', 9),
      collection('vestidos-sets', 'Vestidos MX', 2),
    ]);

    // Order follows the curated set, not the input order.
    expect(result.map(c => c.id)).toEqual(['deportivo', 'playa', 'vestidos-sets']);

    const deportivo = result.find(c => c.id === 'deportivo')!;
    // Count is live; label and blurb stay curated (Spanish), ignoring the title.
    expect(deportivo.count).toBe(9);
    expect(deportivo.label).toBe('Deportivo');
    expect(deportivo.blurb).toBe('Para el cuerpo en movimiento.');
  });

  it('falls back to static values for a curated category with no live collection', () => {
    const result = toCategories([collection('deportivo', 'Deportivo MX', 9)]);
    const playa = result.find(c => c.id === 'playa')!;
    expect(playa).toEqual(MULAN_CATEGORIES.find(c => c.id === 'playa'));
  });

  it('ignores collections that are not part of the curated set', () => {
    const result = toCategories([collection('frontpage', 'Home page', 99)]);
    expect(result.map(c => c.id)).toEqual(['deportivo', 'playa', 'vestidos-sets']);
    expect(result).toEqual(MULAN_CATEGORIES);
  });
});
