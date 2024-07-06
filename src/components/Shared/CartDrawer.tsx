import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import CartList from '@/components/Main/CartList';
import MessageContent from '@/components/Shared/MessageContent';
import { DialogDescription } from '../ui/dialog';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart } = useCart();

  if (!isCartOpen) return


  return (
    <>
      <Drawer open={isCartOpen}>
        <DrawerContent isShowBar={false} className='m-auto w-[600px] h-screen'>
          <DrawerHeader id='cart-header' className='flex justify-between items-center px-6 py-2 border-b h-[50px]'>
            <button onClick={toggleCart}>
              <X />
            </button>
            <DrawerTitle className='font-semibold font-xl cursor-default'>장바구니</DrawerTitle>
            <div className='w-6'></div>
          </DrawerHeader>
          <DialogDescription />
          <div className='flex flex-col gap-y-4 py-2'>
            {cart.length === 0 ? (
              <MessageContent
                content='장바구니에 담긴 비타민이 없어요 💊'
                linkText='비타민 둘러보기'
                to='/vitamins'
                onClick={toggleCart}
              />
            ) : (
              <CartList />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
