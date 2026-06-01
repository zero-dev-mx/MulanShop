'use client';

import Link from 'next/link';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import Seal from '@/components/atoms/Seal/Seal';
import VerticalEyebrow from '@/components/atoms/VerticalEyebrow/VerticalEyebrow';

export default function NosotrasTemplate() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-sumi text-white px-5 py-[120px] relative overflow-hidden md:px-12 md:py-[160px]">
        <div className="absolute top-1/2 -translate-y-1/2 -right-16 font-display leading-[0.85] opacity-10 pointer-events-none font-normal select-none text-[260px] md:text-[480px]"
          style={{ fontFamily: 'var(--font-cjk)' }}>
          花木蘭
        </div>
        <div className="max-w-[900px] mx-auto relative">
          <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-ash mb-8">Nosotras · Mulan Shop</div>
          <h1 className="m-0 font-display text-[48px] leading-[1.0] font-normal tracking-[-0.02em] mb-8 md:text-[84px]">
            Una marca que floreció<br />
            <em className="font-light">por una mirada.</em>
          </h1>
          <p className="font-body text-[17px] leading-[1.7] text-ash max-w-[560px]">
            Un rasgo personal. Un nombre lanzado como broma. Una mujer que decidió mirarlo diferente y convertirlo en crecimiento.
          </p>
        </div>
      </section>

      {/* Origin */}
      <section className="px-5 py-16 relative md:px-12 md:py-[120px]">
        <VerticalEyebrow side="left" top={120}>01 · Fundadora</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 gap-12 items-start lg:grid-cols-[1fr_440px] lg:gap-16">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-6">01 · Fundadora</div>
            <h2 className="m-0 font-display text-[36px] leading-[1.04] font-normal tracking-[-0.016em] text-sumi mb-7 md:text-[52px]">
              XIMENA - MULAN.<br /><em className="font-light">Mujer emprendedora, apasionada del crecimiento personal y por supuesto de la moda</em>
            </h2>
            <p className="font-body text-[16px] leading-[1.7] text-slate max-w-[520px] text-justify">
              Mi nombre es Ximena Vargas, orgullosamente mexicana y emprendedora apasionada por la moda, el estilo y el crecimiento personal.
              <br />
              Hoy somos una marca con identidad, comunidad y propósito: acompañar a cada mujer a expresar su esencia a través de su estilo.
            </p>
            <p className="font-body text-[16px] leading-[1.7] text-slate max-w-[520px] text-justify mb-9">
              Emprender no solo ha significado construir una marca, sino crecer. Cada colección, cada persona y cada paso han sido parte de esta historia que sigo construyendo con pasión.
            </p>
            <p className="font-body italic text-[16px] leading-[1.7] text-stone max-w-[520px] mb-9">
              — Mulan (花木蘭): flor de magnolia. Pureza, belleza, fuerza. La capacidad de florecer incluso en las condiciones más adversas.
            </p>
            <p className="font-body text-[16px] leading-[1.7] text-slate max-w-[520px] text-justify">
              La magnolia no espera el momento perfecto. Florece en invierno, sola, sin hojas todavía. Aparece antes de que nadie lo espere. Ximena convirtió lo que alguien lanzó como inseguridad en el rasgo más suyo que tiene. El nombre que nació como broma se volvió símbolo. Y ese símbolo se volvió marca.
            </p>
          </div>
          <div className="relative">
            <ImagePlaceholder ratio="3/4" label="XIMENA VARGAS" tone="dark" seal sealChar="花" src="/ximena-vargas.jpg" objectPosition="center top" />
            <div className="absolute -bottom-5 -right-5 bg-paper px-4 py-3 font-mono text-[10px] tracking-[0.18em] text-sumi border border-linen">
              CDMX · DESDE 2021
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="px-5 py-16 bg-linen relative md:px-12 md:py-[120px]">
        <VerticalEyebrow side="right" top={120}>02 · Origen</VerticalEyebrow>
        <div className="max-w-[900px] mx-auto">
          <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-6">02 · Origen</div>
          <h2 className="m-0 font-display text-[36px] leading-[1.04] font-normal tracking-[-0.016em] text-sumi mb-8 md:text-[52px]">
            Nuestro origen
          </h2>
          <p className="font-body text-[16px] leading-[1.7] text-slate max-w-[520px] text-justify mb-6">
            Una marca que nace del crecimiento personal, la evolución y la pasión por la moda.
          </p>
          <p className="font-body text-[16px] leading-[1.7] text-slate max-w-[520px] text-justify mb-6">
              En 2021 este sueño comenzó bajo el nombre de To The Line, con la ilusión de crear un espacio donde las mujeres pudieran encontrar prendas especiales para sentirse seguras y auténticas.
              <br />En 2024 florece como Mulan Shop, una evolución natural que representa fuerza, feminidad, disciplina y transformación.
          </p>
          <p className="font-body text-[16px] leading-[1.7] text-slate max-w-[520px] text-justify mb-9">
            Seleccionamos cada prenda pensando en realzar la personalidad y el estilo único de cada mujer.
            Creemos en la moda como herramienta de expresión, seguridad y empoderamiento.
            Cada pieza refleja nuestro compromiso con la calidad, el detalle y la experiencia, para que nuestras clientas se sientan especiales en cada ocasión.
          </p>
          {/* Timeline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 mb-14">
            <div className="sm:flex-1">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone mb-2">2021</div>
              <div className="font-display text-[22px] font-normal text-sumi">To The Line</div>
              <div className="font-body italic text-[14px] text-slate mt-1">El primer sueño toma forma</div>
            </div>
            <div className="hidden sm:flex items-center gap-3 px-8">
              <span className="w-12 h-px bg-ash block" />
              <span className="font-display text-[18px] text-ash">→</span>
              <span className="w-12 h-px bg-ash block" />
            </div>
            <div className="sm:flex-1">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone mb-2">2024</div>
              <div className="font-display text-[22px] font-normal text-sumi">Mulan Shop</div>
              <div className="font-body italic text-[14px] text-slate mt-1">Evolución natural, identidad propia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="px-5 py-16 relative md:px-12 md:py-[120px]">
        <VerticalEyebrow side="left" top={120}>03 · Visión</VerticalEyebrow>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <ImagePlaceholder ratio="4/5" label="COLECCIÓN 04" tone="light" seal sealChar="兰" />
          </div>
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-6">03 · Visión</div>
            <h2 className="m-0 font-display text-[36px] leading-[1.04] font-normal tracking-[-0.016em] text-sumi mb-7 md:text-[52px]">
              ¿A dónde<br /><em className="font-light">vamos?</em>
            </h2>
            <p className="font-body text-[16px] leading-[1.7] text-slate max-w-[480px] mb-5 text-justify">
              Mulan Shop no es solo ropa: es una comunidad, es una visión.
            </p>
            <p className="font-body text-[16px] leading-[1.7] text-slate max-w-[480px] mb-5 text-justify">
              Queremos seguir creciendo como una marca que inspire a las mujeres a sentirse seguras y auténticas, ofreciendo piezas cuidadosamente seleccionadas que combinan tendencia, calidad y versatilidad.
            </p>
            <p className="font-body italic text-[16px] leading-[1.7] text-stone max-w-[480px] mb-9">
              — Buscamos crecer con nuestra comunidad, crear nuevas experiencias, y evolucionar junto a cada mujer que forma parte de esta historia.
            </p>
            <Link href="/tienda" className="font-mono text-[11px] tracking-[0.28em] uppercase text-sumi no-underline border-b border-sumi pb-1">
              Explorar la colección →
            </Link>
          </div>
        </div>
      </section>

      {/* Esencia pillars */}
      <section className="px-5 py-16 bg-linen relative md:px-12 md:py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-2">04 · Esencia</div>
          <h2 className="m-0 font-display text-[32px] font-normal tracking-[-0.015em] text-sumi mb-12 md:text-[44px]">Nuestra esencia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ash/50">
            <div className="py-8 sm:pr-10">
              <div className="font-display text-[64px] leading-none text-ash mb-5" style={{ fontFamily: 'var(--font-cjk)' }}>花</div>
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">Fuerza</div>
              <p className="m-0 font-body text-[15px] leading-[1.7] text-slate text-justify">
                Lo que alguien lanzó como inseguridad se convirtió en el rasgo más nuestro que tenemos. Mulan Shop nació del orgullo de cargar una herencia compleja y llevarla con intención.
              </p>
            </div>
            <div className="py-8 sm:px-10">
              <div className="font-display text-[64px] leading-none text-ash mb-5" style={{ fontFamily: 'var(--font-cjk)' }}>木</div>
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">Feminidad</div>
              <p className="m-0 font-body text-[15px] leading-[1.7] text-slate text-justify">
                Seleccionamos cada prenda pensando en realzar la personalidad y el estilo único de cada mujer. Creemos en la moda como herramienta de expresión, seguridad y empoderamiento.
              </p>
            </div>
            <div className="py-8 sm:pl-10">
              <div className="font-display text-[64px] leading-none text-ash mb-5" style={{ fontFamily: 'var(--font-cjk)' }}>兰</div>
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">Intención</div>
              <p className="m-0 font-body text-[15px] leading-[1.7] text-slate text-justify">
                Cada pieza refleja nuestro compromiso con la calidad, el detalle y la experiencia, para que nuestras clientas se sientan especiales en cada ocasión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-sumi text-white px-5 py-[120px] text-center relative overflow-hidden md:px-12 md:py-[160px]">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-display leading-none opacity-[0.06] pointer-events-none select-none text-[320px] md:text-[600px]"
          style={{ fontFamily: 'var(--font-cjk)' }}>
          木兰
        </div>
        <div className="max-w-[800px] mx-auto relative">
          <blockquote className="m-0 font-display text-[28px] leading-[1.1] font-light tracking-[-0.015em] text-white mb-12 md:text-[52px]">
            <em>"</em>Florecer no es convertirte<br />en lo que otros esperan de ti.<br />Es aparecer, exactamente como eres.<em>"</em>
          </blockquote>
          <div className="flex items-center justify-center gap-3.5 mb-14">
            <Seal size={36} char="木" color="#FFFFFF" />
            <div className="text-left">
              <div className="font-display text-[16px] text-white">Ximena Vargas</div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ash">Fundadora · CDMX</div>
            </div>
          </div>
          <Link href="/tienda" className="font-mono text-[11px] tracking-[0.28em] uppercase text-white no-underline border-b border-white/60 pb-1">
            Ver la colección →
          </Link>
        </div>
      </section>

    </main>
  );
}
