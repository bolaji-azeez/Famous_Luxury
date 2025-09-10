"use client";
import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type CartItem = { id: string; name: string; price: number; quantity: number; image?: string };

type CartContextValue = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, qty: number) => void;   // NEW
  cartItemCount: number;                                // NEW
  subtotal: number;                                     // NEW
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) =>
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === item.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], quantity: copy[i].quantity + item.quantity };
        return copy;
      }
      return [...prev, item];
    });

  const updateQuantity = (id: string, qty: number) =>
    setItems((prev) => {
      if (qty <= 0) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, quantity: qty } : x));
    });

  const removeFromCart = (id: string) => setItems((p) => p.filter((x) => x.id !== id));
  const clearCart = () => setItems([]);

  const cartItemCount = useMemo(
    () => items.reduce((n, it) => n + it.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );

  const value: CartContextValue = useMemo(
    () => ({ items, addToCart, removeFromCart, clearCart, updateQuantity, cartItemCount, subtotal }),
    [items, cartItemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
