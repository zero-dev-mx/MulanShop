import { MULAN_CATEGORIES, formatMXN } from './products';

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
    expect(catIds).toContain('vestidos');
  });
});
