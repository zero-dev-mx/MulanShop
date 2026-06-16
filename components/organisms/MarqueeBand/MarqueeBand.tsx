export default function MarqueeBand() {
  return (
    <section className="bg-sumi text-white py-5 overflow-hidden border-b border-slate">
      <div
        className="flex gap-[60px] font-display text-[18px] italic whitespace-nowrap md:text-[22px]"
        style={{ animation: 'mulanMarquee 30s linear infinite' }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex gap-[60px]">
            <span>Hecho lento en CDMX</span>
            <span className="text-ash">·</span>
            <span className="font-body">M · S</span>
            <span className="text-ash">·</span>
            <span>Lote 04 — Primavera 26</span>
            <span className="text-ash">·</span>
            <span>Envíos a todo México</span>
            <span className="text-ash">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
