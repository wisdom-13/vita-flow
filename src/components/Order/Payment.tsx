import PriceSection from '@/components/Main/PriceSection';
import OrderItem from '@/components/Order/OrderItem';
import { Button } from '@/components/ui/button';
import { usePayment } from '@/hooks/usePayment';
import { Cart, User } from '@/types/types';

interface Payment {
  user: User;
  byProduct: Cart[];
}

const Payment = ({ user, byProduct }: Payment) => {
  const totalPrice = byProduct.reduce((acc, cur) => acc + cur.price, 0);
  const deliveryPrice = (totalPrice == 0) ? 0 : (totalPrice >= 50000) ? 0 : 3000;
  const amount = totalPrice + deliveryPrice;
  const orderName = `${byProduct[0].name} ${byProduct.length > 1 && `외 ${byProduct.length - 1}건`}`

  const { payment } = usePayment({ amount, orderName, customerName: (user.nickname) ? user.nickname : user.uid });

  return (
    <>
      <div className='relative flex flex-col gap-y-4 bg-muted'>
        <div className='bg-white p-6'>
          <h3 className='mb-3 font-semibold text-xl'>주문상품 <span className='text-primary'>{byProduct.length}</span></h3>
          <div className='flex flex-col gap-y-8'>
            {byProduct.map((item) => (
              <OrderItem key={item.id} product={item} />
            ))}
          </div>
        </div>
        <PriceSection totalPrice={totalPrice} deliveryPrice={deliveryPrice} />
      </div>
      <div className='right-0 bottom-0 left-0 z-[9999] fixed bg-white m-auto px-6 py-4 border-t max-w-[600px]'>
        <Button size='lg' className='w-full' onClick={payment}>
          {(amount).toLocaleString()}원 결제하기
        </Button>
      </div>
    </>
  );
}

export default Payment;