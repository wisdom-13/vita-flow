import { Product } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import CountSelector from '@/components/Shared/CountSelector';

interface AddCartSectionProps {
  id: string;
  product: Product;
}

const AddCartSection = ({ id, product }: AddCartSectionProps) => {
  const { addCart, toggleCart } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [isBuy, setIsBuy] = useState<boolean>(false);

  const {
    productName,
    productPrice,
    productQuantity,
    productImage,
    productCategory,
  } = product;

  const handleAddToCart = () => {
    const item = {
      id,
      name: productName,
      price: productPrice,
      image: productImage,
      category: productCategory,
      maxQuantity: productQuantity,
      quantity,
      isBuy: false,
    };
    addCart(item);
    toast("선택한 상품을 장바구니에 담았습니다.", {
      action: {
        label: "보러가기",
        onClick: toggleCart,
      },
    })
  };

  return (
    <>
      <div className={cn(
        'right-0 bottom-[77px] fixed left-0 z-[9999] justify-between items-center bg-white m-auto px-6 py-4 border-t max-w-[600px]',
        isBuy ? 'flex' : 'hidden'
      )}>
        <CountSelector
          count={quantity}
          setCount={setQuantity}
          maxCount={productQuantity}
        />
        <h5 className='font-semibold'>{(productPrice * quantity).toLocaleString()}원</h5>
      </div>
      <div className='right-0 bottom-0 left-0 z-[9999] fixed bg-white m-auto px-6 py-4 border-t max-w-[600px]'>
        {isBuy ? (
          <div className='flex gap-x-2'>
            <Button size='lg' variant='outline' className='w-full' onClick={handleAddToCart}>장바구니 담기</Button>
            <Button size='lg' className='w-full' onClick={handleAddToCart}>구매하기</Button>
          </div>
        ) : (
          <Button size='lg' className='w-full' onClick={() => setIsBuy(true)}>구매하기</Button >
        )}
      </div>
    </>
  );
}

export default AddCartSection;