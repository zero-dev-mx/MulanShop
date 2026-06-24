'use client';

import { useRef } from 'react';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import Seal from '@/components/atoms/Seal/Seal';

interface Stat {
  n: string;
  label: string;
}

interface ProductStoryStripProps {
  productType: string;
  body?: string;
  stats?: Stat[];
  images?: string[];
}

const DEFAULT_BODY =
  'Nuestra comunidad crece con cada producto, y con ella nuestra historia. Cada pieza que eliges es parte de un relato más grande, el de una marca hecha para mujeres que se mueven, están y se presentan completamente.';

const DEFAULT_STATS: Stat[] = [
  { n: '12', label: 'Prendas en la temporada' },
  { n: '03', label: 'Categorías' },
  { n: '23', label: 'Mujeres en nuestra comunidad' },
];

const COMMUNITY_VIDEO = '/community/community-video.mp4';

const COMMUNITY_IMAGES = Array.from(
  { length: 28 },
  (_, i) => `/community/community-${String(i + 1).padStart(2, '0')}.webp`,
);

// The clip leads the strip, followed by the community photo set.
const DEFAULT_IMAGES = [COMMUNITY_VIDEO, ...COMMUNITY_IMAGES];

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);
const posterFor = (src: string) => src.replace(/\.(mp4|webm|mov)$/i, '-poster.webp');

export default function ProductStoryStrip({
  productType,
  body = DEFAULT_BODY,
  stats = DEFAULT_STATS,
  images = [],
}: ProductStoryStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const scroll = (dir: 'prev' | 'next') => {
    const el = stripRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    el.style.cursor = 'grabbing';
    el.style.scrollSnapType = 'none';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stripRef.current;
    if (!el || !dragRef.current.active) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = dragRef.current.scrollLeft - (x - dragRef.current.startX);
  };

  const stopDrag = () => {
    const el = stripRef.current;
    if (!el) return;
    dragRef.current.active = false;
    el.style.cursor = 'grab';
    el.style.scrollSnapType = '';
  };

  const resolved = images.length > 0 ? images : DEFAULT_IMAGES;
  const slots = resolved.map((src, i) => ({ src, i }));

  return (
    <section className="bg-linen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_58%]">

        {/* Text column */}
        <div className="px-5 py-16 md:px-12 md:py-20 lg:px-14 lg:py-28 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-4">
              Nuestra comunidad · {productType}
            </div>
            <h3 className="m-0 font-display text-[32px] leading-[1.05] font-normal tracking-[-0.015em] text-sumi md:text-[44px]">
              Lo que más<br /><em className="font-light">nos enorgullece</em>
            </h3>
            <p className="mt-7 mb-0 font-body text-[16px] leading-[1.65] text-slate max-w-[440px]">
              {body}
            </p>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="flex flex-wrap gap-10 font-mono text-[10.5px] tracking-[0.18em] uppercase text-stone">
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className="text-sumi font-display text-[28px] mb-1 tracking-normal">{stat.n}</div>
                  <div>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image strip */}
        <div className="relative min-h-[420px] lg:min-h-0">
          <div
            ref={stripRef}
            className="flex gap-2 h-full overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab select-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
          {slots.map(({ src, i }) => (
            <div key={i} className="snap-start shrink-0 w-[78%] sm:w-[55%] lg:w-[48%]">
              {isVideo(src) ? (
                <div className="relative h-full min-h-full w-full overflow-hidden bg-sumi">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={src}
                    poster={posterFor(src)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`COMUNIDAD · ${String(i + 1).padStart(2, '0')}`}
                  />
                  <div className="absolute top-3.5 right-3.5">
                    <Seal size={28} color="#FFFFFF" bg="transparent" char="MS" />
                  </div>
                </div>
              ) : (
                <ImagePlaceholder
                  ratio="auto"
                  label={`DETALLE · ${String(i + 1).padStart(2, '0')}`}
                  tone={i % 2 === 0 ? 'dark' : 'light'}
                  seal
                  sealChar="MS"
                  src={src}
                />
              )}
            </div>
          ))}
          </div>

          {/* Arrows — vertically centered over the strip */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none">
            <button
              onClick={() => scroll('prev')}
              aria-label="Anterior"
              className="pointer-events-auto w-10 h-10 border border-ash bg-paper/80 backdrop-blur-sm cursor-pointer font-mono text-[16px] text-sumi flex items-center justify-center transition-colors hover:bg-sumi hover:text-paper hover:border-sumi"
            >
              ←
            </button>
            <button
              onClick={() => scroll('next')}
              aria-label="Siguiente"
              className="pointer-events-auto w-10 h-10 border border-ash bg-paper/80 backdrop-blur-sm cursor-pointer font-mono text-[16px] text-sumi flex items-center justify-center transition-colors hover:bg-sumi hover:text-paper hover:border-sumi"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
