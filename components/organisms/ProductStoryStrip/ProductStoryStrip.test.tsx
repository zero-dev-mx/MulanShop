import { render, screen } from '@testing-library/react';
import ProductStoryStrip from './ProductStoryStrip';

describe('ProductStoryStrip', () => {
  it('renders the product type in the eyebrow', () => {
    render(<ProductStoryStrip productType="Blusa" />);
    expect(screen.getByText(/Nuestra comunidad · Blusa/i)).toBeInTheDocument();
  });

  it('renders default body copy when none is provided', () => {
    render(<ProductStoryStrip productType="Blusa" />);
    expect(
      screen.getByText(/Nuestra comunidad crece con cada producto/),
    ).toBeInTheDocument();
  });

  it('renders custom body copy', () => {
    render(<ProductStoryStrip productType="Falda" body="Tejida a mano en Oaxaca." />);
    expect(screen.getByText('Tejida a mano en Oaxaca.')).toBeInTheDocument();
  });

  it('renders default stats', () => {
    render(<ProductStoryStrip productType="Blusa" />);
    expect(screen.getByText('Prendas en la temporada')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Mujeres en nuestra comunidad')).toBeInTheDocument();
  });

  it('renders custom stats', () => {
    const stats = [{ n: '10', label: 'Artesanas' }];
    render(<ProductStoryStrip productType="Blusa" stats={stats} />);
    expect(screen.getByText('Artesanas')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders as many image slots as images provided', () => {
    const images = ['https://example.com/a.jpg', 'https://example.com/b.jpg'];
    render(<ProductStoryStrip productType="Blusa" images={images} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('renders a video element for video sources and images for the rest', () => {
    const images = ['/community/community-01.webp', '/community/community-video.mp4'];
    const { container } = render(
      <ProductStoryStrip productType="Blusa" images={images} />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(1);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('poster', '/community/community-video-poster.webp');
  });

  it('includes the community video in the default strip', () => {
    const { container } = render(<ProductStoryStrip productType="Blusa" />);
    expect(container.querySelector('video')).toBeInTheDocument();
  });
});
