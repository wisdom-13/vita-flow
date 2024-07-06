import { Cart, OrderItem } from '@/types/types';

import { Link } from 'react-router-dom';

interface OrderProductItemProps {
  product: Cart | OrderItem;
}

const OrderProductItem = ({ product }: OrderProductItemProps) => {
  return (
    <div className='relative flex justify-start items-start gap-x-2 text-sm'>
      <div className='flex flex-1 justify-start items-center gap-x-4'>
        <Link
          to={`/vitamin/${product.id}`}
          className='bg-muted border rounded-md w-24 h-24 overflow-hidden'
        >
          <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
        </Link>
        <div className='flex flex-col flex-1 gap-y-3 pr-3'>
          <Link
            to={`/vitamin/${product.id}`}
            className='flex flex-col gap-y-1'
          >
            <h3 className='w-56 font-semibold truncate'>{product.name}</h3>
          </Link>
          <div className='flex justify-between items-center'>
            수량 : {product.quantity}
            <h5 className='font-semibold'>{(product.quantity * product.price).toLocaleString()}원</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderProductItem;