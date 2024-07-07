import { Order } from '@/types/types';
import { cn, formatDate } from '@/lib/utils';
import { TableCell, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import OrderProductItem from '@/components/Admin/OrderProductItem';

interface OrderItemProps {
  order: Order;
  isSelected: boolean;
  onProductSelect: (id: string, isChecked: boolean) => void;
}

const OrderItem = ({ order, isSelected, onProductSelect }: OrderItemProps) => {
  const handleCheckboxChange = (isChecked: boolean) => {
    onProductSelect(order.orderId, isChecked);
  };

  return (
    <>
      <TableRow className={cn(isSelected && 'bg-muted/50')}>
        <TableCell className='w-16 text-center'>
          <Checkbox checked={isSelected} onCheckedChange={handleCheckboxChange} />
        </TableCell>
        <TableCell className='w-44'>
          <b>{order.orderId}</b><br />
          <span>{formatDate(order.createAt)}</span>
        </TableCell>
        <TableCell className='flex flex-col gap-y-4'>
          {order.items.map((item) => (
            <OrderProductItem key={item.id} product={item} />
          ))}
        </TableCell>
        <TableCell className='text-right w-44 font-semibold text-primary'>
          {order.totalAmount.toLocaleString()}원
        </TableCell>
        <TableCell className='w-44 text-center'>
          {order.status}
        </TableCell>
      </TableRow>
    </>
  );
}

export default OrderItem;