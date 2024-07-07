import { Order, OrderStatus } from '@/types/types';
import { useEffect } from 'react';
import { toast } from 'sonner';
import useSelection from '@/hooks/useSelection';
import { useBatchUpdateOrders } from '@/hooks/useOrder';

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
  selectedStatus?: OrderStatus;
  orders?: Order[];
}

const OrderList = ({ selectedStatus, orders }: OrderListProps) => {
  const { mutate: updateMutate } = useBatchUpdateOrders();
  const statuses: OrderStatus[] = ['주문 완료', '발송 대기', '발송 시작', '주문 취소'];

  const {
    selectedItems,
    setSelectedItems,
    toggleItemSelection,
    toggleAllItemSelection
  } = useSelection(orders ? orders : [], false);

  useEffect(() => {
    setSelectedItems([])
  }, [selectedStatus])


  const handleDatchUpdate = (status: OrderStatus) => {
    updateMutate({ orderIds: selectedItems, state: status }, {
      onSuccess: () => {
        toast.success(`선택된 주문 건이 [${status}] 상태로 변경되었습니다.`);
      },
      onError: () => {
        toast.error('주문 상태를 업데이트하는 중 문제가 발생했습니다.');
      }
    })
    setSelectedItems([])
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
                <Button variant='outline' disabled={selectedItems.length == 0}>선택 주문 상태 변경</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                {statuses.map((status) => (
                  <DropdownMenuItem onClick={() => handleDatchUpdate(status)}>
                    [{status}] 상태로 변경
                  </DropdownMenuItem>
                ))}
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