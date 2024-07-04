import { Cart } from '@/types/types';
import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import BadgeList from '@/components/Shared/BadgeList';
import CountSelector from '@/components/Shared/CountSelector';
import DialogConfirm from '@/components/Shared/DialogConfirm';

interface CartItemProps {
  cart: Cart;
  isSelected: boolean;
  onItemSelect: (id: string) => void;
  toggleItemSelection: (id: string) => void;
}

const CartItem = ({ cart, isSelected, onItemSelect, toggleItemSelection }: CartItemProps) => {
  const { removeCart, updateCartQuantity, toggleCart } = useCart();
  const [quantity, setQuantity] = useState(cart.quantity);
  const navigator = useNavigate();

  useEffect(() => {
    updateCartQuantity(cart.id, quantity);
  }, [quantity])

  const handleRemove = () => {
    removeCart(cart.id)
    toggleItemSelection(cart.id)
  }

  const handleLink = () => {
    navigator(`/vitamin/${cart.id}`)
    toggleCart()
  }

  return (
    <div className='relative flex justify-start items-start gap-x-2 text-sm'>
      <div className='flex justify-center items-center pt-1 w-10 text-center shrink'>
        <Checkbox
          checked={isSelected}
          onClick={() => onItemSelect(cart.id)}
        />
      </div>
      <div className='flex flex-1 justify-start items-center gap-x-4'>
        <div
          className='bg-muted border rounded-md w-24 h-24 overflow-hidden'
          onClick={handleLink}
        >
          <img src={cart.image} alt={cart.name} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col flex-1 gap-y-3 pr-3'>
          <div
            className='flex flex-col gap-y-1'
            onClick={handleLink}
          >
            {/* <BadgeList list={cart.category} variant='secondary' /> */}
            <h3 className='w-56 font-semibold truncate'>{cart.name}</h3>
          </div>
          <div className='flex justify-between items-center'>
            <CountSelector
              count={quantity}
              setCount={setQuantity}
              maxCount={cart.maxQuantity}
            />
            <h5 className='font-semibold'>{(quantity * cart.price).toLocaleString()}원</h5>
          </div>
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
    </div>
  );
}

export default CartItem;