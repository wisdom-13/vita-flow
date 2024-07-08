import { Product } from '@/types/types';
import { Link } from 'react-router-dom';
import BadgeList from '@/components/Shared/BadgeList';
import { usePrefetchProduct } from '@/hooks/useProduct';

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
  const { prefetchProduct } = usePrefetchProduct(id);

  return (
    <Link to={`/vitamin/${id}`} onMouseEnter={prefetchProduct} onTouchStart={prefetchProduct}>
      <div className='relative flex flex-col border-muted bg-muted-foreground/5 hover:bg-primary shadow-md hover:shadow-lg border rounded-md w-full hover:text-white transition-all overflow-hidden group'>
        <div className='bg-white w-full h-36'>
          <img src={productImage} alt={productName} className='group-hover:scale-105 w-full h-full transition-all object-cover' />
        </div>
        <div className='py-2 p-4 text-sm'>
          <h3 className='font-semibold truncate'>{productName}</h3>
          <h5>{productPrice.toLocaleString()}원</h5>
        </div>
        <div className='top-2 left-2 absolute'>
          <BadgeList list={productCategory.slice(0, 2)} variant={variant} />
        </div>
      </div>
    </Link >
  );
}

export default CardItem;