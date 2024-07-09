import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import VitaminCardView from '@/components/Main/VitaminCardView';

const Meta = ({ categories }: { categories?: string }) => {
  categories = categories ? categories : '전체';

  return (
    <Helmet>
      <title>{categories} | 비타플로우</title>
      <meta name="description" content="비타플로우에서 다양한 비타민을 확인하고 선택하세요." />
      <meta name="keywords" content="비타플로우, 비타민 리스트, 비타민, 건강 보조제" />
      <meta property="og:title" content={`${categories} | 비타플로우`} />
      <meta property="og:description" content="비타플로우에서 다양한 비타민을 확인하고 선택하세요." />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}

const VitaminListPage = () => {
  const { key } = useParams();

  const [sortBy, setSortBy] = useState('byDate');
  const [categories, _] = useState<string[]>(key ? [key] : []);

  const filters = { sortBy, productsState: true, categories };

  return (
    <>
      <Meta categories={categories.join(', ')} />
      <div className='top-[50px] right-0 left-0 z-[9999] fixed flex justify-between items-center bg-white m-auto px-6 py-2 border-b max-w-[600px] h-[50px]'>
        <h3 className='font-semibold cursor-default'>{key ? key : '전체'}</h3>
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