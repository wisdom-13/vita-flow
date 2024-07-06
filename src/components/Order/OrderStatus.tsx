import { Order, OrderStatus as OrderStatusType } from '@/types/types';
import { useEffect, useState } from 'react';

interface OrderStatusProps {
  orders: Order[];
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orders }) => {
  const statuses: OrderStatusType[] = ['주문 완료', '발송 대기', '발송 시작', '주문 취소'];

  const initStatusCount: Record<OrderStatusType, number> = statuses.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {} as Record<OrderStatusType, number>);

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

  return (
    <div className='flex justify-around items-center my-4'>
      {statuses.map((status) => (
        <div key={status} className='flex flex-col items-center'>
          <div className='p-3 text-3xl'>{statusCount[status]}</div>
          <span className='text-muted-foreground'>{status}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
