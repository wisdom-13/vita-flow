import { Cart, Product } from '@/types/types';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import CountSelector from '@/components/Shared/CountSelector';
import DialogConfirm from '@/components/Shared/DialogConfirm';

interface CartItemProps {
  cartProduct: Cart & Product;
  isSelected: boolean;
  onItemSelect: (id: string) => void;
  toggleItemSelection: (id: string) => void;
}

const CartItem = ({ cartProduct, isSelected, onItemSelect, toggleItemSelection }: CartItemProps) => {
  const { removeCart, updateCartQuantity, toggleCart } = useCart();
  const [quantity, setQuantity] = useState(cartProduct.quantity);
  const navigator = useNavigate();

  useEffect(() => {
    const newQuantity = (quantity > cartProduct.productQuantity) ? cartProduct.productQuantity : quantity;
    updateCartQuantity(cartProduct.id, newQuantity);
  }, [quantity])

  const handleRemove = () => {
    removeCart(cartProduct.id);
    toggleItemSelection(cartProduct.id);
  }

  const handleLink = () => {
    navigator(`/vitamin/${cartProduct.id}`);
    toggleCart();
  }

  const soldOut = cartProduct.productQuantity === 0;

  return (
    <div className='relative flex justify-start items-start gap-x-2 text-sm'>
      <div className='flex justify-center items-center pt-1 w-10 text-center shrink'>
        <Checkbox
          checked={soldOut ? false : isSelected}
          onClick={() => onItemSelect(cartProduct.id)}
        />
      </div>
      <div className='flex flex-1 justify-start items-center gap-x-4'>
        <div
          className='bg-muted border rounded-md w-24 h-24 overflow-hidden'
          onClick={handleLink}
        >
          <img src={cartProduct.image} alt={cartProduct.name} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col flex-1 gap-y-3 pr-3'>
          <div
            className='flex flex-col gap-y-1'
            onClick={handleLink}
          >
            <h3 className='w-56 font-semibold truncate'>{cartProduct.name}</h3>
          </div>
          <div className='flex justify-between items-center'>
            <CountSelector
              count={(quantity > cartProduct.productQuantity) ? cartProduct.productQuantity : quantity}
              setCount={setQuantity}
              maxCount={cartProduct.productQuantity}
            />
            <h5 className='font-semibold'>{(quantity * cartProduct.price).toLocaleString()}원</h5>
          </div>
          {(quantity > cartProduct.productQuantity) && <div className='text-muted-foreground text-xs'>* 장바구니에 담긴 수량이 재고 수량보다 많아 조정되었습니다.</div>}
        </div>
      </div>
      <div className='top-0 right-0 absolute'>
        <DialogConfirm
          title='상품 삭제'
          content='선택한 상품을 장바구니에서 삭제할까요?'
          buttonText='삭제'
          buttonOnClick={handleRemove}
        >
          <Button size='sm' variant='ghost'>
            <X size='14' />
          </Button>
        </DialogConfirm>
      </div>
      {soldOut && (
        <div className='absolute inset-0 bg-white/90'>
          <div className='flex flex-col justify-center items-center gap-y-2 h-full'>
            <p className='font-semibold'>품절된 상품입니다.</p>
            <Button size='sm' variant='secondary' onClick={handleRemove}>장바구니에서 삭제하기</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;