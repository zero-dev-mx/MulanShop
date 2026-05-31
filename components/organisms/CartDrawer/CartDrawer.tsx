'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { useCart } from '@/context/CartContext';
import { formatMXN } from '@/lib/products';
import type { ShopifyCart } from '@/lib/shopify';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, checkoutUrl, loading } = useCart();
  const lines: ShopifyCart['lines']['edges'] = cart?.lines.edges ?? [];
  const isEmpty = lines.length === 0;

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-sumi/40 z-[100]"
        style={{ animation: 'mulanFade .25s ease' }}
      />
      <aside
        className="fixed top-0 right-0 bottom-0 w-[460px] max-w-[94vw] bg-paper z-[101] px-7 py-8 flex flex-col sm:px-9"
        style={{
          animation: 'mulanSlide .3s cubic-bezier(.2,.7,.3,1)',
          boxShadow: '-20px 0 60px rgba(17,17,17,0.12)',
        }}
      >
        <div className="flex justify-between items-center mb-7">
          <div>
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone">Bolsa</div>
            <div className="font-display text-[32px] font-normal">
              {lines.length} pieza{lines.length === 1 ? '' : 's'}
            </div>
          </div>
          <button
            onClick={closeCart}
            className="bg-transparent border-0 cursor-pointer font-mono text-[10px] tracking-[0.22em] uppercase text-slate"
          >
            Cerrar ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-5">
          {isEmpty && (
            <div className="font-body italic text-stone text-[15px] py-10 text-center">
              Tu bolsa está vacía.<br />
              <Link
                href="/tienda"
                onClick={closeCart}
                className="text-sumi mt-3 inline-block font-mono text-[10px] tracking-[0.22em] uppercase not-italic no-underline"
              >
                Ver tienda →
              </Link>
            </div>
          )}
          {lines.map(({ node: line }) => (
            <div key={line.id} className="grid grid-cols-[72px_1fr_auto] gap-3 pb-5 border-b border-linen sm:grid-cols-[90px_1fr_auto] sm:gap-3.5">
              <div className="bg-linen aspect-[3/4] relative overflow-hidden">
                {line.merchandise.image && (
                  <Image
                    src={line.merchandise.image.url}
                    alt={line.merchandise.product.title}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 18%' }}
                  />
                )}
              </div>
              <div>
                <div className="font-display text-[16px] mb-1">{line.merchandise.product.title}</div>
                <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-stone mb-2">
                  Talla {line.merchandise.title}
                </div>
                <button
                  onClick={() => removeFromCart(line.id)}
                  disabled={loading}
                  className="bg-transparent border-0 cursor-pointer p-0 font-mono text-[9.5px] tracking-[0.18em] uppercase text-slate underline disabled:opacity-40"
                >
                  Quitar
                </button>
              </div>
              <div className="font-mono text-[11px] tracking-[0.06em]">
                {formatMXN(parseFloat(line.merchandise.price.amount) * line.quantity)}
              </div>
            </div>
          ))}
        </div>

        {!isEmpty && (
          <div className="pt-5 border-t border-ash">
            <div className="flex justify-between mb-1 font-body text-[14px]">
              <span>Subtotal</span>
              <span>{formatMXN(cart!.cost.totalAmount.amount)}</span>
            </div>
            <div className="font-mono text-[9.5px] tracking-[0.12em] text-stone mb-4">
              Envío calculado al pagar · MX gratis arriba de $1,500
            </div>
            <Button
              full
              size="lg"
              disabled={loading || !checkoutUrl}
              onClick={() => { if (checkoutUrl) window.location.href = checkoutUrl; }}
            >
              {loading ? 'Actualizando...' : 'Ir a pagar →'}
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
