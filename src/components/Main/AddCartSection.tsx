import { Product } from '@/types/types';
import { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import CountSelector from '@/components/Shared/CountSelector';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

interface AddCartSectionProps {
  id: string;
  product: Product;
}

const AddCartSection = ({ id, product }: AddCartSectionProps) => {
  const { user } = useAuth();
  const { addCart, toggleCart, updateCartIsBuy } = useCart();

  const [quantity, setQuantity] = useState<number>(1);
  const [isBuy, setIsBuy] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    productName,
    productPrice,
    productQuantity,
    productImage,
  } = product;

  const handleClick = (type: 'cart' | 'payment') => {
    updateCartIsBuy([], true);

    const cartId = uuid();
    const item = {
      id: cartId,
      cartId,
      productId: id,
      userId: user?.uid,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity,
      isBuy: type == 'payment',
      isPayment: type == 'payment',
    };
    addCart(item);

    if (type == 'cart') {
      toast("선택한 상품을 장바구니에 담았습니다.", {
        action: {
          label: "보러가기",
          onClick: toggleCart,
        },
      })
    } else if (type == 'payment') {
      navigate('/orders/payment');
    }
  }


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
            <Button size='lg' variant='outline' className='w-full' onClick={() => handleClick('cart')}>장바구니 담기</Button>
            <Button size='lg' className='w-full' onClick={() => handleClick('payment')}>구매하기</Button>
          </div>
        ) : (
          <Button
            size='lg'
            className='w-full'
            onClick={() => setIsBuy(true)}
            disabled={productQuantity === 0}
          >
            구매하기
          </Button>
        )}
      </div>
    </>
  );
}

export default AddCartSection;