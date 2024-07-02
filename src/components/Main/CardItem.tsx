import { Product } from '@/types/types';
import { Link } from 'react-router-dom';
import BadgeList from '@/components/Shared/BadgeList';

interface CardItemProps {
  product: Product;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const CardItem = ({ product, variant = 'default' }: CardItemProps) => {
  const {
    id,
    productImage,
    productName,
    productPrice,
    productCategory
  } = product;

  return (
    <Link to={`/vitamin/${id}`}>
      <div className='relative flex flex-col border-muted bg-gray-100 hover:bg-primary border rounded-md w-full hover:text-white overflow-hidden'>
        <div className='top-2 left-2 absolute transition-all'>
          <BadgeList list={productCategory.slice(0, 2)} variant={variant} />
        </div>
        <div className='bg-white w-full h-36'>
          <img src={productImage} alt={productName} className='w-full h-full object-cover' />
        </div>
        <div className='py-2 p-4 text-sm'>
          <h3 className='font-semibold truncate'>{productName}</h3>
          <h5>{productPrice.toLocaleString()}원</h5>
        </div>
      </div>
    </Link >
  );
}

export default CardItem;