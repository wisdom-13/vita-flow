import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Payment from '@/components/Order/Payment';

const PaymentPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();

  if (!user?.nickname) {
    return
  }
  const byProduct = cart.filter((item) => item.isBuy);

  return (
    <>
      <Payment user={user} byProduct={byProduct} />
    </>
  );
}

export default PaymentPage;