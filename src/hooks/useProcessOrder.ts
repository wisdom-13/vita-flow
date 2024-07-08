import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAddOrder } from './useOrder';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export const useProcessOrder = () => {
  const { user } = useAuth();
  const { cart, removeSelectCart } = useCart();
  const buyProducts = useMemo(() => cart.filter((item) => item.isBuy), [cart]);

  const [searchParams] = useSearchParams();

  const userId = user?.uid;
  const userName = user?.nickname;
  const orderId = searchParams.get('orderId');
  const amount = Number(searchParams.get('amount'));

  const [hasProcessed, setHasProcessed] = useState(false);
  const [isError, setIsError] = useState(false);

  const payment = useMemo(() => {
    return userId && orderId && amount ? { userId, userName, orderId, amount } : null;
  }, [userId, orderId, amount]);

  const { mutate: mutateAddOrder } = useAddOrder();

  useEffect(() => {
    if (!payment || hasProcessed) return;

    if (!buyProducts.length) {
      setIsError(true);
      return
    }

    const processOrder = async () => {
      try {
        await mutateAddOrder({ payment, buyProducts });
        removeSelectCart(cart.filter((item) => item.isBuy || item.isPayment).map((item) => item.id));
      } finally {
        setHasProcessed(true);
      }
    };

    processOrder();
  }, [payment, buyProducts, hasProcessed, mutateAddOrder, removeSelectCart]);

  return { orderId, isError };
};
