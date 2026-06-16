import { render, screen, fireEvent } from '@testing-library/react';
import Lightbox, { type LightboxImage } from './Lightbox';

const IMAGES: LightboxImage[] = [
  { src: 'https://mock.test/a.jpg', label: 'Imagen A' },
  { src: 'https://mock.test/b.jpg', label: 'Imagen B' },
  { src: 'https://mock.test/c.jpg', label: 'Imagen C' },
];

function setup(index = 0) {
  const onIndexChange = jest.fn();
  const onClose = jest.fn();
  render(
    <Lightbox images={IMAGES} index={index} onIndexChange={onIndexChange} onClose={onClose} />,
  );
  return { onIndexChange, onClose };
}

describe('Lightbox', () => {
  it('shows the current image and a 1-based counter', () => {
    setup(0);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('01 / 03')).toBeInTheDocument();
  });

  it('advances to the next image, wrapping at the end', () => {
    const { onIndexChange } = setup(2);
    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('goes to the previous image, wrapping at the start', () => {
    const { onIndexChange } = setup(0);
    fireEvent.click(screen.getByRole('button', { name: 'Anterior' }));
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('navigates with the arrow keys', () => {
    const { onIndexChange } = setup(1);
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(onIndexChange).toHaveBeenCalledWith(2);
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('closes on Escape and on the Cerrar button', () => {
    const { onClose } = setup(0);
    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: /Cerrar/ }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('jumps to a thumbnail when clicked', () => {
    const { onIndexChange } = setup(0);
    fireEvent.click(screen.getByRole('button', { name: 'Ver imagen 3' }));
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('toggles zoom on the stage and reflects it in the hint', () => {
    setup(0);
    // The stage image renders before the thumbnail strip, so it's the first match.
    const stage = screen.getAllByAltText('Imagen A')[0].parentElement as HTMLElement;
    expect(screen.getByText(/Clic para acercar/)).toBeInTheDocument();
    fireEvent.click(stage);
    expect(screen.getByText(/Clic para alejar/)).toBeInTheDocument();
  });

  it('locks body scroll while open and restores it on unmount', () => {
    const { unmount } = render(
      <Lightbox images={IMAGES} index={0} onIndexChange={jest.fn()} onClose={jest.fn()} />,
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
