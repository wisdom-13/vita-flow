import { Product } from '@/types/types';
import { cn } from '@/lib/utils';

import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
  isSelected: boolean;
  onProductSelect: (id: string, isChecked: boolean) => void;
}

const ProductItem = ({ product, isSelected, onProductSelect }: ProductItemProps) => {
  const {
    id,
    productImage,
    productName,
    productQuantity,
    productPrice,
    productCategory,
    productStatus
  } = product;

  const handleCheckboxChange = (isChecked: boolean) => {
    onProductSelect(id, isChecked);
  };

  return (
    <>
      <TableRow key={id} className={cn(isSelected && 'bg-muted/50')}>
        <TableCell className='w-16 text-center'>
          <Checkbox checked={isSelected} onCheckedChange={handleCheckboxChange} />
        </TableCell>
        <TableCell className='w-28'>
          <div className='border rounded-md w-24 h-24 overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={productImage}
              alt={productName}
            />
          </div>
        </TableCell>
        <TableCell className='w-2/5'>
          <b>{productName}</b>
          <div className='flex gap-x-2 mt-2'>
            {productCategory.map((category) => <Badge key={category} variant='secondary'>{category}</Badge>)}
          </div>
        </TableCell>
        <TableCell className='text-right w-32'>
          {productStatus ? '판매함' : '판매안함'}
        </TableCell>
        <TableCell className='text-right w-32'>
          수량 : <span className={cn((productQuantity < 10) && 'text-red-400', 'font-semibold')}>{productQuantity}</span>개
        </TableCell>
        <TableCell className='text-right w-36'>
          <b>{(productPrice).toLocaleString()}</b>원
        </TableCell>
        <TableCell className='text-right w-24'>
          <Link to={`/admin/product/${id}`}>
            <Button variant='outline'>수정</Button>
          </Link>
        </TableCell>
      </TableRow >
    </>
  );
}

export default ProductItem;