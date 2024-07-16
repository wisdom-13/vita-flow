import { updateProductQuantity } from '@/services/firebaseService';
import { Cart, Product } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const usePayment = (customerName: string) => {
  const clientKey = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY;
  const originUrl = import.meta.env.VITE_ORIGIN_URL;

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const updateStock = useMutation({
    mutationFn: async ({ cartItems }: { cartItems: (Cart & Product)[] }) => {
      await Promise.all(cartItems.map(item => updateProductQuantity(item.productId, item.quantity)));
      return 1;
    },
    onError: (error) => {
      console.log(error);
      toast.error('결제 정보를 처리하는 중 문제가 발생했습니다.');
    },
    onSuccess: (_, variables) => {
      const buyProducts = variables.cartItems;

      const totalPrice = buyProducts.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
      const deliveryPrice = (totalPrice === 0) ? 0 : (totalPrice >= 50000) ? 0 : 3000;

      const orderData = {
        orderId: [Date.now().toString(36), Math.random().toString(36).slice(2, 5)].join(''),
        amount: totalPrice + deliveryPrice,
        orderName: `${buyProducts[0].name} ${buyProducts.length > 1 ? `외 ${buyProducts.length - 1}건` : ''}`,
        customerName,
      };

      loadTossPayments(clientKey).then(tossPayments => {
        tossPayments.requestPayment('카드', {
          ...orderData,
          successUrl: `${originUrl}/orders/success`,
          failUrl: `${originUrl}/orders/fail`,
        })
          .catch(async (error) => {
            await Promise.all(buyProducts.map(item => updateProductQuantity(item.productId, -item.quantity)));
            if (error.code === 'USER_CANCEL') {
              toast.error('결제를 취소했습니다.');
            } else if (error.code === 'INVALID_CARD_COMPANY') {
              toast.error('잘못된 정보입니다.');
            }
          })
          .finally(() => {
            setIsPaymentProcessing(false);
          });
      });
    },
  });

  const payment = (cartItems: (Cart & Product)[]) => {
    setIsPaymentProcessing(true);
    updateStock.mutate({ cartItems });
  };


  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();

      if (isPaymentProcessing) {
        const buyProducts = updateStock.variables?.cartItems;
        if (buyProducts) {
          await Promise.all(buyProducts.map(item => updateProductQuantity(item.productId, -item.quantity)));
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPaymentProcessing, updateStock]);

  return { payment, updateStock };
};