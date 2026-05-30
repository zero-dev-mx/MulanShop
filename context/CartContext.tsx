'use client';

import { createContext, useContext, useState } from 'react';
import type { CartItem } from '@/lib/products';

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function addToCart(item: CartItem) {
    setItems(prev => [...prev, item]);
    setIsOpen(true);
  }

  function removeFromCart(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <CartContext.Provider value={{ items, isOpen, addToCart, removeFromCart, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false) }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
