'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logotype from '@/components/atoms/Logotype/Logotype';
import { useCart } from '@/context/CartContext';
import { useTweaks } from '@/context/TweaksContext';

export default function Header() {
  const { cart, openCart } = useCart();
  const { tweaks } = useTweaks();
  const cartCount = cart?.lines.edges.length ?? 0;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchQuery('');
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  }

  const cartBadge = (size: number) => (
    <span className={`inline-flex items-center justify-center min-w-[${size === 18 ? '18px' : '16px'}] h-[${size === 18 ? '18px' : '16px'}] px-[5px] text-[9px] tracking-normal ${
      cartCount > 0 ? 'bg-sumi text-paper' : 'text-slate border border-ash'
    }`}>
      {cartCount}
    </span>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-linen bg-bg/95 backdrop-blur">
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center px-12 py-[18px]">
        <nav className="flex gap-7 font-body text-[10.5px] tracking-[0.22em] uppercase text-slate">
          <Link href="/tienda?cat=deportivo" className="text-slate no-underline hover:text-sumi transition-colors">Deportivo</Link>
          <Link href="/tienda?cat=playa"     className="text-slate no-underline hover:text-sumi transition-colors">Playa</Link>
          <Link href="/tienda?cat=vestidos-sets"  className="text-slate no-underline hover:text-sumi transition-colors">Vestidos &amp; Sets</Link>
          <Link href="/nosotras"            className="text-slate no-underline hover:text-sumi transition-colors">Nosotras</Link>
        </nav>

        <div className="flex justify-center">
          <Link href="/" className="no-underline">
            <Logotype variant={tweaks.logoVariant} size={22} />
          </Link>
        </div>

        <nav className="flex gap-6 justify-end items-baseline font-body text-[10.5px] tracking-[0.22em] uppercase text-slate">
          <span className="cursor-default">ES · MX</span>
          <button
            onClick={() => setSearchOpen(v => !v)}
            className={`bg-transparent border-0 cursor-pointer p-0 font-body text-[10.5px] tracking-[0.22em] uppercase transition-colors ${searchOpen ? 'text-sumi' : 'text-slate hover:text-sumi'}`}
          >
            Buscar
          </button>
          <button
            onClick={openCart}
            className="bg-transparent border-0 cursor-pointer p-0 inline-flex gap-2 items-baseline font-body text-[10.5px] tracking-[0.22em] uppercase text-slate hover:text-sumi transition-colors"
          >
            Bolsa
            <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-[5px] text-[9px] tracking-normal ${
              cartCount > 0 ? 'bg-sumi text-paper' : 'text-slate border border-ash'
            }`}>
              {cartCount}
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-5 py-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-transparent border-0 cursor-pointer p-0 font-body text-[10px] tracking-[0.22em] uppercase text-slate w-16 text-left"
        >
          {mobileOpen ? '× Cerrar' : '≡ Menú'}
        </button>

        <Link href="/" className="no-underline">
          <Logotype variant={tweaks.logoVariant} size={20} />
        </Link>

        <button
          onClick={openCart}
          className="bg-transparent border-0 cursor-pointer p-0 inline-flex gap-1.5 items-baseline font-body text-[10px] tracking-[0.22em] uppercase text-slate w-16 justify-end"
        >
          Bolsa
          <span className={`inline-flex items-center justify-center min-w-[16px] h-[16px] px-[4px] text-[8px] tracking-normal ${
            cartCount > 0 ? 'bg-sumi text-paper' : 'text-slate border border-ash'
          }`}>
            {cartCount}
          </span>
        </button>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <form
          onSubmit={handleSearchSubmit}
          className="border-t border-linen bg-bg/98 px-5 py-3 flex items-center gap-4 md:px-12"
        >
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 bg-transparent border-0 border-b border-sumi outline-none font-body text-[11px] tracking-[0.18em] uppercase text-sumi placeholder:text-stone pb-1 min-w-0"
          />
          <button
            type="submit"
            className="bg-transparent border-0 cursor-pointer p-0 font-body text-[10.5px] tracking-[0.22em] uppercase text-sumi hover:opacity-60 transition-opacity shrink-0"
          >
            Ir →
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="bg-transparent border-0 cursor-pointer p-0 font-body text-[10.5px] tracking-[0.22em] uppercase text-stone hover:text-sumi transition-colors shrink-0"
          >
            × Cerrar
          </button>
        </form>
      )}

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-linen px-5 pb-6 pt-2 flex flex-col bg-bg/98">
          {[
            { href: '/tienda?cat=deportivo', label: 'Deportivo' },
            { href: '/tienda?cat=playa',     label: 'Playa' },
            { href: '/tienda?cat=vestidos-sets',  label: 'Vestidos & Sets' },
            { href: '/nosotras',             label: 'Nosotras' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="no-underline text-slate font-body text-[11px] tracking-[0.22em] uppercase py-4 border-b border-linen block"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/buscar"
            onClick={() => setMobileOpen(false)}
            className="no-underline text-slate font-body text-[11px] tracking-[0.22em] uppercase py-4 border-b border-linen block"
          >
            Buscar
          </Link>
          <span className="font-body text-[11px] tracking-[0.22em] uppercase text-stone pt-4">ES · MX</span>
        </div>
      )}
    </header>
  );
}
