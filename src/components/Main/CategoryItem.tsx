import { usePrefetchProducts } from '@/hooks/useProducts';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CategoryItemProps {
  category?: string;
  text: string;
  size?: 'sm' | 'md';
}

const CategoryItem = ({ category = '', text, size = 'sm' }: CategoryItemProps) => {
  const filters = { categories: [category], 'productsState': true, 'sortBy': 'byDate' }
  const { prefetchProducts } = usePrefetchProducts(filters);

  return (
    <Link to={category ? `/category/${category}` : '/vitamins'} onMouseEnter={prefetchProducts}>
      <div className={cn(
        'flex justify-center items-center gap-y-2 bg-gray-100 hover:bg-primary rounded-md w-full h-16 hover:text-white transition-all cursor-pointer',
        `text-${size}`
      )}>
        <h3 className='font-semibold text-center whitespace-pre-wrap'>{text}</h3>
      </div>
    </Link>
  );
}

export default CategoryItem;