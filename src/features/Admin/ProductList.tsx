import { useProducts } from '@/hooks/useProducts';
import ProductItem from './ProductItem';

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
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductList = () => {
  const { products, loading, error } = useProducts();

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedProducts(products.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleProductSelect = (productId: string, isSelected: boolean) => {
    setSelectedProducts(prev =>
      isSelected ? [...prev, productId] : prev.filter(id => id !== productId)
    );
  };

  if (loading) {
    return (
      <div className='space-y-4'>
        <Skeleton className="rounded-md w-full h-14" />
        <Skeleton className="rounded-md w-full h-14" />
        <Skeleton className="rounded-md w-full h-14" />
      </div>
    )
  }

  if (error) {
    return (
      <Table>
        <TableCaption>상품 리스트를 조회하는 중에 문제가 발생했습니다.</TableCaption>
      </Table>
    )
  }

  return (
    <>
      <div className='flex items-center gap-4 mb-4 px-4'>
        <div className='w-16 text-center'>
          <Checkbox
            checked={selectedProducts.length === products.length}
            onCheckedChange={handleSelectAll}
          />
        </div>
        <Button variant='outline'>선택 삭제</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>선택 판매 상태 변경</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuItem>판매함으로 변경</DropdownMenuItem>
            <DropdownMenuItem>판매안함으로 변경</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onProductSelect={handleProductSelect}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ProductList;