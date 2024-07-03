
import CartList from '@/components/Main/CartList';
import ErrorContext from '@/components/Shared/ErrorContext';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <ErrorContext title='장바구니에 담긴 비타민이 없어요 💊' linkText='비타민 둘러보기' to='/vitamins' />
  }

  return (
    <>
      <div className='relative flex flex-col gap-y-6 px-6 p-6'>
        <CartList />
      </div>
    </>
  );
}

export default CartPage;