'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { formatMXN } from '@/lib/products';
import type { ShopifyProduct } from '@/lib/shopify';
import { useTweaks } from '@/context/TweaksContext';
import { useCart } from '@/context/CartContext';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import SectionHeader from '@/components/molecules/SectionHeader/SectionHeader';
import VerticalEyebrow from '@/components/atoms/VerticalEyebrow/VerticalEyebrow';
import Button from '@/components/atoms/Button/Button';
import Seal from '@/components/atoms/Seal/Seal';

interface ProductTemplateProps {
  product: ShopifyProduct;
  related: ShopifyProduct[];
}

export default function ProductTemplate({ product, related }: ProductTemplateProps) {
  const { tweaks } = useTweaks();
  const { addToCart, loading } = useCart();

  const [size, setSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>('descripcion');
  const sizeRowRef = useRef<HTMLDivElement>(null);

  const variants = product.variants.edges.map(e => e.node);
  const selectedVariant = variants.find(v => v.title === size);
  const categoryHandle = product.collections.edges[0]?.node.handle ?? '';
  const displayPrice = selectedVariant
    ? formatMXN(selectedVariant.price.amount)
    : formatMXN(product.priceRange.minVariantPrice.amount);

  const images: { label: string; tone: 'light' | 'dark'; char: string; src: string | null }[] = product.images.edges.map((e, i) => ({
    label: i === 0 ? (product.productType || product.title.toUpperCase()) : `DETALLE ${i}`,
    tone: (i % 2 === 1 ? 'dark' : 'light') as 'light' | 'dark',
    char: i % 2 === 1 ? 'S' : 'M',
    src: e.node.url,
  }));
  if (images.length === 0) {
    images.push({ label: product.productType || product.title.toUpperCase(), tone: 'light', char: 'M', src: null });
  }

  function handleAdd() {
    if (!selectedVariant) {
      sizeRowRef.current?.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
        { duration: 280 }
      );
      return;
    }
    addToCart(selectedVariant.id);
  }

  const accordion = [
    { id: 'descripcion', label: 'Descripción', body: product.description },
    { id: 'composicion', label: 'Composición y cuidado', body: 'Ver etiqueta interior.' },
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
          <Link href={`/tienda?cat=${categoryHandle}`} className="text-inherit no-underline">{categoryHandle}</Link>
          <span>·</span>
          <span className="text-sumi">{product.title}</span>
        </div>
      </div>

      {/* Product hero */}
      <section className="px-5 py-8 relative md:px-12 md:pt-10 md:pb-20">
        <VerticalEyebrow side="right" top={40}>{product.title.toUpperCase()} · {product.productType}</VerticalEyebrow>

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
              <ImagePlaceholder
                ratio="3/4"
                label={images[activeImage]?.label ?? ''}
                tone={images[activeImage]?.tone ?? 'light'}
                seal
                sealChar={images[activeImage]?.char ?? 'M'}
                src={images[activeImage]?.src ?? null}
              />
              <div className="absolute top-5 left-5 bg-paper px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-sumi">
                {String(activeImage + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
            </div>

            {/* Info */}
            <div className="lg:sticky lg:top-[100px]">
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3.5">
                {categoryHandle} · {product.productType}
              </div>
              <h1 className="m-0 font-display text-[40px] leading-none font-normal tracking-[-0.02em] text-sumi md:text-[56px]">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mt-3.5 mb-8">
                <span className="font-display text-[28px] text-sumi font-normal">
                  {displayPrice}
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone">
                  ó 3 mensualidades · sin interés
                </span>
              </div>

              <p className="m-0 mb-8 font-body italic text-[17px] leading-[1.55] text-slate">
                {product.description}
              </p>

              {/* Size selector */}
              <div ref={sizeRowRef} className="mb-7">
                <div className="flex justify-between items-baseline mb-2.5">
                  <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone">
                    Talla {size && <span className="text-sumi">· {size}</span>}
                  </div>
                  <a href="/" className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate underline">Guía de tallas</a>
                </div>
                <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${variants.length}, 1fr)` }}>
                  {variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => v.availableForSale && setSize(v.title)}
                      disabled={!v.availableForSale}
                      className={`py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-150 border ${
                        !v.availableForSale
                          ? 'bg-transparent text-stone border-linen line-through cursor-not-allowed'
                          : size === v.title
                            ? 'bg-sumi text-paper border-sumi cursor-pointer'
                            : 'bg-transparent text-sumi border-ash cursor-pointer'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>

              <Button size="lg" full onClick={handleAdd} disabled={loading}>
                {loading
                  ? 'Agregando...'
                  : size
                    ? `Agregar a la bolsa · ${displayPrice}`
                    : 'Elige una talla'}
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
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 gap-12 items-center relative lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-4">
              La historia · {product.productType}
            </div>
            <h3 className="m-0 font-display text-[32px] leading-[1.05] font-normal tracking-[-0.015em] text-sumi md:text-[44px]">
              Cómo se<br /><em className="font-light">llegó aquí.</em>
            </h3>
            <p className="mt-7 mb-0 font-body text-[16px] leading-[1.65] text-slate max-w-[480px]">
              Cortada y cosida en CDMX por un taller de seis manos. Tela natural, costura francesa, botonadura a mano. La etiqueta lleva el nombre de quien la hizo.
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
            <ImagePlaceholder ratio="5/6" label="DETALLE · TELAR" tone="dark" seal sealChar="S" />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-5 py-16 md:px-12 md:pt-20 md:pb-10">
          <div className="max-w-[1280px] mx-auto">
            <SectionHeader eyebrow="También en este lote" title="Piezas que conviven bien" side={`Otras de ${categoryHandle}`} />
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {related.map(p => <ProductCard key={p.handle} product={p} density={tweaks.density} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
