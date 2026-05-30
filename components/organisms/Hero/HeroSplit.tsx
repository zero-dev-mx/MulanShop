import Link from 'next/link';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';

export default function HeroSplit() {
  return (
    <section className="relative min-h-[82vh] grid grid-cols-1 md:grid-cols-3 border-b border-linen">
      <div className="hidden md:block relative">
        <ImagePlaceholder ratio="auto" label="01 · JUMPSUIT OLIVA" src="/products/jumpsuit-oliva.jpg">
          <div
            className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.22em] text-white"
            style={{ mixBlendMode: 'difference' }}
          >
            01 / 02
          </div>
        </ImagePlaceholder>
      </div>

      <div className="px-8 py-16 flex flex-col justify-center items-center text-center border-linen md:border-l md:border-r">
        <div className="font-display text-[72px] leading-none text-sumi mb-4 font-normal md:text-[96px]">木兰</div>
        <div className="font-mono text-[10.5px] tracking-[0.3em] uppercase text-stone mb-8">
          Mu · Lán · Magnolia
        </div>
        <h1 className="m-0 font-display text-[clamp(48px,5.5vw,88px)] leading-[0.98] font-normal tracking-[-0.02em] text-sumi">
          Una marca<br /><em className="font-light">pequeña</em><br />de México.
        </h1>
        <p className="mt-8 max-w-[360px] font-body text-[15.5px] leading-[1.6] text-slate italic">
          Ropa cortada a mano, hecha en lotes cortos, vendida hasta que se acaba.
        </p>
        <Link href="/tienda" className="mt-9 bg-sumi text-paper px-[26px] py-4 font-mono text-[10.5px] tracking-[0.28em] uppercase no-underline">
          Entrar a la tienda →
        </Link>
      </div>

      <div className="hidden md:block relative">
        <ImagePlaceholder ratio="auto" label="02 · SET NEGRO" tone="dark" src="/products/set-negro.jpg">
          <div className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.22em] text-white">02 / 02</div>
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 font-display text-[220px] leading-[0.9] text-white opacity-35 font-normal"
            style={{ mixBlendMode: 'overlay' }}
          >
            兰
          </div>
        </ImagePlaceholder>
      </div>
    </section>
  );
}
