import Image from 'next/image';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';

const items = [
  { lbl: 'JUMPSUIT · 01', t: 'light' as const, src: '/products/jumpsuit-oliva.jpg' },
  { lbl: 'SET · 02',      t: 'dark'  as const, src: '/products/set-piedra.jpg' },
  { lbl: 'VESTIDO · 09',  t: 'light' as const },
];

export default function HeroArchitectural() {
  return (
    <section className="relative min-h-[92vh] px-5 pt-10 pb-0 overflow-hidden md:px-12">
      {/* CDMX skyline — full-bleed backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/products/hero-image.jpg"
          alt="Ciudad de México"
          fill
          priority
          sizes="100vw"
          quality={90}
          style={{
            objectFit: 'cover',
            objectPosition: 'center 38%',
            opacity: 0.95,
            filter: 'saturate(0.78) contrast(0.98)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'var(--mulan-bg, #FFFFFF)', opacity: 0.24 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--mulan-bg, #FFFFFF) 0%, transparent 20%, transparent 80%, var(--mulan-bg, #FFFFFF) 100%)' }} />
      </div>

      <div className="hidden md:block absolute top-[18%] right-12 font-mono text-[11px] tracking-[0.35em] uppercase text-stone [writing-mode:vertical-rl] [text-orientation:mixed]">
        SS26 · Lote 04 · Primavera / Verano · 12 piezas
      </div>

      <div className="flex justify-between items-baseline relative z-[1] pt-8">
        <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone">Nuevo · Lote 04</div>
        <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone">26 · 05 · 2026</div>
      </div>


      <div className="absolute bottom-8 left-5 right-5 md:left-12 md:right-12 flex flex-col gap-4">
        <p className="m-0 font-body italic text-[16px] leading-[1.6] text-black">
          Doce piezas, doce nombres, doce historias. Cuando se acaben, se acaban.
        </p>
        <div className="grid grid-cols-3 gap-3 md:gap-6">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2 items-end md:gap-3.5">
            <div className="w-14 shrink-0 md:w-[88px]">
              <ImagePlaceholder ratio="3/4" label={it.lbl} tone={it.t} src={it.src ?? null} />
            </div>
            <div className="pb-1.5 hidden sm:block">
              <div className="font-display text-[15px] leading-[1.1] md:text-[17px]">Pieza 0{i * 4 + 2}</div>
              <div className="font-mono text-[9.5px] tracking-[0.18em] text-stone mt-[3px]">
                {it.lbl.split(' · ')[0]}
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
