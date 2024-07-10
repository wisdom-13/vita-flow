import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import CartList from '@/components/Main/CartList';
import { DialogDescription } from '@/components/ui/dialog';

const CartDrawer = () => {
  const { isCartOpen, toggleCart } = useCart();

  if (!isCartOpen) return

  return (
    <>
      <Drawer open={isCartOpen}>
        <DrawerContent isShowBar={false} className='m-auto max-w-[600px] h-[calc(100vh-80px)] md:h-screen'>
          <DrawerHeader id='cart-header' className='flex justify-between items-center px-6 py-2 border-b h-[50px]'>
            <button onClick={toggleCart}>
              <X />
            </button>
            <DrawerTitle className='font-semibold font-xl cursor-default'>장바구니</DrawerTitle>
            <div className='w-6'></div>
          </DrawerHeader>
          <DialogDescription />
          <div className='flex flex-col gap-y-4 py-2'>
            <CartList />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
