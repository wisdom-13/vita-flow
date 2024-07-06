import { Order, OrderStatus } from '@/types/types';
import { useMemo } from 'react';

export const useOrderStatus = (orders?: Order[]) => {
  const statuses = useMemo(() => ['주문 완료', '발송 대기', '발송 시작', '주문 취소'], []);

  const statusCount = useMemo(() => {
    return orders?.reduce((acc, order) => {
      if (statuses.includes(order.status as OrderStatus)) {
        acc[order.status as OrderStatus] = (acc[order.status as OrderStatus] || 0) + 1;
      }
      return acc;
    }, statuses.reduce((acc, status) => ({ ...acc, [status]: 0 }), {} as Record<OrderStatus, number>));
  }, [orders, statuses]);

  return { statuses, statusCount };
}
