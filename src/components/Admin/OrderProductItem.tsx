import { Cart, OrderItem } from '@/types/types';

interface OrderProductItemProps {
  product: Cart | OrderItem;
}

const OrderProductItem = ({ product }: OrderProductItemProps) => {
  return (
    <div className='relative flex justify-start items-start gap-x-2 text-sm'>
      <div className='flex flex-1 justify-start items-center gap-x-4'>
        <div className='bg-muted border rounded-md w-16 h-16 overflow-hidden'>
          <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col flex-1 gap-y-1 pr-3'>
          <div className='flex flex-col gap-y-1'>
            <h3 className='w-56 font-semibold truncate'>{product.name}</h3>
          </div>
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