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
    descriptionHtml: '<p>Pieza <strong>de prueba</strong>.</p>',
    metafields: [
      { key: 'composicion', value: '100% lino.' },
      { key: 'envio', value: 'Envío en 2 días.' },
      { key: 'origen', value: 'Hecho en Oaxaca.' },
    ],
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

  it('opens the lightbox when the main image is clicked', () => {
    const product = makeProduct({
      images: {
        edges: [
          { node: { url: 'https://mock.test/1.jpg', altText: 'Top Marea' } },
          { node: { url: 'https://mock.test/2.jpg', altText: 'Top Marea' } },
        ],
      },
    });
    render(<ProductTemplate product={product} related={[]} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ampliar imagen' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not make the image zoomable when the product has no real images', () => {
    render(<ProductTemplate product={makeProduct()} related={[]} />);
    expect(screen.getByRole('button', { name: 'Ampliar imagen' })).toBeDisabled();
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

describe('ProductTemplate accordion content', () => {
  it('renders the description body as rich HTML when longDescription is unset', () => {
    render(<ProductTemplate product={makeProduct()} related={[]} />);
    // "Descripción" is open by default; the <strong> tag should survive.
    expect(screen.getByText('de prueba').tagName).toBe('STRONG');
  });

  it('prefers the longDescription metafield over the HTML body', () => {
    const product = makeProduct({
      descriptionHtml: '<p>HTML <strong>body</strong>.</p>',
      metafields: [{ key: 'longDescription', value: 'Texto largo línea 1.\nLínea 2.' }],
    });
    render(<ProductTemplate product={product} related={[]} />);
    expect(screen.getByText(/Texto largo línea 1/)).toBeInTheDocument();
    // The rich HTML body should not render when longDescription wins.
    expect(screen.queryByText('body')).not.toBeInTheDocument();
  });

  it('shows each accordion section from its metafield', () => {
    render(<ProductTemplate product={makeProduct()} related={[]} />);
    fireEvent.click(screen.getByRole('button', { name: /Composición y cuidado/ }));
    expect(screen.getByText('100% lino.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Envío y cambios/ }));
    expect(screen.getByText('Envío en 2 días.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Origen/ }));
    expect(screen.getByText('Hecho en Oaxaca.')).toBeInTheDocument();
  });

  it('falls back to house copy when a metafield is unset', () => {
    const product = makeProduct({
      metafields: [null, null, null],
    });
    render(<ProductTemplate product={product} related={[]} />);
    fireEvent.click(screen.getByRole('button', { name: /Origen/ }));
    expect(screen.getByText(/Cortado y cosido en CDMX/)).toBeInTheDocument();
  });

  it('falls back when metafields are returned empty', () => {
    const product = makeProduct({ metafields: [] });
    render(<ProductTemplate product={product} related={[]} />);
    fireEvent.click(screen.getByRole('button', { name: /Composición y cuidado/ }));
    expect(screen.getByText('Ver etiqueta interior.')).toBeInTheDocument();
  });
});
