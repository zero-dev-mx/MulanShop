jest.mock('@/lib/shopify', () => ({
  shopifyClient: { request: jest.fn() },
}));

import { shopifyClient } from '@/lib/shopify';
import {
  getAllProducts,
  getProductByHandle,
  getProductsByCollection,
  getCollections,
  searchProducts,
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
} from './queries';

const request = shopifyClient.request as jest.Mock;

const productNode = (handle: string) => ({ node: { handle, title: handle } });

beforeEach(() => {
  request.mockReset();
});

describe('getAllProducts', () => {
  it('maps product edges to nodes', async () => {
    request.mockResolvedValue({
      data: { products: { edges: [productNode('a'), productNode('b')] } },
    });
    const products = await getAllProducts();
    expect(products).toEqual([{ handle: 'a', title: 'a' }, { handle: 'b', title: 'b' }]);
  });

  it('throws when the API returns errors', async () => {
    request.mockResolvedValue({ errors: { message: 'boom' } });
    await expect(getAllProducts()).rejects.toThrow('boom');
  });
});

describe('getProductByHandle', () => {
  it('returns the product when found', async () => {
    request.mockResolvedValue({ data: { productByHandle: { handle: 'x' } } });
    await expect(getProductByHandle('x')).resolves.toEqual({ handle: 'x' });
  });

  it('returns null when the handle does not exist', async () => {
    request.mockResolvedValue({ data: { productByHandle: null } });
    await expect(getProductByHandle('nope')).resolves.toBeNull();
  });

  it('passes the handle as a variable', async () => {
    request.mockResolvedValue({ data: { productByHandle: null } });
    await getProductByHandle('top-marea');
    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('ProductByHandle'),
      { variables: { handle: 'top-marea' } },
    );
  });

  it('requests descriptionHtml and the accordion metafields', async () => {
    request.mockResolvedValue({ data: { productByHandle: null } });
    await getProductByHandle('top-marea');
    const query = request.mock.calls[0][0] as string;
    expect(query).toContain('descriptionHtml');
    expect(query).toContain('metafields(identifiers:');
    for (const key of ['longDescription', 'composicion', 'envio', 'origen']) {
      expect(query).toContain(`key: "${key}"`);
    }
  });
});

describe('getProductsByCollection', () => {
  it('maps the collection products', async () => {
    request.mockResolvedValue({
      data: { collectionByHandle: { products: { edges: [productNode('a')] } } },
    });
    await expect(getProductsByCollection('playa')).resolves.toEqual([{ handle: 'a', title: 'a' }]);
  });

  it('returns an empty array for a missing collection', async () => {
    request.mockResolvedValue({ data: { collectionByHandle: null } });
    await expect(getProductsByCollection('ghost')).resolves.toEqual([]);
  });
});

describe('getCollections', () => {
  it('maps collections and derives productCount from product edges', async () => {
    request.mockResolvedValue({
      data: {
        collections: {
          edges: [
            {
              node: {
                handle: 'deportivo',
                title: 'Deportivo',
                description: 'En movimiento.',
                products: { edges: [{ node: { id: '1' } }, { node: { id: '2' } }] },
              },
            },
            {
              node: {
                handle: 'vestidos-sets',
                title: 'Vestidos & Sets',
                description: '',
                products: { edges: [{ node: { id: '3' } }] },
              },
            },
          ],
        },
      },
    });

    await expect(getCollections()).resolves.toEqual([
      { handle: 'deportivo', title: 'Deportivo', description: 'En movimiento.', productCount: 2 },
      { handle: 'vestidos-sets', title: 'Vestidos & Sets', description: '', productCount: 1 },
    ]);
  });

  it('throws when the API returns errors', async () => {
    request.mockResolvedValue({ errors: { message: 'boom' } });
    await expect(getCollections()).rejects.toThrow('boom');
  });
});

describe('searchProducts', () => {
  it('forwards the query and maps results', async () => {
    request.mockResolvedValue({ data: { products: { edges: [productNode('a')] } } });
    const result = await searchProducts('top');
    expect(result).toEqual([{ handle: 'a', title: 'a' }]);
    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('SearchProducts'),
      { variables: { query: 'top' } },
    );
  });
});

describe('cartCreate', () => {
  it('returns the created cart', async () => {
    request.mockResolvedValue({
      data: { cartCreate: { cart: { id: 'c1' }, userErrors: [] } },
    });
    await expect(cartCreate('v1', 2)).resolves.toEqual({ id: 'c1' });
    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('CartCreate'),
      { variables: { variantId: 'v1', quantity: 2 } },
    );
  });

  it('defaults quantity to 1', async () => {
    request.mockResolvedValue({
      data: { cartCreate: { cart: { id: 'c1' }, userErrors: [] } },
    });
    await cartCreate('v1');
    expect(request).toHaveBeenCalledWith(
      expect.anything(),
      { variables: { variantId: 'v1', quantity: 1 } },
    );
  });

  it('throws the first userError message', async () => {
    request.mockResolvedValue({
      data: { cartCreate: { cart: null, userErrors: [{ message: 'sold out' }] } },
    });
    await expect(cartCreate('v1')).rejects.toThrow('sold out');
  });

  it('throws on top-level errors', async () => {
    request.mockResolvedValue({ errors: { message: 'net' } });
    await expect(cartCreate('v1')).rejects.toThrow('net');
  });
});

describe('cartLinesAdd', () => {
  it('returns the updated cart', async () => {
    request.mockResolvedValue({
      data: { cartLinesAdd: { cart: { id: 'c1' }, userErrors: [] } },
    });
    await expect(cartLinesAdd('c1', 'v2', 3)).resolves.toEqual({ id: 'c1' });
    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('CartLinesAdd'),
      { variables: { cartId: 'c1', variantId: 'v2', quantity: 3 } },
    );
  });
});

describe('cartLinesRemove', () => {
  it('returns the updated cart', async () => {
    request.mockResolvedValue({
      data: { cartLinesRemove: { cart: { id: 'c1' }, userErrors: [] } },
    });
    await expect(cartLinesRemove('c1', ['l1', 'l2'])).resolves.toEqual({ id: 'c1' });
    expect(request).toHaveBeenCalledWith(
      expect.stringContaining('CartLinesRemove'),
      { variables: { cartId: 'c1', lineIds: ['l1', 'l2'] } },
    );
  });
});
