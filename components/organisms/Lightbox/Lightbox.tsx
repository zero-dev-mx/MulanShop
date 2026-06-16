'use client';

import { useEffect, useState, useCallback, type MouseEvent } from 'react';
import Image from 'next/image';

export interface LightboxImage {
  src: string;
  label: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const ZOOM = 2.4;

export default function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');

  const count = images.length;
  const current = images[index];

  const go = useCallback(
    (dir: number) => {
      setZoomed(false);
      onIndexChange((index + dir + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Lock background scroll while the lightbox is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Reset zoom whenever the visible image changes.
  useEffect(() => {
    setZoomed(false);
    setOrigin('50% 50%');
  }, [index]);

  if (!current) return null;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${current.label} — galería`}
      className="fixed inset-0 z-[110] bg-sumi/95 flex flex-col"
      style={{ animation: 'mulanFade .25s ease' }}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center px-5 py-4 shrink-0 md:px-8">
        <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-paper/70">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
        <button
          onClick={onClose}
          className="bg-transparent border-0 cursor-pointer font-mono text-[10.5px] tracking-[0.22em] uppercase text-paper"
        >
          Cerrar ×
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden select-none">
        {count > 1 && (
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-3 z-10 w-11 h-11 rounded-full bg-paper/10 hover:bg-paper/20 border-0 cursor-pointer text-paper font-display text-[22px] flex items-center justify-center md:left-6"
          >
            ‹
          </button>
        )}

        <div
          onClick={() => setZoomed(z => !z)}
          onMouseMove={handleMove}
          onMouseLeave={() => setOrigin('50% 50%')}
          className={`relative w-full h-full ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        >
          <Image
            src={current.src}
            alt={current.label}
            fill
            sizes="100vw"
            priority
            style={{
              objectFit: 'contain',
              transform: zoomed ? `scale(${ZOOM})` : 'scale(1)',
              transformOrigin: origin,
              transition: zoomed ? 'none' : 'transform .3s ease',
            }}
          />
        </div>

        {count > 1 && (
          <button
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="absolute right-3 z-10 w-11 h-11 rounded-full bg-paper/10 hover:bg-paper/20 border-0 cursor-pointer text-paper font-display text-[22px] flex items-center justify-center md:right-6"
          >
            ›
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {count > 1 && (
        <div className="flex gap-2 justify-center px-5 py-4 shrink-0 overflow-x-auto">
          {images.map((im, i) => (
            <button
              key={i}
              onClick={() => onIndexChange(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative shrink-0 w-12 h-16 p-0 bg-transparent cursor-pointer border ${
                i === index ? 'border-paper' : 'border-paper/25'
              }`}
            >
              <Image src={im.src} alt={im.label} fill sizes="48px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      <div className="text-center pb-4 font-mono text-[9.5px] tracking-[0.22em] uppercase text-paper/50 shrink-0">
        Clic para {zoomed ? 'alejar' : 'acercar'}
      </div>
    </div>
  );
}
