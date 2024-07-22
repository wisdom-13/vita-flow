import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLocalStorage, saveLocalStorage } from '@/lib/localStorageHelpers';
import { Cart } from '@/types/types';

interface CartContextType {
  cart: Cart[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addCart: (item: Cart) => void;
  removeCart: (id: string) => void;
  removeSelectCart: (ids: string[]) => void;
  updateCartQuantity: (id: string, newQuantity: number) => void;
  updateCartIsBuy: (ids: string[], isBuy: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart[]>(() => getLocalStorage('cart') || []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    saveLocalStorage('cart', cart);
  }, [cart]);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const addCart = (item: Cart) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.productId === item.productId && !cartItem.isPayment);
      if (existingItem && !item.isPayment) {
        return prevCart.map(cartItem => {
          return cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        }
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

  const updateCartIsBuy = (ids: string[], isBuy: boolean) => {
    setCart((prevCart) => {
      return prevCart.map(cartItem =>
        ids.includes(cartItem.id)
          ? { ...cartItem, isBuy }
          : { ...cartItem, isBuy: !isBuy }
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
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      toggleCart,
      addCart,
      removeCart,
      removeSelectCart,
      updateCartQuantity,
      updateCartIsBuy,
      clearCart
    }}>
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
