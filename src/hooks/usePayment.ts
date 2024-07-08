import { updateProductQuantity } from '@/services/firebaseService';
import { Cart, Product } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { toast } from 'sonner';

export const usePayment = (customerName: string) => {
  const clientKey = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY;
  const originUrl = import.meta.env.VITE_ORIGIN_URL;

  const updateStock = useMutation({
    mutationFn: async ({ cartItems }: { cartItems: (Cart & Product)[] }) => {
      await Promise.all(cartItems.map(item => updateProductQuantity(item.productId, item.quantity)));
      return 1
    },
    onError: (error) => {
      // todo: updateProductQuantity -> 수량 0일 경우 오류 처리
      console.log(error)
      toast.error('결제 정보를 처리하는 중 문제가 발생했습니다.');
    },
    onSuccess: (_, variables) => {
      const buyProducts = variables.cartItems;

      const totalPrice = buyProducts.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
      const deliveryPrice = (totalPrice == 0) ? 0 : (totalPrice >= 50000) ? 0 : 3000;

      const orderData = {
        orderId: [Date.now().toString(36), Math.random().toString(36).slice(2, 5)].join(''),
        amount: totalPrice + deliveryPrice,
        orderName: `${buyProducts[0].name} ${buyProducts.length > 1 && `외 ${buyProducts.length - 1}건`}`,
        customerName,
      }

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
          });
      });
    },
  });

  const payment = (cartItems: (Cart & Product)[]) => {
    updateStock.mutate({ cartItems });
  };

  return { payment, updateStock };
}
