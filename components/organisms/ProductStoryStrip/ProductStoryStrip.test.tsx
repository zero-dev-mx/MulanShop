import { render, screen } from '@testing-library/react';
import ProductStoryStrip from './ProductStoryStrip';

describe('ProductStoryStrip', () => {
  it('renders the product type in the eyebrow', () => {
    render(<ProductStoryStrip productType="Blusa" />);
    expect(screen.getByText(/La historia · Blusa/i)).toBeInTheDocument();
  });

  it('renders default body copy when none is provided', () => {
    render(<ProductStoryStrip productType="Blusa" />);
    expect(screen.getByText(/Cortada y cosida en CDMX/)).toBeInTheDocument();
  });

  it('renders custom body copy', () => {
    render(<ProductStoryStrip productType="Falda" body="Tejida a mano en Oaxaca." />);
    expect(screen.getByText('Tejida a mano en Oaxaca.')).toBeInTheDocument();
  });

  it('renders default stats', () => {
    render(<ProductStoryStrip productType="Blusa" />);
    expect(screen.getByText('Manos involucradas')).toBeInTheDocument();
    expect(screen.getByText('Lote actual')).toBeInTheDocument();
    expect(screen.getByText('Piezas hechas')).toBeInTheDocument();
  });

  it('renders custom stats', () => {
    const stats = [{ n: '10', label: 'Artesanas' }];
    render(<ProductStoryStrip productType="Blusa" stats={stats} />);
    expect(screen.getByText('Artesanas')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders placeholder slots when no images are provided', () => {
    render(<ProductStoryStrip productType="Blusa" />);
    expect(screen.getByText('[ DETALLE · 01 ]')).toBeInTheDocument();
  });

  it('renders as many image slots as images provided', () => {
    const images = ['https://example.com/a.jpg', 'https://example.com/b.jpg'];
    render(<ProductStoryStrip productType="Blusa" images={images} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
