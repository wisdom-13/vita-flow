import { Product } from '@/types/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useDeleteProduct } from '@/hooks/useProduct';
import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import BadgeList from '@/components/Shared/BadgeList';
import DialogConfirm from '@/components/Shared/DialogConfirm';

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
  const { mutate: deleteMutate } = useDeleteProduct();

  const handleCheckboxChange = (isChecked: boolean) => {
    onProductSelect(id, isChecked);
  };

  const handleDelete = () => {
    deleteMutate({ productData: product }, {
      onSuccess: () => {
        toast.success(`선택된 상품을 삭제하였습니다.`);
      },
      onError: () => {
        toast.error('상품 정보를 업데이트하는 중 문제가 발생했습니다.');
      }
    })
  }

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
          <BadgeList list={productCategory} className='mt-2' />
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
        <TableCell className='text-right space-y-2 w-24'>
          <Link to={`/admin/product/${id}`}>
            <Button variant='outline'>수정</Button>
          </Link>
          <DialogConfirm
            title='삭제'
            content={`[${productName}] 상품을 삭제하시겠습니까?<br>이 작업은 되돌릴 수 없습니다.`}
            buttonText='삭제'
            buttonOnClick={handleDelete}
          >
            <Button variant='outline'>삭제</Button>
          </DialogConfirm>
        </TableCell>
      </TableRow >
    </>
  );
}

export default ProductItem;