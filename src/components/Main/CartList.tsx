import { useCart } from '@/context/CartContext';
import useSelection from '@/hooks/useSelection';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import DialogConfirm from '@/components/Shared/DialogConfirm';
import CartItem from '@/components/Main/CartItem';
import { useNavigate } from 'react-router-dom';
import PriceSection from './PriceSection';

const CartList = () => {
  const { cart, removeSelectCart, toggleCart, updateCartIsBuy } = useCart();
  const navigate = useNavigate();

  const {
    selectedItems,
    setSelectedItems,
    toggleItemSelection,
    toggleAllItemSelection
  } = useSelection(cart);

  const handleRemoveSelected = () => {
    removeSelectCart(selectedItems);
    setSelectedItems([]);
  }

  const handleBuy = () => {
    toggleCart();
    updateCartIsBuy(selectedItems, true);
    navigate('/orders/payment');
  }

  const totalPrice = cart.filter((item) => selectedItems.includes(item.id)).reduce((acc, cur) => acc + cur.price, 0);
  const deliveryPrice = (totalPrice == 0) ? 0 : (totalPrice >= 50000) ? 0 : 3000;

  return (
    <>
      <div className='flex justify-start items-center gap-x-2 px-6 text-sm'>
        <div className='flex justify-center items-center pt-1 w-10 text-center'>
          <Checkbox
            checked={selectedItems.length === cart.length}
            onClick={toggleAllItemSelection}
          />
        </div>
        <div>
          전체선택({selectedItems.length}/{cart.length})
        </div>
        <div className='ml-auto'>
          <DialogConfirm
            title='선택 상품 삭제'
            content={`선택한 ${selectedItems.length}개의 상품을 장바구니에서 삭제할까요?`}
            buttonText='삭제'
            buttonOnClick={handleRemoveSelected}
          >
            <Button size='sm' variant='ghost'>선택삭제</Button>
          </DialogConfirm>
        </div>
      </div>
      <ScrollArea className='h-[calc(100vh-210px)]'>
        <div className='flex flex-col gap-y-8 mb-8 px-6'>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              cart={item}
              isSelected={selectedItems.includes(item.id)}
              onItemSelect={toggleItemSelection}
              toggleItemSelection={toggleItemSelection}
            />
          ))}
        </div>
        <PriceSection totalPrice={totalPrice} deliveryPrice={deliveryPrice} />
      </ScrollArea>
      <div className='right-0 bottom-0 left-0 z-[9999] fixed bg-white m-auto px-6 py-4 border-t max-w-[600px]'>
        <Button size='lg' className='w-full' onClick={handleBuy} disabled={selectedItems.length == 0}>구매하기</Button>
      </div>
    </>
  );
}

export default CartList;