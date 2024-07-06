import { Order } from '@/types/types';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import OrderItem from '@/components/Order/OrderItem';
import DialogConfirm from '../Shared/DialogConfirm';
import { useUpdateOrder } from '@/hooks/useOrder';
import { toast } from 'sonner';

interface OrderBoxProps {
  order: Order;
}

const OrderBox = ({ order }: OrderBoxProps) => {
  const { mutate } = useUpdateOrder();

  const handleCancel = () => {
    mutate({
      orderId: order.orderId,
      status: '주문 취소'
    })
    toast.info('주문을 취소했습니다.')
  }

  return (
    <div key={order.orderId} className='flex flex-col gap-y-4'>
      <h3 className='font-semibold'>{formatDate(order.createAt)}
        {order.status == '주문 취소' ? (
          <span className='pl-2 text-muted-foreground'>{order.status} {order.cancelAt && `(${formatDate(order.cancelAt)})`}</span>
        ) : (
          <span className='pl-2 text-primary'>{order.status}</span>
        )}
      </h3>
      {order.items.map((item) => (
        <OrderItem key={item.id} product={item} />
      ))}
      {order.status == '주문 완료' && (
        <DialogConfirm
          title='주문취소'
          content='선택한 주문을 취소하시겠습니까?'
          buttonText='확인'
          buttonOnClick={handleCancel}
        >
          <Button variant='outline' className='w-full'>주문취소</Button>
        </DialogConfirm>
      )}
    </div>
  );
}

export default OrderBox;