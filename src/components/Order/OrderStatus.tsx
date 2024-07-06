import { useOrderStatus } from '@/hooks/useOrderStatus';
import { Order } from '@/types/types';

interface OrderStatusProps {
  orders: Order[];
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orders }) => {
  const { statuses, statusCount } = useOrderStatus(orders);

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
