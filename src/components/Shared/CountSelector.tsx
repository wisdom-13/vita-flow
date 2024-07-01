import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CountSelectorProps {
  count: number;
  setCount: (count: number) => void;
  maxCount: number;
}

const CountSelector = ({ count, setCount, maxCount }: CountSelectorProps) => {
  maxCount = maxCount < 99 ? maxCount : 99;

  return (
    <div className='flex items-center gap-x-4'>
      <Button
        size='sm'
        variant='outline'
        onClick={() => setCount((count > 1) ? count - 1 : 1)}
      >
        <Minus size='12' />
      </Button>
      <span className='w-8 text-center'>{count}개</span>
      <Button
        size='sm'
        variant='outline'
        onClick={() => setCount((count < maxCount) ? count + 1 : maxCount)}
      >
        <Plus size='12' />
      </Button>
    </div>
  );
};

export default CountSelector;
