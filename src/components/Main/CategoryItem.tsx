import { usePrefetchProducts } from '@/hooks/useProducts';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CategoryItemProps {
  category?: string;
  text: string;
  size?: 'sm' | 'md';
  color?: 'white' | 'primary';
}

const CategoryItem = ({ category = '', text, size = 'sm', color = 'white' }: CategoryItemProps) => {
  const filters = { categories: [category], 'productsState': true, 'sortBy': 'byDate' }
  const { prefetchProducts } = usePrefetchProducts(filters);

  return (
    <Link to={category ? `/category/${category}` : '/vitamins'} onMouseEnter={prefetchProducts} onTouchStart={prefetchProducts}>
      <div className={cn(
        'flex justify-center shadow-md items-center gap-y-2 hover:bg-primary rounded-md w-full h-16 hover:text-white transition-all cursor-pointer',
        `text-${size}`,
        color == 'primary' && 'border-primary border shadow-none text-primary'
      )}>
        <h3 className='font-semibold text-center whitespace-pre-wrap'>{text}</h3>
      </div>
    </Link>
  );
}

export default CategoryItem;