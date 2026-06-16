import { render, screen, fireEvent } from '@testing-library/react';
import type { ShopifyProduct } from '@/lib/shopify';
import ProductTemplate from './ProductTemplate';

const addToCart = jest.fn();
let loading = false;

jest.mock('@/context/CartContext', () => ({
  useCart: () => ({ addToCart, loading }),
}));
jest.mock('@/context/TweaksContext', () => ({
  useTweaks: () => ({ tweaks: { density: 'loose' } }),
}));

function makeProduct(overrides: Partial<ShopifyProduct> = {}): ShopifyProduct {
  return {
    id: 'gid://shopify/Product/1',
    handle: 'top-marea',
    title: 'Top Marea',
    description: 'Pieza de prueba.',
    productType: 'Top',
    priceRange: { minVariantPrice: { amount: '720.00', currencyCode: 'MXN' } },
    options: [{ name: 'Talla', values: ['CH', 'M', 'G'] }],
    images: { edges: [] },
    variants: {
      edges: ['CH', 'M', 'G'].map(size => ({
        node: {
          id: `gid://shopify/ProductVariant/${size}`,
          title: size,
          availableForSale: size !== 'G',
          selectedOptions: [{ name: 'Talla', value: size }],
          price: { amount: '720.00', currencyCode: 'MXN' },
        },
      })),
    },
    collections: { edges: [{ node: { handle: 'deportivo', title: 'Deportivo' } }] },
    ...overrides,
  };
}

beforeEach(() => {
  addToCart.mockReset();
  loading = false;
});

describe('ProductTemplate size selection', () => {
  it('renders a button per option value, not per variant title', () => {
    render(<ProductTemplate product={makeProduct()} related={[]} />);
    expect(screen.getByRole('button', { name: 'CH' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'M' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'G' })).toBeInTheDocument();
  });

  it('disables sizes whose variant is not available for sale', () => {
    render(<ProductTemplate product={makeProduct()} related={[]} />);
    expect(screen.getByRole('button', { name: 'G' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'M' })).toBeEnabled();
  });

  it('adds the variant matching the selected size to the cart', () => {
    render(<ProductTemplate product={makeProduct()} related={[]} />);
    fireEvent.click(screen.getByRole('button', { name: 'M' }));
    fireEvent.click(screen.getByRole('button', { name: /Agregar a la bolsa/ }));
    expect(addToCart).toHaveBeenCalledWith('gid://shopify/ProductVariant/M');
  });

  it('prompts for a size before one is chosen and does not add to cart', () => {
    render(<ProductTemplate product={makeProduct()} related={[]} />);
    const cta = screen.getByRole('button', { name: 'Elige una talla' });
    fireEvent.click(cta);
    expect(addToCart).not.toHaveBeenCalled();
  });

  it('resolves size through selectedOptions when variant titles are multi-option', () => {
    const product = makeProduct({
      options: [
        { name: 'Talla', values: ['M', 'G'] },
        { name: 'Color', values: ['Negro'] },
      ],
      variants: {
        edges: [
          {
            node: {
              id: 'variant-m-negro',
              title: 'M / Negro',
              availableForSale: true,
              selectedOptions: [
                { name: 'Talla', value: 'M' },
                { name: 'Color', value: 'Negro' },
              ],
              price: { amount: '720.00', currencyCode: 'MXN' },
            },
          },
          {
            node: {
              id: 'variant-g-negro',
              title: 'G / Negro',
              availableForSale: true,
              selectedOptions: [
                { name: 'Talla', value: 'G' },
                { name: 'Color', value: 'Negro' },
              ],
              price: { amount: '720.00', currencyCode: 'MXN' },
            },
          },
        ],
      },
    });
    render(<ProductTemplate product={product} related={[]} />);
    fireEvent.click(screen.getByRole('button', { name: 'G' }));
    fireEvent.click(screen.getByRole('button', { name: /Agregar a la bolsa/ }));
    expect(addToCart).toHaveBeenCalledWith('variant-g-negro');
  });

  it('skips the size selector and adds the only variant when there is no size option', () => {
    const product = makeProduct({
      options: [{ name: 'Title', values: ['Default Title'] }],
      variants: {
        edges: [
          {
            node: {
              id: 'only-variant',
              title: 'Default Title',
              availableForSale: true,
              selectedOptions: [{ name: 'Title', value: 'Default Title' }],
              price: { amount: '720.00', currencyCode: 'MXN' },
            },
          },
        ],
      },
    });
    render(<ProductTemplate product={product} related={[]} />);
    expect(screen.queryByRole('button', { name: 'Default Title' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Agregar a la bolsa/ }));
    expect(addToCart).toHaveBeenCalledWith('only-variant');
  });
});
