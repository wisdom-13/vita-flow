import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CartItem from '@/components/Main/CartItem';
import { useCart } from '@/context/CartContext';
import useSelection from '@/hooks/useSelection';

const CartList = () => {
  const { cart, removeSelectCart } = useCart();

  const {
    selectedItems,
    setSelectedItems,
    toggleItemSelection,
    toggleAllItemSelection
  } = useSelection(cart);

  const handleRemoveSelected = () => {
    removeSelectCart(selectedItems);
    setSelectedItems([]);
  }

  return (
    <>
      <div className='flex justify-start items-center gap-x-2 text-sm'>
        <div className='flex justify-center items-center pt-1 w-10 text-center'>
          <Checkbox
            checked={selectedItems.length === cart.length}
            onClick={toggleAllItemSelection}
          />
        </div>
        <div>
          전체선택({selectedItems.length}/{cart.length})
        </div>
        <div className='ml-auto'>
          <Button
            size='sm'
            variant='ghost'
            onClick={handleRemoveSelected}
          >
            선택삭제
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-y-8'>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            cart={item}
            isSelected={selectedItems.includes(item.id)}
            onItemSelect={toggleItemSelection}
          />
        ))}
      </div>
      <div className='right-0 bottom-0 left-0 z-[9999] fixed bg-white m-auto px-6 py-4 border-t max-w-[600px]'>
        <Button size='lg' className='w-full'>구매하기</Button>
      </div>
    </>
  );
}

export default CartList;