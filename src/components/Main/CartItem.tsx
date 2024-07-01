import { Cart } from '@/types/types';
import { Checkbox } from '@/components/ui/checkbox';
import BadgeList from '@/components/Shared/BadgeList';
import { Button } from '../ui/button';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import CountSelector from '../Shared/CountSelector';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItemProps {
  cart: Cart;
  isSelected: boolean;
  onItemSelect: (id: string) => void;
}

const CartItem = ({ cart, isSelected, onItemSelect }: CartItemProps) => {
  const { removeCart, updateCartQuantity } = useCart();
  const [quantity, setQuantity] = useState(cart.quantity);

  useEffect(() => {
    updateCartQuantity(cart.id, quantity);
  }, [quantity])

  return (
    <div className='relative flex justify-start items-start gap-x-2 text-sm'>
      <div className='flex justify-center items-center pt-1 w-10 text-center shrink'>
        <Checkbox
          checked={isSelected}
          onClick={() => onItemSelect(cart.id)}
        />
      </div>
      <div className='flex flex-1 justify-start items-start gap-x-4'>
        <Link to={`/vitamin/${cart.id}`} className='bg-muted border rounded-md w-24 h-24 overflow-hidden'>
          <img src={cart.image} alt={cart.name} className='w-full h-full object-cover' />
        </Link>
        <div className='flex flex-col flex-1 gap-y-3 pr-3'>
          <Link to={`/vitamin/${cart.id}`} className='flex flex-col gap-y-1'>
            <BadgeList list={cart.category} variant='secondary' />
            <h3 className='w-56 font-semibold truncate'>{cart.name}</h3>
          </Link>
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
        <Button
          size='sm'
          variant='ghost'
          onClick={() => removeCart(cart.id)}
        >
          <X size='14' />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;