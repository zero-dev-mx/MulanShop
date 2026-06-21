export default function MarqueeBand() {
  return (
    <section className="bg-sumi text-white py-5 overflow-hidden border-b border-slate">
      <div
        className="flex gap-[60px] font-display text-[18px] italic whitespace-nowrap md:text-[22px]"
        style={{ animation: 'mulanMarquee 30s linear infinite' }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex gap-[60px]">
            <span>Recibe en 3-5 días hábiles</span>
            <span className="text-ash">·</span>
            <span className="font-body">Devoluciones fáciles</span>
            <span className="text-ash">·</span>
            <span>Envío gratis desde $1,500</span>
            <span className="text-ash">·</span>
            <span>Envíos a todo México</span>
            <span className="text-ash">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
