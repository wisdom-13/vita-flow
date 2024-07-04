import { loadTossPayments } from '@tosspayments/payment-sdk';
import uuid from 'react-uuid';
import { toast } from 'sonner';

interface paymentProps {
  amount: number;
  orderName: string;
  customerName: string;
}

export const usePayment = ({ amount, orderName, customerName }: paymentProps) => {
  const clientKey = import.meta.env.VITE_TOSS_PAYMENTS_CLIENT_KEY;
  const originUrl = import.meta.env.VITE_ORIGIN_URL;

  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 5);

  const payment = () => {
    loadTossPayments(clientKey).then(tossPayments => {
      tossPayments.requestPayment('카드', {
        orderId: `${timestamp}${random}`,
        amount: amount,
        orderName: orderName,
        customerName: customerName,
        successUrl: `${originUrl}/orders/success`,
        failUrl: `${originUrl}/orders/fail`,
      })
        .catch(function (error) {
          if (error.code === 'USER_CANCEL') {
            toast.error('결제를 취소했습니다.')
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            toast.error('잘못된 정보입니다.')
          }
        })
    })
  }

  return { payment }
}