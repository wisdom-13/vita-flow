import { OrderStatus } from '@/types/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useOrders } from '@/hooks/useOrder';
import { useOrderStatus } from '@/hooks/useOrderStatus';
import OrderList from '@/components/Admin/OrderList';

const OrderContent = () => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | undefined>('주문 완료');
  const { data: orders } = useOrders();
  const { statuses, statusCount } = useOrderStatus(orders);

  if (!statusCount) return

  return (
    <>
      <div className='flex items-center gap-x-6 my-4'>
        {statuses.map((status) => (
          <div
            key={status}
            onClick={() => setSelectedStatus(status as OrderStatus)}
            className={cn('py-2 cursor-pointer border-b-2 border-white',
              selectedStatus == status && 'border-primary'
            )}
          >
            {status}
            <span className='pl-1 font-semibold text-primary'>{statusCount[status as keyof typeof statusCount]}</span>
          </div>
        ))}
      </div>

      <OrderList selectedStatus={selectedStatus} orders={orders?.filter((item) => item.status === selectedStatus)} />
    </>
  );
}

export default OrderContent;