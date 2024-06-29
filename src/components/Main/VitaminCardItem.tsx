import { Product } from '@/types/types';

import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface CardItemProps {
  product: Product
}

const VitaminCardItem = ({ product }: CardItemProps) => {
  const {
    id,
    productImage,
    productName,
    productPrice,
    productCategory
  } = product;

  return (
    <Link to={`/vitamin/${id}`}>
      <div className='relative flex flex-col border-muted bg-gray-100 border rounded-md w-full'>
        <div className='top-2 left-2 absolute flex gap-x-2'>
          {productCategory.map((category, index) => <Badge key={`${index}-${category}`} variant='secondary'>{category}</Badge>)}
        </div>
        <div className='bg-white rounded-md w-full h-36'>
          <img src={productImage} alt={productName} className='w-full h-full object-cover' />
        </div>
        <div className='py-2 p-4 text-sm'>
          <h3 className='font-semibold'>{productName}</h3>
          <h5>{productPrice}원</h5>
        </div>
      </div>
    </Link >
  );
}

export default VitaminCardItem;