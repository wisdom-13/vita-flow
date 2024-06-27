

import useProductActions from '@/hooks/useProductActions';
import { useProducts } from '@/hooks/useProducts';

import {
  Table,
  TableBody,
  TableCaption
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import ProductItem from './ProductItem';
import { Product } from '@/types/types';

import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';


const ProductList = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useProducts();

  const { ref, inView } = useInView();

  const {
    selectedProducts,
    toggleProductSelection,
    deleteSelectedProducts,
    updateSelectedProductsStatus,
  } = useProductActions();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className="rounded-md w-full h-14" />
        <Skeleton className="rounded-md w-full h-14" />
        <Skeleton className="rounded-md w-full h-14" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <Table>
        <TableCaption>상품 리스트를 조회하는 중에 문제가 발생했습니다.</TableCaption>
      </Table>
    )
  }
  const products = data.pages.flatMap((page: any) => page.products);

  return (
    <>
      <div className='flex items-center gap-4 mb-4 px-4'>
        <div className='w-16 text-center'>
          <div className='w-16 text-center'>
            <Checkbox
              checked={selectedProducts.length === products.length}
              onCheckedChange={() =>
                products.forEach(product =>
                  toggleProductSelection(product.id)
                )
              }
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>선택 판매 상태 변경</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuItem onClick={() => updateSelectedProductsStatus(true)}>
              판매함으로 변경
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateSelectedProductsStatus(false)}>
              판매안함으로 변경
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant='outline' onClick={deleteSelectedProducts}>
          선택 삭제
        </Button>
        {
          selectedProducts.length > 0 && (
            <div className='text-sm'>
              선택된 항목 : <span className='font-semibold text-primary'>{selectedProducts.length}</span> 개
            </div>
          )
        }
      </div>

      <Table>
        <TableBody>
          {products.map((product: Product) => (
            <ProductItem
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onProductSelect={toggleProductSelection}
            />
          ))}
        </TableBody>
      </Table>
      {isFetchingNextPage && (
        <Skeleton className="rounded-md w-full h-14" />
      )}
      <div ref={ref}></div>
    </>
  );
}

export default ProductList;