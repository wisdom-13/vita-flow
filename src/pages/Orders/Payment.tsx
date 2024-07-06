import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Payment from '@/components/Order/Payment';
import MessageContent from '@/components/Shared/MessageContent';

const PaymentPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();

  const buyCart = cart.filter((item) => item.isBuy);

  if (!user?.nickname || buyCart.length == 0) {
    return <MessageContent content='주문 정보가 없습니다.' />
  }

  return (
    <>
      <Payment user={user} buyCart={buyCart} />
    </>
  );
}

export default PaymentPage;