import { Order } from '@/types/types';
import useSelection from '@/hooks/useSelection';
import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
  TableCell,
  TableHeader
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import OrderItem from '@/components/Admin/OrderItem';

interface OrderListProps {
  orders?: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {

  const {
    selectedItems,
    toggleItemSelection,
    toggleAllItemSelection
  } = useSelection([]);


  const handleDatchUpdate = (isStatus: boolean) => {
    // updateMutate({ productIds: selectedItems, state: isStatus }, {
    //   onSuccess: () => {
    //     toast.success(`선택된 상품의 상태가 [${isStatus ? '판매함' : '판매안함'}]으로 변경되었습니다.`);
    //   },
    //   onError: () => {
    //     toast.error('상품 정보를 업데이트하는 중 문제가 발생했습니다.');
    //   }
    // })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className='hover:bg-white'>
          <TableCell className='w-16 text-center'>
            <Checkbox
              checked={selectedItems.length === orders?.length}
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

      {(!orders || orders.length == 0) ? (
        <TableCaption className='h-44'>주문 정보가 없습니다.</TableCaption>
      ) : (
        <TableBody>
          {orders.map((order: Order) => (
            <OrderItem
              key={order.orderId}
              order={order}
              isSelected={selectedItems.includes(order.orderId)}
              onProductSelect={toggleItemSelection}
            />
          ))}
        </TableBody>
      )}
    </Table>
  );
}

export default OrderList;