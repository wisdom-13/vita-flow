import { useState } from 'react';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import CountSelector from '@/components/Shared/CountSelector';

interface AddCartSectionProps {
  productQuantity: number;
  productPrice: number;
}

const AddCartSection = ({ productQuantity, productPrice }: AddCartSectionProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isBuy, setIsBuy] = useState<boolean>(false);

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
          <Button size='lg' className='w-full'>장바구니 담기</Button>
        ) : (
          <Button size='lg' className='w-full' onClick={() => setIsBuy(true)}>구매하기</Button >
        )}
      </div>
    </>
  );
}

export default AddCartSection;