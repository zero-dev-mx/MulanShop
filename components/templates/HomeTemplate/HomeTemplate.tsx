'use client';

import Link from 'next/link';
import { useTweaks } from '@/context/TweaksContext';
import { MULAN_PRODUCTS, MULAN_CATEGORIES } from '@/lib/products';
import HeroEditorial from '@/components/organisms/Hero/HeroEditorial';
import HeroSplit from '@/components/organisms/Hero/HeroSplit';
import HeroArchitectural from '@/components/organisms/Hero/HeroArchitectural';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import SectionHeader from '@/components/molecules/SectionHeader/SectionHeader';
import VerticalEyebrow from '@/components/atoms/VerticalEyebrow/VerticalEyebrow';
import Seal from '@/components/atoms/Seal/Seal';
import NewsletterForm from '@/components/molecules/NewsletterForm/NewsletterForm';

export default function HomeTemplate() {
  const { tweaks } = useTweaks();
  const { heroVariant, density } = tweaks;
  const compact = density === 'compact';
  const featured = MULAN_PRODUCTS.slice(0, 4);

  return (
    <main>
      {heroVariant === 'A' && <HeroEditorial />}
      {heroVariant === 'B' && <HeroSplit />}
      {heroVariant === 'C' && <HeroArchitectural />}

      {/* Marquee */}
      <section className="bg-sumi text-white py-5 overflow-hidden border-b border-slate">
        <div
          className="flex gap-[60px] font-display text-[18px] italic whitespace-nowrap md:text-[22px]"
          style={{ animation: 'mulanMarquee 30s linear infinite' }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="inline-flex gap-[60px]">
              <span>Hecho lento en CDMX</span>
              <span className="text-ash">·</span>
              <span className="font-body">木 · 兰</span>
              <span className="text-ash">·</span>
              <span>Lote 04 — Primavera 26</span>
              <span className="text-ash">·</span>
              <span>Envíos a todo México</span>
              <span className="text-ash">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="px-5 py-16 relative md:px-12 md:pt-[120px] md:pb-20">
        <VerticalEyebrow side="left" top={120}>01 · Categorías</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader eyebrow="Tienda" title="Tres ritmos del día" side="Para moverse · para estar · para presentarse" />
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${compact ? 'gap-3' : 'gap-6'}`}>
            {MULAN_CATEGORIES.map((cat, i) => (
              <Link key={cat.id} href={`/tienda?cat=${cat.id}`} className="no-underline text-inherit block relative">
                <div className="relative mb-4 overflow-hidden">
                  <ImagePlaceholder ratio="4/5" label={cat.label.toUpperCase()} tone={i === 1 ? 'dark' : 'light'} />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display leading-none pointer-events-none select-none text-[160px] md:text-[240px]"
                    style={{
                      color: i === 1 ? '#f7f3eb' : '#111111',
                      opacity: i === 1 ? 0.12 : 0.08,
                    }}
                  >
                    {cat.cjk}
                  </div>
                  <div className={`absolute top-4 left-4 font-mono text-[10px] tracking-[0.22em] ${i === 1 ? 'text-white' : 'text-sumi'}`}>
                    0{i + 1} / 03
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="m-0 font-display text-[28px] font-normal tracking-[-0.01em] md:text-[32px]">{cat.label}</h3>
                    <p className="m-0 mt-1.5 font-body italic text-[14px] text-slate">{cat.blurb}</p>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-stone shrink-0 ml-4">{cat.count} piezas →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial block */}
      <section className="px-5 py-16 relative md:px-12 md:py-20">
        <VerticalEyebrow side="right" top={80}>02 · Materiales</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-6">02 · Materiales</div>
            <h2 className="m-0 font-display text-[40px] leading-[1.02] font-normal tracking-[-0.018em] text-sumi mb-7 md:text-[56px]">
              Algodón, lana,<br /><em className="font-light">lino, seda.</em><br /><span className="text-stone">Nada más.</span>
            </h2>
            <p className="font-body text-[16px] leading-[1.65] text-slate max-w-[460px] mb-5">
              Trabajamos con fibras naturales y un par de sintéticos reciclados. Todo se piensa para durar. Todo se nombra: dónde se hizo, quién lo cortó, en qué lote.
            </p>
            <p className="font-body italic text-[16px] leading-[1.65] text-stone max-w-[460px] mb-9">
              — Si una prenda no envejece con dignidad, no la hacemos.
            </p>
            <a href="/" className="font-mono text-[11px] tracking-[0.28em] uppercase text-sumi no-underline border-b border-sumi pb-1">
              Leer sobre el taller →
            </a>
          </div>
          <div className="relative">
            <ImagePlaceholder ratio="4/5" label="DETALLE TELAR" tone="dark" seal sealChar="兰" />
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
          <SectionHeader eyebrow="Lote actual" title="Lo último del taller" side="Cuatro piezas que nos gusta llevar puestas" count={featured.length} />
          <div className={`grid grid-cols-2 lg:grid-cols-4 ${compact ? 'gap-4' : 'gap-x-6 gap-y-10'}`}>
            {featured.map(p => <ProductCard key={p.id} product={p} density={density} />)}
          </div>
          <div className="text-center mt-14">
            <Link href="/tienda" className="font-mono text-[11px] tracking-[0.28em] uppercase text-sumi no-underline border-b border-sumi pb-1">
              Ver toda la tienda →
            </Link>
          </div>
        </div>
      </section>

      {/* Nosotras */}
      <section className="px-5 py-16 relative md:px-12 md:py-[120px]">
        <VerticalEyebrow side="right" top={120}>04 · Nosotras</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-[1fr_420px] lg:gap-16">
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-6">04 · Nosotras</div>
              <h2 className="m-0 font-display text-[40px] leading-[1.02] font-normal tracking-[-0.018em] text-sumi mb-7 md:text-[56px]">
                Una comunidad.<br /><em className="font-light">Un nombre.</em><br /><span className="text-stone">Una marca.</span>
              </h2>
              <p className="font-body text-[16px] leading-[1.65] text-slate max-w-[520px] mb-5 text-justify">
                Seleccionamos cada prenda pensando en realzar la personalidad y el estilo único de cada mujer. Cada prenda fue elegida pensando en mujeres que hacen lo mismo — que toman lo que son, completamente, y lo usan como fuerza. 
                <br />
                Porque florecer no es convertirte en lo que otros esperan de ti. Es aparecer, exactamente como eres.
              </p>
              <p className="font-body italic text-[16px] leading-[1.65] text-stone max-w-[500px] mb-10">
                — Mulan (花木蘭): magnolia. Florece en invierno, sola, antes de que nadie lo espere.
              </p>
              <div className="flex items-center gap-6 mb-10 font-mono text-[10px] tracking-[0.22em] text-stone">
                <span>2021 · To The Line</span>
                <span className="w-8 h-px bg-ash inline-block" />
                <span>2024 · Mulan Shop</span>
              </div>
              <a href="/nosotras" className="font-mono text-[11px] tracking-[0.28em] uppercase text-sumi no-underline border-b border-sumi pb-1">
                Leer la historia completa →
              </a>
              <div className="mt-14 flex items-center gap-3.5">
                <Seal size={36} char="花" />
                <div>
                  <div className="font-display text-[16px]">Ximena Vargas</div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone">Fundadora · Mulan Shop · CDMX</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImagePlaceholder ratio="3/4" label="XIMENA VARGAS" tone="dark" seal sealChar="花" src="/ximena-vargas.jpg" objectPosition="center top" />
              <div className="absolute -bottom-5 -right-5 bg-paper px-4 py-3 font-mono text-[10px] tracking-[0.18em] text-sumi border border-linen">
                CDMX · DESDE 2021
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-ash/50 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ash/50">
            <div className="py-8 sm:pr-8">
              <div className="font-display text-[56px] leading-none text-ash mb-4">花</div>
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">Fuerza</div>
              <p className="m-0 font-body italic text-[15px] leading-[1.6] text-slate">Lo que alguien lanzó como inseguridad se convirtió en el rasgo más nuestro que tenemos.</p>
            </div>
            <div className="py-8 sm:px-8">
              <div className="font-display text-[56px] leading-none text-ash mb-4">木</div>
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">Feminidad</div>
              <p className="m-0 font-body italic text-[15px] leading-[1.6] text-slate">Prendas pensadas para cada mujer que se mueve, que está y que se presenta completamente.</p>
            </div>
            <div className="py-8 sm:pl-8">
              <div className="font-display text-[56px] leading-none text-ash mb-4">兰</div>
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">Intención</div>
              <p className="m-0 font-body italic text-[15px] leading-[1.6] text-slate">Cada pieza elegida con propósito: para que quien la lleve aparezca exactamente como es.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-5 py-16 bg-linen relative overflow-hidden md:px-12 md:py-[120px]">
        <div className="absolute top-1/2 -translate-y-1/2 -right-20 font-display leading-[0.85] text-ash opacity-35 pointer-events-none font-normal text-[280px] md:text-[520px]">
          木兰
        </div>
        <div className="max-w-[900px] mx-auto relative">
          <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-6">Filosofía · 05</div>
          <blockquote className="m-0 font-display text-[32px] leading-[1.05] font-light tracking-[-0.015em] text-sumi md:text-[64px]">
            <em>"</em>Florecer no es convertirte en lo que otros esperan de ti. Es aparecer, exactamente como eres.<em>"</em>
          </blockquote>
          <div className="mt-9 flex items-center gap-3.5">
            <Seal size={36} char="木" />
            <div>
              <div className="font-display text-[16px]">Ximena Vargas</div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone">Fundadora · CDMX</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-5 py-16 text-center md:px-12 md:py-24">
        <div className="max-w-[540px] mx-auto">
          <div className="font-display text-[72px] leading-none text-linen md:text-[96px]">兰</div>
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
