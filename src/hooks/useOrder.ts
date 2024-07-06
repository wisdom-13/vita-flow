import { fetchOrders, saveOrder, updateStatusOrder } from '@/services/firebaseService';
import { Cart, Order, OrderStatus, Payment } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';


export const useOrders = (userId?: string) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () => fetchOrders(userId),
    staleTime: 1000 * 60,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      { orderId, status }: { orderId: string, status: OrderStatus }
    ) => {
      await updateStatusOrder(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  })
}


export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      { payment, buyProducts }: { payment: Payment, buyProducts: Cart[] }
    ) => {
      const order = {
        orderId: payment.orderId,
        userId: payment.userId,
        totalAmount: payment.amount,
        items: buyProducts.map((item: Cart) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        status: '주문 완료',
        createAt: Timestamp.now(),
      } as Order;

      await saveOrder(order);
      return payment.orderId
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['order', data] });
    }
  });
};

