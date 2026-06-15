import Link from 'next/link';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';

export default function HeroEditorial() {
  return (
    <section className="relative min-h-[88vh] grid grid-cols-1 md:grid-cols-[1fr_1.4fr] overflow-hidden">
      <div className="px-5 py-12 flex flex-col justify-between relative md:px-12 md:pt-16 md:pb-12">
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-stone mb-8">
            Lote 04 · Primavera / Verano 26
          </div>
          <h1 className="m-0 font-display text-[clamp(64px,9vw,156px)] leading-[0.92] font-normal tracking-[-0.025em] text-sumi">
            Vestir<br /><em className="font-light">despacio.</em>
          </h1>
          <p className="mt-9 max-w-[380px] font-body text-[16.5px] leading-[1.6] text-slate">
            Doce piezas, cortadas a mano en Ciudad de México. Hechas para llevarse durante años. Hechas para envejecer bien.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-10 md:mt-0">
          <Link href="/tienda" className="bg-sumi text-paper px-7 py-4 font-mono text-[11px] tracking-[0.28em] uppercase no-underline">
            Ver el lote 04 →
          </Link>
          <Link href="/" className="font-body italic text-[14px] text-slate no-underline border-b border-ash pb-0.5">
            Conoce el taller
          </Link>
        </div>
      </div>

      <div className="relative bg-linen min-h-[70vw] md:min-h-0">
        <ImagePlaceholder ratio="auto" label="HERO · LOTE 04" tone="dark" src="/products/jumpsuit-oliva.jpg" objectPosition="center 8%">
          <div
            className="absolute bottom-10 right-10 font-display leading-[0.85] text-white opacity-35 font-normal pointer-events-none select-none text-[200px] md:text-[380px]"
            style={{ mixBlendMode: 'overlay' }}
          >
            M
          </div>
          <div className="absolute top-8 right-8 flex items-center gap-2.5 text-white">
            <div className="w-10 h-10 bg-seal flex items-center justify-center font-display text-[22px] text-white">S</div>
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase">Sello · 04</div>
          </div>
          <div className="absolute bottom-8 left-8 text-white font-body italic text-[14px] max-w-[280px]">
            Set Termal Piedra · chaqueta + legging<br />
            <span className="font-mono text-[10px] tracking-[0.2em] not-italic">FOTO: A. NAVARRO · CDMX 26</span>
          </div>
        </ImagePlaceholder>
      </div>
    </section>
  );
}
