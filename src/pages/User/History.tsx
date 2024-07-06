import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/hooks/useOrder';
import { Skeleton } from '@/components/ui/skeleton';
import MessageContent from '@/components/Shared/MessageContent';
import OrderList from '@/components/Order/OrderList';
import OrderStatus from '@/components/Order/OrderStatus';


const HistoryPage = () => {
  const { user } = useAuth();
  const { data: orders, isLoading, isError } = useOrders(user?.uid);

  if (isError) {
    return <MessageContent content='주문정보를 불러오는 중 문제가 발생했어요 😢' />
  }

  if (!orders || isLoading) {
    return (
      <div className='relative flex flex-col gap-y-6 p-6'>
        <Skeleton className='mb-10 rounded-md w-full h-24' />
        <Skeleton className='rounded-md w-full h-44' />
        <Skeleton className='rounded-md w-full h-44' />
      </div>
    )
  }

  return (
    <div className='relative flex flex-col gap-y-6 p-6'>
      <OrderStatus orders={orders} />
      <OrderList orders={orders} />
    </div>
  );
}

export default HistoryPage;