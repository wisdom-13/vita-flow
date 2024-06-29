import { Product } from '@/types/types';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useProducts } from '@/hooks/useProducts';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import VitaminCardItem from './VitaminCardItem';
import { containsAllCategories } from '@/lib/utils';

interface VitaminCardViewProps {
  filters: { sortBy?: string, productsState?: boolean, categories?: string[], pageSize?: number }
}


const VitaminCardView = ({ filters, filters: { categories } }: VitaminCardViewProps) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts(filters);
  const { ref, inView } = useInView();
  let products = data?.pages.flatMap((page: any) => page.products);

  if (products && categories) {
    products = products.filter((product: Product) =>
      containsAllCategories(product.productCategory, categories)
    );
  }

  useEffect(() => {
    if (data && data.pages) {
      if (products && inView && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [data, inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className='gap-4 grid grid-cols-3'>
        <Skeleton className='rounded-md w-full h-52' />
        <Skeleton className='rounded-md w-full h-52' />
        <Skeleton className='rounded-md w-full h-52' />
      </div>
    )
  }

  if (error || !products) {
    return (
      <div className='flex flex-col items-center gap-y-4 mt-44'>
        <div className='mt-10 text-muted-foreground text-sm'>
          상품 리스트를 조회하는 중에 문제가 발생했습니다.
        </div>
        <Link to='/'>
          <Button>메인으로</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='gap-4 grid grid-cols-3'>
      {products.map((product: Product) => (
        <VitaminCardItem
          key={product.id}
          product={product}
        />
      ))}
      {isFetchingNextPage && (
        <Skeleton className='rounded-md w-full h-52' />
      )}
      <div ref={ref}></div>
    </div>
  );
}

export default VitaminCardView;