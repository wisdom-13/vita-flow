import { Order } from '@/types/types';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import OrderItem from '@/components/Order/OrderItem';

interface OrderListProps {
  orders: Order[]
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className='flex flex-col gap-y-8 mt-4'>
      {orders.map((order) => (
        <div key={order.orderId} className='flex flex-col gap-y-4'>
          <h3 className='font-semibold'>{formatDate(order.createAt)}
            <span className='pl-2 text-primary'>{order.status}</span>
          </h3>
          {order.items.map((item) => (
            <OrderItem key={item.id} product={item} />
          ))}
          {order.status == '주문 완료' && (
            <Button variant='outline' className='w-full'>주문취소</Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderList;