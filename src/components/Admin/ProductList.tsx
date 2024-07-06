import { Product } from '@/types/types';
import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';

import { useProducts } from '@/hooks/useProducts';
import { useBatchUpdateProducts } from '@/hooks/useProduct';
import useSelection from '@/hooks/useSelection';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
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

import ProductItem from '@/components/Admin/ProductItem';

const ProductList = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({});
  const products = data?.pages.flatMap((page: any) => page.products) || [];
  const { mutate: updateMutate } = useBatchUpdateProducts();

  const {
    selectedItems,
    toggleItemSelection,
    toggleAllItemSelection
  } = useSelection([]);

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
    );
  }

  if (error) {
    return (
      <Table>
        <TableCaption>상품 리스트를 조회하는 중에 문제가 발생했습니다.</TableCaption>
      </Table>
    );
  }

  const handleDatchUpdate = (isStatus: boolean) => {
    updateMutate({ productIds: selectedItems, state: isStatus }, {
      onSuccess: () => {
        toast.success(`선택된 상품의 상태가 [${isStatus ? '판매함' : '판매안함'}]으로 변경되었습니다.`);
      },
      onError: () => {
        toast.error('상품 정보를 업데이트하는 중 문제가 발생했습니다.');
      }
    })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-white'>
            <TableCell className='w-16 text-center'>
              <Checkbox
                checked={selectedItems.length === products?.length}
                onCheckedChange={toggleAllItemSelection}
              />
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' disabled={selectedItems.length == 0}>선택 판매 상태 변경</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuItem onClick={() => handleDatchUpdate(true)}>
                    판매함으로 변경
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDatchUpdate(false)}>
                    판매안함으로 변경
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell colSpan={3}>
              {selectedItems.length > 0 && (
                <div className='text-sm'>
                  선택된 항목 : <span className='font-semibold text-primary'>{selectedItems.length}</span> 개
                </div>
              )}
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <ProductItem
              key={product.id}
              product={product}
              isSelected={selectedItems.includes(product.id)}
              onProductSelect={toggleItemSelection}
            />
          ))}
        </TableBody>
      </Table>
      {
        isFetchingNextPage && (
          <Skeleton className="rounded-md w-full h-14" />
        )
      }
      <div ref={ref}></div>
    </>
  );
}

export default ProductList;