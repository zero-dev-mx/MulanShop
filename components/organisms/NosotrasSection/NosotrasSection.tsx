import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import VerticalEyebrow from '@/components/atoms/VerticalEyebrow/VerticalEyebrow';
import Seal from '@/components/atoms/Seal/Seal';

const VALUES = [
  { label: 'Fuerza', text: 'Lo que alguien lanzó como inseguridad se convirtió en el rasgo más nuestro que tenemos.' },
  { label: 'Feminidad', text: 'Prendas pensadas para cada mujer que se mueve, que está y que se presenta completamente.' },
  { label: 'Intención', text: 'Cada pieza elegida con propósito: para que quien la lleve aparezca exactamente como es.' },
];

export default function NosotrasSection() {
  return (
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
              — Mulan: magnolia. Florece en invierno, sola, antes de que nadie lo espere.
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
              <Seal size={36} char="X" />
              <div>
                <div className="font-display text-[16px]">Ximena Vargas</div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone">Fundadora · Mulan Shop · CDMX</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <ImagePlaceholder ratio="3/4" label="XIMENA VARGAS" tone="dark" seal sealChar="X" src="/ximena-vargas.jpg" objectPosition="center top" />
            <div className="absolute -bottom-5 -right-5 bg-paper px-4 py-3 font-mono text-[10px] tracking-[0.18em] text-sumi border border-linen">
              CDMX · DESDE 2021
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-ash/50 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ash/50">
          {VALUES.map(({ label, text }, i) => (
            <div key={label} className={`py-8 ${i === 0 ? 'sm:pr-8' : i === 1 ? 'sm:px-8' : 'sm:pl-8'}`}>
              <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-3">{label}</div>
              <p className="m-0 font-body italic text-[15px] leading-[1.6] text-slate">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
