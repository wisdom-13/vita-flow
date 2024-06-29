import CategoryItem from '@/components/Main/CategoryItem';
import { vitaminData, symptomData } from '@/lib/common';

const CategoryPage = () => {
  return (
    <div className='flex flex-col gap-y-4 p-6'>
      <CategoryItem link={'/vitamins'} text='전체 상품 보기' size='md' />
      <h1 className='font-semibold text-xl'>증상별 모아보기</h1>
      <div className='gap-4 grid grid-cols-2'>
        {symptomData.map((item) => (
          <CategoryItem key={item.key} link={`/category/${item.key}`} text={item.example} />
        ))}
      </div>
      <h1 className='mt-4 font-semibold text-xl'>비타민별 모아보기</h1>
      <div className='gap-4 grid grid-cols-4'>
        {vitaminData.map((item) => (
          <CategoryItem key={item.key} link={`/category/${item.key}`} text={item.name.replace(/ /g, '\n')} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;