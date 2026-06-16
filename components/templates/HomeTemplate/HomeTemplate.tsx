'use client';

import Link from 'next/link';
import { useTweaks } from '@/context/TweaksContext';
import { MULAN_CATEGORIES, type Category } from '@/lib/products';
import type { ShopifyProduct } from '@/lib/shopify';
import HeroEditorial from '@/components/organisms/Hero/HeroEditorial';
import HeroSplit from '@/components/organisms/Hero/HeroSplit';
import HeroArchitectural from '@/components/organisms/Hero/HeroArchitectural';
import MarqueeBand from '@/components/organisms/MarqueeBand/MarqueeBand';
import CategoryCard from '@/components/molecules/CategoryCard/CategoryCard';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import SectionHeader from '@/components/molecules/SectionHeader/SectionHeader';
import VerticalEyebrow from '@/components/atoms/VerticalEyebrow/VerticalEyebrow';
import NosotrasSection from '@/components/organisms/NosotrasSection/NosotrasSection';
import PhilosophySection from '@/components/organisms/PhilosophySection/PhilosophySection';
import NewsletterForm from '@/components/molecules/NewsletterForm/NewsletterForm';

interface HomeTemplateProps {
  featuredProducts: ShopifyProduct[];
  categories?: Category[];
}

export default function HomeTemplate({ featuredProducts, categories = MULAN_CATEGORIES }: HomeTemplateProps) {
  const { tweaks } = useTweaks();
  const { heroVariant, density } = tweaks;
  const compact = density === 'compact';

  return (
    <main>
      {heroVariant === 'A' && <HeroEditorial />}
      {heroVariant === 'B' && <HeroSplit />}
      {heroVariant === 'C' && <HeroArchitectural />}

      <MarqueeBand />

      {/* Categorías */}
      <section className="px-5 py-16 relative md:px-12 md:pt-[120px] md:pb-20">
        <VerticalEyebrow side="left" top={120}>01 · Categorías</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader eyebrow="Tienda" title="Tres ritmos del día" side="Para moverse · para estar · para presentarse" />
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${compact ? 'gap-3' : 'gap-6'}`}>
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} total={categories.length} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial · Materiales */}
      <section className="px-5 py-16 relative md:px-12 md:py-20">
        <VerticalEyebrow side="right" top={80}>02 · Materiales</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-6">02 · Materiales</div>
            <h2 className="m-0 font-display text-[40px] leading-[1.02] font-normal tracking-[-0.018em] text-sumi mb-7 md:text-[56px]">
              Algodón, lana,<br /><em className="font-light">lino, seda.</em><br /><span className="text-stone">Nada más.</span>
            </h2>
            <p className="font-body text-[16px] leading-[1.65] text-slate max-w-[460px] mb-5">
              Trabajamos con fibras que se sienten como una segunda piel. Todo pensado en acompañarte siempre, desde el gym, eventos hasta esa escapada para desconectar.
            </p>
            <p className="font-body italic text-[16px] leading-[1.65] text-stone max-w-[460px] mb-9">
              — Dejanos acompanarte cada día, en cada momento.
            </p>
          </div>
          <div className="relative">
            <ImagePlaceholder ratio="4/5" label="DETALLE TELAR" tone="dark" seal sealChar="S" src="/materiales-textura.jpg" objectPosition="center center" />
            <div className="absolute -bottom-5 -left-5 bg-paper px-4 py-3 font-mono text-[10px] tracking-[0.18em] text-sumi border border-linen">
              LOTE · 04 / 008
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="px-5 py-16 relative md:px-12 md:pt-20 md:pb-10">
        <VerticalEyebrow side="left" top={80}>03 · Selección</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader eyebrow="Lote actual" title="Lo último del taller" side="Cuatro piezas que nos gusta llevar puestas" count={featuredProducts.length} />
          <div className={`grid grid-cols-2 lg:grid-cols-4 ${compact ? 'gap-4' : 'gap-x-6 gap-y-10'}`}>
            {featuredProducts.map(p => <ProductCard key={p.handle} product={p} density={density} />)}
          </div>
          <div className="text-center mt-14">
            <Link href="/tienda" className="font-mono text-[11px] tracking-[0.28em] uppercase text-sumi no-underline border-b border-sumi pb-1">
              Ver toda la tienda →
            </Link>
          </div>
        </div>
      </section>

      <NosotrasSection />

      <PhilosophySection />

      {/* Newsletter */}
      <section className="px-5 py-16 text-center md:px-12 md:py-24">
        <div className="max-w-[540px] mx-auto">
          <div className="font-display text-[72px] leading-none text-linen md:text-[96px]">S</div>
          <h3 className="mt-5 mb-3.5 font-display text-[32px] font-normal tracking-[-0.015em] md:text-[40px]">Carta cada luna nueva</h3>
          <p className="m-0 mb-8 font-body text-[15px] text-slate italic">
            Avisos del taller, lotes en preparación, lecturas. Sin ruido.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
