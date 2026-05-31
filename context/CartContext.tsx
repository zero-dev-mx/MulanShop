'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { cartCreate, cartLinesAdd, cartLinesRemove } from '@/lib/queries';
import type { ShopifyCart } from '@/lib/shopify';

interface CartContextValue {
  cart: ShopifyCart | null;
  isOpen: boolean;
  loading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setLoading(true);
    try {
      let updated: ShopifyCart;
      if (!cart) {
        updated = await cartCreate(variantId, quantity);
      } else {
        updated = await cartLinesAdd(cart.id, variantId, quantity);
      }
      setCart(updated);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (lineId: string) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updated = await cartLinesRemove(cart.id, [lineId]);
      setCart(updated);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      loading,
      addToCart,
      removeFromCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      checkoutUrl: cart?.checkoutUrl ?? null,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
