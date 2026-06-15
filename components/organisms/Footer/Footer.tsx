export default function Footer() {
  const cols = [
    { title: 'Tienda', items: ['Deportivo', 'Playa', 'Vestidos & Sets', 'Lotes anteriores', 'Regalos'] },
    { title: 'Casa',   items: ['Sobre nosotras', 'Talleres', 'Materiales', 'Diario'] },
    { title: 'Ayuda',  items: ['Envíos', 'Cambios', 'Cuidado', 'Contacto', 'Tallas'] },
  ];

  return (
    <footer className="bg-sumi text-linen px-5 pt-16 pb-8 mt-24 md:px-12 md:pt-20">
      <div className="grid grid-cols-2 gap-10 mb-14 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-[56px] leading-[0.95] font-normal tracking-[-0.02em] text-white mb-4 md:text-[64px]">
            Mulan Shop
          </div>
          <div className="font-body text-[14px] leading-relaxed text-ash max-w-xs">
            Una marca pequeña, hecha en México. Pensada para vestir lento. Cada lote se nombra y se numera.
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ash mb-4">
              {col.title}
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 font-body text-[13.5px] text-linen">
              {col.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate pt-6 flex flex-col gap-2 sm:flex-row sm:justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
        <span>© 2026 MulanShopMX · Hecho en CDMX</span>
        <span>Lote 04 · Primavera 26</span>
      </div>
    </footer>
  );
}
