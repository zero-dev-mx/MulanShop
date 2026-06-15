'use client';

import Link from 'next/link';
import type { ShopifyProduct } from '@/lib/shopify';
import { useTweaks } from '@/context/TweaksContext';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import VerticalEyebrow from '@/components/atoms/VerticalEyebrow/VerticalEyebrow';

interface SearchTemplateProps {
  query: string;
  products: ShopifyProduct[];
}

export default function SearchTemplate({ query, products }: SearchTemplateProps) {
  const { tweaks } = useTweaks();
  const { density } = tweaks;
  const compact = density === 'compact';

  return (
    <main>
      <section className="relative overflow-hidden px-5 py-16 border-b border-linen md:px-12 md:pt-20 md:pb-16">
        <div className="absolute top-1/2 -translate-y-1/2 -right-[120px] font-display leading-[0.85] text-linen opacity-55 font-normal pointer-events-none select-none text-[280px] md:text-[560px]">
          B
        </div>

        <div className="max-w-[1280px] mx-auto relative">
          <div className="flex items-baseline gap-4 mb-5 font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone">
            <Link href="/" className="text-inherit no-underline">Casa</Link>
            <span>·</span>
            <span>Buscar</span>
            {query && <><span>·</span><span className="text-sumi">&ldquo;{query}&rdquo;</span></>}
          </div>

          <h1 className="m-0 font-display text-[clamp(56px,8vw,132px)] leading-[0.92] font-normal tracking-[-0.025em] text-sumi">
            {query ? (
              <><em className="font-light">&ldquo;{query}&rdquo;</em></>
            ) : (
              <>¿Qué <em className="font-light">buscas?</em></>
            )}
          </h1>

          {query && (
            <div className="mt-6 font-mono text-[11px] tracking-[0.22em] uppercase text-stone">
              {products.length} resultado{products.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </section>

      <section className="px-5 py-12 relative md:px-12 md:pt-16 md:pb-20">
        <VerticalEyebrow side="left" top={60}>Lote 04 · Primavera 26</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto">
          {!query ? (
            <div className="text-center py-20 font-body italic text-stone text-[16px]">
              Usa el buscador del menú para encontrar piezas.
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 font-body italic text-stone text-[16px]">
              Sin resultados para &ldquo;{query}&rdquo;. Prueba con otro término.
            </div>
          ) : (
            <div className={`grid grid-cols-2 ${
              compact
                ? 'gap-x-4 gap-y-8 lg:grid-cols-4'
                : 'gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16'
            }`}>
              {products.map((p, i) => (
                <div key={p.handle} className="relative">
                  <div className="absolute -top-2 -left-0.5 z-[1] font-mono text-[10px] tracking-[0.18em] text-stone">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <ProductCard product={p} density={density} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
