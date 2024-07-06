import PriceSection from '@/components/Main/PriceSection';
import OrderItem from '@/components/Order/OrderItem';
import { Button } from '@/components/ui/button';
import { usePayment } from '@/hooks/usePayment';
import { useCartProducts } from '@/hooks/useProducts';
import { Cart, User } from '@/types/types';
import MessageContent from '../Shared/MessageContent';

interface Payment {
  user: User;
  buyCart: Cart[];
}

const Payment = ({ user, buyCart }: Payment) => {
  const { cartProducts, isLoading, isError } = useCartProducts(buyCart);
  const { payment } = usePayment((user.nickname) ? user.nickname : user.uid);

  if (isLoading) return

  if (isError) {
    return <MessageContent content='주문 정보를 불러오는 중 문제가 발생했습니다.' />
  }

  const totalPrice = buyCart.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
  const deliveryPrice = (totalPrice == 0) ? 0 : (totalPrice >= 50000) ? 0 : 3000;

  return (
    <>
      <div className='relative flex flex-col gap-y-4 bg-muted'>
        <div className='bg-white p-6'>
          <h3 className='mb-3 font-semibold text-xl'>주문상품 <span className='text-primary'>{cartProducts.length}</span></h3>
          <div className='flex flex-col gap-y-8'>
            {cartProducts.map((item) => (
              <OrderItem key={item.id} product={item} />
            ))}
          </div>
        </div>
        <PriceSection totalPrice={totalPrice} deliveryPrice={deliveryPrice} />
      </div>
      <div className='right-0 bottom-0 left-0 z-[9999] fixed bg-white m-auto px-6 py-4 border-t max-w-[600px]'>
        <Button size='lg' className='w-full' onClick={() => payment(cartProducts)}>
          {(totalPrice + deliveryPrice).toLocaleString()}원 결제하기
        </Button>
      </div>
    </>
  );
}

export default Payment;