import { Cart, Product } from '@/types/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '@/context/CartContext';
import useSelection from '@/hooks/useSelection';
import { useCartProducts } from '@/hooks/useProducts';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import DialogConfirm from '@/components/Shared/DialogConfirm';
import MessageContent from '@/components/Shared/MessageContent';
import CartItem from '@/components/Main/CartItem';
import PriceSection from '@/components/Main/PriceSection';

const CartList = () => {
  const { cart, removeSelectCart, isCartOpen, toggleCart, updateCartIsBuy } = useCart();
  const { cartProducts, isError } = useCartProducts(cart.filter((item) => !item.isPayment));
  const [validProducts, setValidProducts] = useState<(Cart & Product)[]>([]);
  const { selectedItems, setSelectedItems, toggleItemSelection, toggleAllItemSelection } = useSelection(validProducts);
  const navigate = useNavigate();

  useEffect(() => {
    const validItems = cartProducts.filter((item) => item.productQuantity !== 0);
    setValidProducts(validItems);
  }, [cartProducts.length]);

  useEffect(() => {
    setSelectedItems(validProducts.map((item) => item.id));
  }, [validProducts.length]);

  if (!cart || cart.filter((item) => !item.isPayment).length == 0) {
    return (<MessageContent
      content='장바구니에 담긴 비타민이 없어요 💊'
      linkText='비타민 둘러보기'
      to='/vitamins'
      onClick={isCartOpen ? toggleCart : undefined}
    />)
  }

  if (!cartProducts || isError) {
    return (<MessageContent
      content='장바구니에 담긴 비타민을 불러오는 중 문제가 발생했어요 😢'
      linkText='메인으로'
      to='/vitamins'
      onClick={isCartOpen ? toggleCart : undefined}
    />)
  }

  const handleRemoveSelected = () => {
    removeSelectCart(selectedItems);
    setSelectedItems([]);
  }

  const handleBuy = () => {
    toggleCart();
    updateCartIsBuy(selectedItems, true);
    navigate('/cart');
    navigate('/orders/payment');
  }

  const totalPrice = cartProducts.filter((item) => selectedItems.includes(item.id)).reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
  const deliveryPrice = (totalPrice == 0) ? 0 : (totalPrice >= 50000) ? 0 : 3000;

  return (
    <>
      <div className='flex justify-start items-center gap-x-2 px-6 text-sm'>
        <div className='flex justify-center items-center pt-1 w-4 md:w-10 text-center'>
          <Checkbox
            checked={selectedItems.length === validProducts.length}
            onClick={toggleAllItemSelection}
          />
        </div>
        <div>
          전체선택({selectedItems.length}/{validProducts.length})
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
      <ScrollArea className='max-w-full h-[calc(100vh-210px)]'>
        <div className='flex flex-col gap-y-8 mb-8 px-6'>
          {cartProducts.map((item) => (
            <CartItem
              key={item.id}
              cartProduct={item}
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