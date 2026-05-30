import { MULAN_PRODUCTS, MULAN_CATEGORIES, formatMXN } from './products';

describe('formatMXN', () => {
  it('formats whole numbers correctly', () => {
    expect(formatMXN(1290)).toBe('$1,290 MXN');
  });

  it('formats four-digit prices', () => {
    expect(formatMXN(4290)).toBe('$4,290 MXN');
  });

  it('formats three-digit prices', () => {
    expect(formatMXN(720)).toBe('$720 MXN');
  });
});

describe('MULAN_PRODUCTS', () => {
  it('has 10 products', () => {
    expect(MULAN_PRODUCTS).toHaveLength(10);
  });

  it('each product has required fields', () => {
    for (const p of MULAN_PRODUCTS) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(['deportivo', 'playa', 'vestidos']).toContain(p.category);
      expect(p.price).toBeGreaterThan(0);
      expect(p.sizes.length).toBeGreaterThan(0);
    }
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
    expect(catIds).toContain('vestidos');
  });
});
