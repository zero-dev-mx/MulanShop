import Seal from '@/components/atoms/Seal/Seal';

export default function PhilosophySection() {
  return (
    <section className="px-5 py-16 bg-linen relative overflow-hidden md:px-12 md:py-[120px]">
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 font-display leading-[0.85] text-ash opacity-35 pointer-events-none font-normal text-[280px] md:text-[520px]">
        Mulan Shop
      </div>
      <div className="max-w-[900px] mx-auto relative">
        <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-6">Filosofía · 05</div>
        <blockquote className="m-0 font-display text-[32px] leading-[1.05] font-light tracking-[-0.015em] text-sumi md:text-[64px]">
          <em>"</em>Florecer no es convertirte en lo que otros esperan de ti. Es aparecer, exactamente como eres.<em>"</em>
        </blockquote>
        <div className="mt-9 flex items-center gap-3.5">
          <Seal size={36} char="M" />
          <div>
            <div className="font-display text-[16px]">Ximena Vargas</div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone">Fundadora · CDMX</div>
          </div>
        </div>
      </div>
    </section>
  );
}
