import { Badge } from 'lucide-react';

const ListItem = () => {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='bg-muted rounded-md w-20 h-20'>
      </div>
      <div className='space-y-1 text-sm'>
        <Badge>마그네슘</Badge>
        <h3 className='font-semibold'>영양제 A</h3>
        <h5>15,000원</h5>
      </div>
    </div>
  );
}

export default ListItem;