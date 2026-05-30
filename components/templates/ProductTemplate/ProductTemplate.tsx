'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { MULAN_PRODUCTS, formatMXN } from '@/lib/products';
import type { Product } from '@/lib/products';
import { useTweaks } from '@/context/TweaksContext';
import { useCart } from '@/context/CartContext';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import SectionHeader from '@/components/molecules/SectionHeader/SectionHeader';
import VerticalEyebrow from '@/components/atoms/VerticalEyebrow/VerticalEyebrow';
import Button from '@/components/atoms/Button/Button';
import Seal from '@/components/atoms/Seal/Seal';

interface ProductTemplateProps {
  productId: string;
}

const DETAIL_IMAGES = [
  '/products/detail-1.jpg',
  '/products/detail-2.jpg',
  '/products/detail-3.jpg',
];

const CATEGORY_CJK: Record<Product['category'], string> = {
  vestidos: '夜',
  playa: '海',
  deportivo: '動',
};

export default function ProductTemplate({ productId }: ProductTemplateProps) {
  const product = MULAN_PRODUCTS.find(p => p.id === productId) ?? MULAN_PRODUCTS[0];
  const { tweaks } = useTweaks();
  const { addToCart } = useCart();

  const [size, setSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>('descripcion');
  const sizeRowRef = useRef<HTMLDivElement>(null);

  const related = MULAN_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const images = product.image
    ? [
        { label: product.label, tone: 'light' as const, char: '木', src: product.image },
        { label: 'DETALLE',     tone: 'dark'  as const, char: '兰', src: DETAIL_IMAGES[0] },
        { label: 'EN USO',      tone: 'light' as const, char: '木', src: DETAIL_IMAGES[1] },
        { label: 'DETALLE 2',   tone: 'light' as const, char: '木', src: DETAIL_IMAGES[2] },
      ]
    : [
        { label: product.label, tone: 'light' as const, char: '木', src: null },
        { label: 'DETALLE',     tone: 'dark'  as const, char: '兰', src: null },
        { label: 'EN USO',      tone: 'light' as const, char: '木', src: null },
        { label: 'DETALLE 2',   tone: 'light' as const, char: '木', src: null },
      ];

  function handleAdd() {
    if (!size) {
      sizeRowRef.current?.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
        { duration: 280 }
      );
      return;
    }
    addToCart({ ...product, size, qty: 1 });
  }

  const accordion = [
    { id: 'descripcion', label: 'Descripción', body: product.description + (product.story ? '\n\n' + product.story : '') },
    { id: 'composicion', label: 'Composición y cuidado', body: product.composition + '\n' + product.care },
    { id: 'envio', label: 'Envío y cambios', body: 'Envío estándar 3–5 días hábiles. Gratis en compras mayores a $1,500 MXN. Cambios y devoluciones dentro de 30 días, con etiquetas intactas.' },
    { id: 'origen', label: 'Origen', body: 'Cortado y cosido en CDMX. Lote 04 / 008. Cada prenda lleva el nombre de quien la hizo en la etiqueta interior.' },
  ];

  return (
    <main className="bg-bg">
      {/* Breadcrumb */}
      <div className="border-b border-linen px-5 py-3.5 bg-paper md:px-12">
        <div className="max-w-[1400px] mx-auto font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone flex gap-3 flex-wrap">
          <Link href="/" className="text-inherit no-underline">Casa</Link>
          <span>·</span>
          <Link href="/tienda" className="text-inherit no-underline">Tienda</Link>
          <span>·</span>
          <Link href={`/tienda?cat=${product.category}`} className="text-inherit no-underline">{product.category}</Link>
          <span>·</span>
          <span className="text-sumi">{product.name}</span>
        </div>
      </div>

      {/* Product hero */}
      <section className="px-5 py-8 relative md:px-12 md:pt-10 md:pb-20">
        <VerticalEyebrow side="right" top={40}>{product.name.toUpperCase()} · {product.label}</VerticalEyebrow>

        <div className="max-w-[1400px] mx-auto">
          {/* Mobile thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 lg:hidden">
            {images.map((im, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-16 p-0 bg-transparent cursor-pointer border ${activeImage === i ? 'border-sumi' : 'border-linen'}`}
              >
                <ImagePlaceholder ratio="3/4" label={`0${i + 1}`} tone={im.tone} src={im.src} />
              </button>
            ))}
          </div>

          {/* Desktop: 3-column grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[90px_1fr_460px] lg:gap-8 lg:items-start">
            {/* Left thumbnails — desktop only */}
            <div className="hidden lg:flex flex-col gap-2.5 sticky top-[100px]">
              {images.map((im, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`p-0 bg-transparent cursor-pointer border ${activeImage === i ? 'border-sumi' : 'border-linen'}`}
                >
                  <ImagePlaceholder ratio="3/4" label={`0${i + 1}`} tone={im.tone} src={im.src} />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative">
              <ImagePlaceholder ratio="3/4" label={images[activeImage].label} tone={images[activeImage].tone} seal sealChar={images[activeImage].char} src={images[activeImage].src} />
              <div className="absolute top-5 left-5 bg-paper px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-sumi">
                {String(activeImage + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
            </div>

            {/* Info */}
            <div className="lg:sticky lg:top-[100px]">
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3.5">
                {product.category} · {product.label}
              </div>
              <h1 className="m-0 font-display text-[40px] leading-none font-normal tracking-[-0.02em] text-sumi md:text-[56px]">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mt-3.5 mb-8">
                <span className="font-display text-[28px] text-sumi font-normal">
                  {formatMXN(product.price)}
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone">
                  ó 3 mensualidades · sin interés
                </span>
              </div>

              <p className="m-0 mb-8 font-body italic text-[17px] leading-[1.55] text-slate">
                {product.description}
              </p>

              {/* Color */}
              <div className="mb-6">
                <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone mb-2.5">
                  Color · <span className="text-sumi">{product.color}</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-linen border border-sumi" />
                  <div className="w-7 h-7 bg-slate border border-linen opacity-50" />
                </div>
              </div>

              {/* Size */}
              <div ref={sizeRowRef} className="mb-7">
                <div className="flex justify-between items-baseline mb-2.5">
                  <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone">
                    Talla {size && <span className="text-sumi">· {size}</span>}
                  </div>
                  <a href="/" className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate underline">Guía de tallas</a>
                </div>
                <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${product.sizes.length}, 1fr)` }}>
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase cursor-pointer transition-all duration-150 border ${
                        size === s
                          ? 'bg-sumi text-paper border-sumi'
                          : 'bg-transparent text-sumi border-ash'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <Button size="lg" full onClick={handleAdd}>
                {size ? `Agregar a la bolsa · ${formatMXN(product.price)}` : 'Elige una talla'}
              </Button>

              <div className="mt-3.5 flex justify-between font-mono text-[9.5px] tracking-[0.18em] uppercase text-stone">
                <span>· Envío gratis MX</span>
                <span>· Cambios fáciles</span>
                <span>· Hecho a mano</span>
              </div>

              {/* Accordion */}
              <div className="mt-9 border-t border-linen">
                {accordion.map(s => (
                  <div key={s.id} className="border-b border-linen">
                    <button
                      onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                      className="w-full bg-transparent border-0 cursor-pointer py-5 flex justify-between items-center font-mono text-[10.5px] tracking-[0.22em] uppercase text-sumi text-left"
                    >
                      {s.label}
                      <span className="font-display text-[18px]">{openSection === s.id ? '−' : '+'}</span>
                    </button>
                    {openSection === s.id && (
                      <div className="pb-5 font-body text-[14.5px] leading-[1.6] text-slate whitespace-pre-line">
                        {s.body}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story strip */}
      <section className="bg-linen px-5 py-16 relative overflow-hidden md:px-12 md:py-20">
        <div className="absolute top-1/2 -translate-y-1/2 -right-10 font-display text-ash opacity-50 pointer-events-none select-none font-normal leading-[0.85] text-[200px] md:text-[360px]">
          {CATEGORY_CJK[product.category]}
        </div>

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 gap-12 items-center relative lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-4">
              La historia · {product.label}
            </div>
            <h3 className="m-0 font-display text-[32px] leading-[1.05] font-normal tracking-[-0.015em] text-sumi md:text-[44px]">
              {product.story
                ? <>De donde<br /><em className="font-light">viene esta pieza.</em></>
                : <>Cómo se<br /><em className="font-light">llegó aquí.</em></>}
            </h3>
            <p className="mt-7 mb-0 font-body text-[16px] leading-[1.65] text-slate max-w-[480px]">
              {product.story || 'Cortada y cosida en CDMX por un taller de seis manos. Tela natural, costura francesa, botonadura a mano. La etiqueta lleva el nombre de quien la hizo.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-8 font-mono text-[10.5px] tracking-[0.18em] uppercase text-stone">
              {[{ n: '06', label: 'Manos involucradas' }, { n: '04', label: 'Lote actual' }, { n: '12', label: 'Piezas hechas' }].map(stat => (
                <div key={stat.label}>
                  <div className="text-sumi font-display text-[26px] mb-1 tracking-normal">{stat.n}</div>
                  <div>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <ImagePlaceholder ratio="5/6" label="DETALLE · TELAR" tone="dark" seal sealChar="兰" />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-5 py-16 md:px-12 md:pt-20 md:pb-10">
          <div className="max-w-[1280px] mx-auto">
            <SectionHeader eyebrow="También en este lote" title="Piezas que conviven bien" side={`Otras de ${product.category}`} />
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {related.map(p => <ProductCard key={p.id} product={p} density={tweaks.density} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
