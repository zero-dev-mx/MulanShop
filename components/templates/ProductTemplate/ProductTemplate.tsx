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
import Lightbox from '@/components/organisms/Lightbox/Lightbox';
import ProductStoryStrip from '@/components/organisms/ProductStoryStrip/ProductStoryStrip';

interface ProductTemplateProps {
  product: ShopifyProduct;
  related: ShopifyProduct[];
}

export default function ProductTemplate({ product, related }: ProductTemplateProps) {
  const { tweaks } = useTweaks();
  const { addToCart, loading } = useCart();

  const [size, setSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('descripcion');
  const sizeRowRef = useRef<HTMLDivElement>(null);

  const variants = product.variants.edges.map(e => e.node);

  // Sizes come from the Shopify product option named "Talla" (or "Size"), not
  // the variant title — a variant's title collapses to "M / Negro" once a
  // product carries more than one option. Resolve back to a variant through
  // selectedOptions so multi-option products keep working.
  const sizeOption = product.options.find(o => /^(talla|size)$/i.test(o.name));
  const sizeValues = sizeOption?.values ?? [];
  const hasSizes = sizeValues.length > 0;

  const variantForSize = (value: string) =>
    variants.find(v =>
      v.selectedOptions.some(o => o.name === sizeOption?.name && o.value === value)
    );

  const selectedVariant = hasSizes
    ? (size ? variantForSize(size) : undefined)
    : variants[0];

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

  // Only real (non-placeholder) images are zoomable in the lightbox. Shopify
  // products always carry srcs, so the indices stay aligned with activeImage.
  const lightboxImages = images
    .filter((im): im is typeof im & { src: string } => im.src !== null)
    .map(im => ({ src: im.src, label: im.label }));
  const canZoom = lightboxImages.length > 0;

  function handleAdd() {
    if (!selectedVariant) {
      if (hasSizes) {
        sizeRowRef.current?.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
          { duration: 280 }
        );
      }
      return;
    }
    addToCart(selectedVariant.id);
  }

  // Metafield bodies are merchant-authored in Shopify; fall back to house copy
  // when a product hasn't set one yet.
  const meta = (key: string) =>
    product.metafields.find(m => m?.key === key)?.value || null;

  // Prefer the long-form text metafield; fall back to the rich HTML body, then
  // to the plain description.
  const longDescription = meta('longDescription');
  type AccordionSection = { id: string; label: string; body?: string; html?: string };
  const accordion: AccordionSection[] = [
    longDescription
      ? { id: 'descripcion', label: 'Descripción', body: longDescription }
      : { id: 'descripcion', label: 'Descripción', html: product.descriptionHtml || `<p>${product.description}</p>` },
    { id: 'composicion', label: 'Composición y cuidado', body: meta('composicion') ?? 'Ver etiqueta interior.' },
    { id: 'envio', label: 'Envío y cambios', body: meta('envio') ?? 'Envío estándar 3–5 días hábiles. Gratis en compras mayores a $1,500 MXN. Cambios y devoluciones dentro de 30 días, con etiquetas intactas.' },
    { id: 'origen', label: 'Origen', body: meta('origen') ?? 'Cortado y cosido en CDMX. Lote 04 / 008. Cada prenda lleva el nombre de quien la hizo en la etiqueta interior.' },
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
              <button
                type="button"
                onClick={() => canZoom && setLightboxOpen(true)}
                disabled={!canZoom}
                aria-label="Ampliar imagen"
                className={`block w-full p-0 bg-transparent border-0 ${canZoom ? 'cursor-zoom-in' : 'cursor-default'}`}
              >
                <ImagePlaceholder
                  ratio="3/4"
                  label={images[activeImage]?.label ?? ''}
                  tone={images[activeImage]?.tone ?? 'light'}
                  seal
                  sealChar={images[activeImage]?.char ?? 'M'}
                  src={images[activeImage]?.src ?? null}
                />
              </button>
              <div className="absolute top-5 left-5 bg-paper px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] text-sumi pointer-events-none">
                {String(activeImage + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
              {canZoom && (
                <div className="absolute bottom-5 right-5 bg-paper/90 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.22em] uppercase text-sumi pointer-events-none">
                  Ampliar ⤢
                </div>
              )}
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
                  o 3 mensualidades · sin interés
                </span>
              </div>

              <p className="m-0 mb-8 font-body italic text-[17px] leading-[1.55] text-slate">
                {product.description}
              </p>

              {/* Size selector */}
              {hasSizes && (
                <div ref={sizeRowRef} className="mb-7">
                  <div className="flex justify-between items-baseline mb-2.5">
                    <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone">
                      {sizeOption?.name ?? 'Talla'} {size && <span className="text-sumi">· {size}</span>}
                    </div>
                    <a href="/" className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate underline">Guía de tallas</a>
                  </div>
                  <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${sizeValues.length}, 1fr)` }}>
                    {sizeValues.map(value => {
                      const variant = variantForSize(value);
                      const available = variant?.availableForSale ?? false;
                      return (
                        <button
                          key={value}
                          onClick={() => available && setSize(value)}
                          disabled={!available}
                          className={`py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-150 border ${
                            !available
                              ? 'bg-transparent text-stone border-linen line-through cursor-not-allowed'
                              : size === value
                                ? 'bg-sumi text-paper border-sumi cursor-pointer'
                                : 'bg-transparent text-sumi border-ash cursor-pointer'
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <Button size="lg" full onClick={handleAdd} disabled={loading}>
                {loading
                  ? 'Agregando...'
                  : selectedVariant
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
                      s.html ? (
                        <div
                          className="pb-5 font-body text-[14.5px] leading-[1.6] text-slate [&_p]:m-0 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_strong]:font-medium [&_strong]:text-sumi [&_em]:italic"
                          dangerouslySetInnerHTML={{ __html: s.html }}
                        />
                      ) : (
                        <div className="pb-5 font-body text-[14.5px] leading-[1.6] text-slate whitespace-pre-line">
                          {s.body}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related */}
      {related.length > 0 && (
        <section className="px-5 py-16 md:px-12 md:pt-20 md:pb-10">
          <div className="max-w-[1280px] mx-auto">
            <SectionHeader eyebrow="También en esta temporada" title="Piezas que conviven bien" side="Y también nos encantan" />
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {related.map(p => <ProductCard key={p.handle} product={p} density={tweaks.density} />)}
            </div>
          </div>
        </section>
      )}
      <ProductStoryStrip productType={product.productType} />

      {lightboxOpen && canZoom && (
        <Lightbox
          images={lightboxImages}
          index={Math.min(activeImage, lightboxImages.length - 1)}
          onIndexChange={setActiveImage}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </main>
  );
}
