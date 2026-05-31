'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MULAN_CATEGORIES } from '@/lib/products';
import type { ShopifyProduct } from '@/lib/shopify';
import { useTweaks } from '@/context/TweaksContext';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import VerticalEyebrow from '@/components/atoms/VerticalEyebrow/VerticalEyebrow';

type SortKey = 'curado' | 'asc' | 'desc';
type CatFilter = 'todo' | 'deportivo' | 'playa' | 'vestidos';

interface CollectionTemplateProps {
  products: ShopifyProduct[];
}

export default function CollectionTemplate({ products }: CollectionTemplateProps) {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get('cat') as CatFilter | null) ?? 'todo';

  const [sort, setSort] = useState<SortKey>('curado');
  const [activeCat, setActiveCat] = useState<CatFilter>(initialCat);
  const { tweaks } = useTweaks();
  const { density } = tweaks;
  const compact = density === 'compact';

  let displayed = products;
  if (activeCat !== 'todo') {
    displayed = products.filter(p =>
      p.collections.edges.some(e => e.node.handle === activeCat)
    );
  }
  if (sort === 'asc')  displayed = [...displayed].sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
  if (sort === 'desc') displayed = [...displayed].sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));

  const activeCatObj = MULAN_CATEGORIES.find(c => c.id === activeCat);

  const h1Text = () => {
    if (activeCat === 'todo')      return <>Toda la <em className="font-light">tienda</em></>;
    if (activeCat === 'deportivo') return <>Para <em className="font-light">moverse</em></>;
    if (activeCat === 'playa')     return <>Para <em className="font-light">estar</em></>;
    return <>Para <em className="font-light">presentarse</em></>;
  };

  return (
    <main>
      {/* Banner */}
      <section className="relative overflow-hidden px-5 py-16 border-b border-linen md:px-12 md:pt-20 md:pb-16">
        <div className="absolute top-1/2 -translate-y-1/2 -right-[120px] font-display leading-[0.85] text-linen opacity-55 font-normal pointer-events-none select-none text-[280px] md:text-[560px]">
          {activeCatObj ? activeCatObj.cjk : '木兰'}
        </div>

        <div className="max-w-[1280px] mx-auto relative">
          <div className="flex items-baseline gap-4 mb-5 font-mono text-[10.5px] tracking-[0.22em] uppercase text-stone">
            <Link href="/" className="text-inherit no-underline">Casa</Link>
            <span>·</span>
            <span>Tienda</span>
            {activeCatObj && <><span>·</span><span className="text-sumi">{activeCatObj.label}</span></>}
          </div>
          <h1 className="m-0 font-display text-[clamp(56px,8vw,132px)] leading-[0.92] font-normal tracking-[-0.025em] text-sumi">
            {h1Text()}
          </h1>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end sm:gap-6">
            <p className="m-0 font-body italic text-[16px] text-slate max-w-[420px]">
              {activeCatObj ? activeCatObj.blurb + ' Lote actual.' : 'Doce piezas, hechas a mano en CDMX. Cuando se acaben, se acaban.'}
            </p>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone shrink-0">
              {displayed.length} pieza{displayed.length === 1 ? '' : 's'} · Lote 04
            </div>
          </div>
        </div>
      </section>

      {/* Control bar */}
      <section className="border-b border-linen bg-bg sticky top-[53px] z-20 md:top-[59px]">
        <div className="max-w-[1280px] mx-auto px-5 py-3 flex flex-wrap justify-between items-center gap-3 md:px-12 md:py-[18px]">
          <div className="flex flex-wrap gap-1 font-mono text-[10.5px] tracking-[0.22em] uppercase">
            {([{ id: 'todo', label: 'Todo' }, ...MULAN_CATEGORIES] as { id: string; label: string; cjk?: string }[]).map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id as CatFilter)}
                className={`border-0 px-3 py-2 font-mono text-[10.5px] tracking-[0.22em] uppercase cursor-pointer transition-all duration-150 md:px-[18px] md:py-2.5 ${
                  activeCat === c.id ? 'bg-sumi text-paper' : 'bg-transparent text-slate'
                }`}
              >
                {c.label}
                {c.cjk && <span className="font-display ml-2 text-[12px] tracking-normal">{c.cjk}</span>}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center font-mono text-[10.5px] tracking-[0.22em] uppercase text-slate md:gap-[18px]">
            <span className="text-stone hidden sm:inline">Orden</span>
            {([{ id: 'curado', label: 'Curado' }, { id: 'asc', label: 'Precio ↑' }, { id: 'desc', label: 'Precio ↓' }] as { id: SortKey; label: string }[]).map(s => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={`bg-transparent border-0 cursor-pointer p-0 pb-0.5 font-mono text-[10.5px] tracking-[0.22em] uppercase transition-colors ${
                  sort === s.id ? 'text-sumi border-b border-sumi' : 'text-slate border-b border-transparent'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="px-5 py-12 relative md:px-12 md:pt-16 md:pb-20">
        <VerticalEyebrow side="left" top={60}>Lote 04 · Primavera 26</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto">
          <div className={`grid grid-cols-2 ${
            compact
              ? 'gap-x-4 gap-y-8 lg:grid-cols-4'
              : 'gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16'
          }`}>
            {displayed.map((p, i) => (
              <div key={p.handle} className="relative">
                <div className="absolute -top-2 -left-0.5 z-[1] font-mono text-[10px] tracking-[0.18em] text-stone">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <ProductCard product={p} density={density} />
              </div>
            ))}
          </div>
          {displayed.length === 0 && (
            <div className="text-center py-20 font-body italic text-stone text-[16px]">
              No hay piezas en esta categoría todavía.
            </div>
          )}
        </div>
      </section>

      {/* Ethos block */}
      <section className="px-5 py-16 bg-sumi text-linen relative overflow-hidden md:px-12 md:py-24">
        <div className="absolute top-1/2 -translate-y-1/2 -left-16 font-display leading-[0.85] text-slate opacity-50 pointer-events-none font-normal text-[280px] md:text-[480px]">兰</div>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 gap-6 items-center relative lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-ash">La promesa</div>
          <div>
            <p className="m-0 font-display text-[22px] leading-[1.18] font-normal text-white md:text-[36px]">
              Cada prenda se hace en un taller de menos de doce manos. Tela natural, costura visible, etiqueta con el nombre de quien la cortó. <em className="italic text-linen">Si te equivocas de talla, te la cambiamos.</em>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
