import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';

const items = [
  { lbl: 'JUMPSUIT · 01', t: 'light' as const, src: '/products/jumpsuit-oliva.jpg' },
  { lbl: 'SET · 02',      t: 'dark'  as const, src: '/products/set-piedra.jpg' },
  { lbl: 'VESTIDO · 09',  t: 'light' as const },
];

export default function HeroArchitectural() {
  return (
    <section className="relative min-h-[92vh] px-5 pt-10 pb-0 overflow-hidden md:px-12">
      <div className="hidden md:block absolute top-[8%] left-1/2 -translate-x-1/2 font-display text-[640px] leading-[0.85] text-linen opacity-55 font-normal pointer-events-none select-none whitespace-nowrap">
        木兰
      </div>

      <div className="hidden md:block absolute top-[18%] right-12 font-mono text-[11px] tracking-[0.35em] uppercase text-stone [writing-mode:vertical-rl] [text-orientation:mixed]">
        SS26 · Lote 04 · Primavera / Verano · 12 piezas
      </div>

      <div className="flex justify-between items-baseline relative z-[1] pt-8">
        <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone">Nuevo · Lote 04</div>
        <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone">26 · 05 · 2026</div>
      </div>

      <div className="text-center pt-[10vh] relative z-[1] md:pt-[14vh]">
        <h1 className="m-0 font-display text-[clamp(64px,12vw,220px)] leading-[0.9] font-normal tracking-[-0.03em] text-sumi">
          Hecho<br />
          <em className="font-light italic">despacio,</em><br />
          hecho a mano.
        </h1>
        <p className="mt-10 max-w-[440px] mx-auto font-body text-[16px] leading-[1.6] text-slate italic">
          Doce piezas, doce nombres, doce historias.<br />Cuando se acaben, se acaban.
        </p>
      </div>

      <div className="absolute bottom-8 left-5 right-5 grid grid-cols-3 gap-3 md:left-12 md:right-12 md:gap-6">
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
    </section>
  );
}
