const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mulanshopmx/',
    icon: (
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@mulanshop7',
    icon: (
      <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

import Link from 'next/link';

type ColItem = string | { label: string; href: string };

export default function Footer() {
  const cols: { title: string; items: ColItem[] }[] = [
    {
      title: 'Tienda',
      items: [
        { label: 'Deportivo',      href: '/tienda?cat=deportivo' },
        { label: 'Playa',          href: '/tienda?cat=playa' },
        { label: 'Vestidos & Sets', href: '/tienda?cat=vestidos-sets' },
        { label: 'Piezas únicas',  href: '/tienda?cat=sale' },
      ],
    },
    {
      title: 'Casa',
      items: [
        { label: 'Sobre nosotras', href: '/nosotras' },
      ],
    },
    {
      title: 'Ayuda',
      items: [
        { label: 'Términos y condiciones', href: '/aviso-de-privacidad' },
        { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
      ],
    },
  ];

  return (
    <footer className="bg-sumi text-linen px-5 pt-16 pb-8 mt-24 md:px-12 md:pt-20">
      <div className="grid grid-cols-2 gap-10 mb-14 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-[56px] leading-[0.95] font-normal tracking-[-0.02em] text-white mb-4 md:text-[64px]">
            Mulan Shop
          </div>
          <div className="font-body text-[14px] text-ash max-w-xs mb-6 align-justify">
            Una marca pequeña, hecha en México. Elegimos prendas que se convierten en tus favoritas, las que buscas primero, las que te salvan, las que repites. Por que te hacen sentir increible
          </div>
          <div className="flex gap-4">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ash hover:text-linen transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ash mb-4">
              {col.title}
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 font-body text-[13.5px] text-linen">
              {col.items.map((item) => {
                if (typeof item === 'string') {
                  return <li key={item}>{item}</li>;
                }
                return (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-ash transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                );
              })}
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
