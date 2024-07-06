import { Order, OrderStatus } from '@/types/types';
import { useEffect, useState } from 'react';

export const useOrderStatus = (orders: Order[]) => {
  const statuses: OrderStatus[] = ['주문 완료', '발송 대기', '발송 시작', '주문 취소'];

  const initStatusCount: Record<OrderStatus, number> = statuses.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {} as Record<OrderStatus, number>);

  const [statusCount, setStatusCount] = useState(initStatusCount);

  useEffect(() => {
    const countOrdersByStatus = orders.reduce((acc, order) => {
      if (acc[order.status] !== undefined) {
        acc[order.status]++;
      }
      return acc;
    }, { ...initStatusCount });

    setStatusCount(countOrdersByStatus);
  }, [orders]);

  return { statuses, statusCount }
}