import { Product } from '@/types/types';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { containsAllCategories } from '@/lib/utils';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import CardItem from './CardItem';

interface CardViewSectionProps {
  title: string;
  filters: { sortBy?: string, productsState?: boolean, categories?: string[], pageSize?: number }
}

const CardViewSection = ({ title, filters, filters: { categories, pageSize = 10 } }: CardViewSectionProps) => {
  const { id } = useParams();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts(filters);
  let products = data?.pages.flatMap((page: any) => page.products);


  if (products && categories) {
    products = products.filter((product: Product) =>
      categories && containsAllCategories(product.productCategory, categories) && product.id != id
    ).slice(0, pageSize);
  }

  useEffect(() => {
    if (data && data.pages) {
      if (products && products.length < pageSize && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [data, fetchNextPage, hasNextPage]);

  if (isLoading || error || !products || products?.length == 0) {
    return
  }

  return (
    <>
      <h1 className='mb-4 font-semibold text-xl'>{title}</h1>
      <div className='gap-4 grid grid-cols-2 md:grid-cols-3 grid-rows-1 overflow-hidden'>
        {products.map((product: Product) => (
          <CardItem
            key={product.id}
            product={product}
          />
        ))}
        {isFetchingNextPage && (
          <Skeleton className='rounded-md w-full h-52' />
        )}
      </div>
    </>
  );
}

export default CardViewSection;