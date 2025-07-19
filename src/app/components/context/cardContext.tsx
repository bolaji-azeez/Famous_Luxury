
import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <CartContext.Provider value={{ isCartModalOpen, setIsCartModalOpen, cartItemCount, setCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext) as CartContextType;


interface CartContextType {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

