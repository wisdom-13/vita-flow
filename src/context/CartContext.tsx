import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLocalStorage, saveLocalStorage } from '@/lib/localStorageHelpers';
import { Cart } from '@/types/types';

interface CartContextType {
  cart: Cart[];
  addCart: (item: Cart) => void;
  removeCart: (id: string) => void;
  removeSelectCart: (ids: string[]) => void;
  updateCartQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart[]>(() => getLocalStorage('cart') || []);

  useEffect(() => {
    saveLocalStorage('cart', cart);
  }, [cart]);

  const addCart = (item: Cart) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  const updateCartQuantity = (id: string, newQuantity: number) => {
    setCart((prevCart) => {
      return prevCart.map(cartItem =>
        cartItem.id === id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
    });
  };

  const removeCart = (id: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const removeSelectCart = (ids: string[]) => {
    setCart((prevCart) => prevCart.filter(item => !ids.includes(item.id)));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, removeSelectCart, updateCartQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
