import { act, renderHook } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { cartCreate, cartLinesAdd, cartLinesRemove } from '@/lib/queries';
import type { ShopifyCart } from '@/lib/shopify';

jest.mock('@/lib/queries', () => ({
  cartCreate: jest.fn(),
  cartLinesAdd: jest.fn(),
  cartLinesRemove: jest.fn(),
}));

const mockCartCreate = cartCreate as jest.Mock;
const mockCartLinesAdd = cartLinesAdd as jest.Mock;
const mockCartLinesRemove = cartLinesRemove as jest.Mock;

function cart(id: string, lineIds: string[] = []): ShopifyCart {
  return {
    id,
    checkoutUrl: `https://mock.test/checkout/${id}`,
    lines: {
      edges: lineIds.map(lid => ({
        node: {
          id: lid,
          quantity: 1,
          merchandise: {
            id: 'v1',
            title: 'M',
            product: { title: 'Top', handle: 'top' },
            price: { amount: '720.00', currencyCode: 'MXN' },
            image: null,
          },
        },
      })),
    },
    cost: { totalAmount: { amount: '720.00', currencyCode: 'MXN' } },
  };
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

beforeEach(() => {
  jest.clearAllMocks();
});

it('throws when used outside a provider', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => renderHook(() => useCart())).toThrow('useCart must be used inside CartProvider');
  spy.mockRestore();
});

it('starts empty and closed', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
  expect(result.current.cart).toBeNull();
  expect(result.current.isOpen).toBe(false);
  expect(result.current.checkoutUrl).toBeNull();
});

it('creates a cart on the first add and opens the drawer', async () => {
  mockCartCreate.mockResolvedValue(cart('c1', ['l1']));
  const { result } = renderHook(() => useCart(), { wrapper });

  await act(async () => {
    await result.current.addToCart('v1', 2);
  });

  expect(mockCartCreate).toHaveBeenCalledWith('v1', 2);
  expect(mockCartLinesAdd).not.toHaveBeenCalled();
  expect(result.current.cart?.id).toBe('c1');
  expect(result.current.isOpen).toBe(true);
  expect(result.current.checkoutUrl).toBe('https://mock.test/checkout/c1');
});

it('adds lines to an existing cart on subsequent adds', async () => {
  mockCartCreate.mockResolvedValue(cart('c1', ['l1']));
  mockCartLinesAdd.mockResolvedValue(cart('c1', ['l1', 'l2']));
  const { result } = renderHook(() => useCart(), { wrapper });

  await act(async () => {
    await result.current.addToCart('v1');
  });
  await act(async () => {
    await result.current.addToCart('v2');
  });

  expect(mockCartLinesAdd).toHaveBeenCalledWith('c1', 'v2', 1);
  expect(result.current.cart?.lines.edges).toHaveLength(2);
});

it('does nothing on remove when there is no cart', async () => {
  const { result } = renderHook(() => useCart(), { wrapper });
  await act(async () => {
    await result.current.removeFromCart('l1');
  });
  expect(mockCartLinesRemove).not.toHaveBeenCalled();
});

it('removes a line from an existing cart', async () => {
  mockCartCreate.mockResolvedValue(cart('c1', ['l1']));
  mockCartLinesRemove.mockResolvedValue(cart('c1', []));
  const { result } = renderHook(() => useCart(), { wrapper });

  await act(async () => {
    await result.current.addToCart('v1');
  });
  await act(async () => {
    await result.current.removeFromCart('l1');
  });

  expect(mockCartLinesRemove).toHaveBeenCalledWith('c1', ['l1']);
  expect(result.current.cart?.lines.edges).toHaveLength(0);
});

it('opens and closes the drawer', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
  act(() => result.current.openCart());
  expect(result.current.isOpen).toBe(true);
  act(() => result.current.closeCart());
  expect(result.current.isOpen).toBe(false);
});
