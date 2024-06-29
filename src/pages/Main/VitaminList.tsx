import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import VitaminCardView from '@/components/Main/VitaminCardView';

const VitaminListPage = () => {
  const [sortBy, setSortBy] = useState('byDate');
  const [categories, setCategories] = useState<string[]>([]);

  const filters = { sortBy, productsState: true, categories };

  return (
    <>
      <div className='top-[50px] right-0 left-0 z-[9999] fixed flex justify-between items-center bg-white m-auto px-6 py-2 border-b max-w-[600px] h-[50px]'>
        <h3 className='font-semibold cursor-default'>전체</h3>
        <div>
          <Select defaultValue={sortBy} onValueChange={(v) => setSortBy(v)}>
            <SelectTrigger className='p-0 border-none w-24 h-8'>
              <SelectValue placeholder='정렬 방식을 선택하세요.' />
            </SelectTrigger>
            <SelectContent className='w-36' align='end'>
              <SelectItem value='byDate'>신상품순</SelectItem>
              <SelectItem value='byPriceLow'>낮은 가격순</SelectItem>
              <SelectItem value='byPriceHigh'>높은 가격순</SelectItem>
              <SelectItem value='bySales'>판매량순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex flex-col gap-y-6 mt-[50px] p-6'>
        <VitaminCardView filters={filters} />
      </div>
    </>
  );
}

export default VitaminListPage;