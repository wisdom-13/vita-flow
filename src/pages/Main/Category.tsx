import { Helmet } from 'react-helmet-async';
import { vitaminData, symptomData } from '@/lib/common';
import CategoryItem from '@/components/Main/CategoryItem';

const Meta = () => (
  <Helmet>
    <title>카테고리 | 비타플로우</title>
    <meta name="description" content="비타플로우에서 다양한 비타민과 증상별 카테고리를 확인하세요." />
    <meta name="keywords" content="비타플로우, 비타민, 증상별 비타민, 건강 보조제" />
    <meta property="og:title" content="카테고리 | 비타플로우" />
    <meta property="og:description" content="비타플로우에서 다양한 비타민과 증상별 카테고리를 확인하세요." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://vita-flow.vercel.app/category" />
  </Helmet>
);

const CategoryPage = () => {
  return (
    <>
      <Meta />
      <div className='flex flex-col gap-y-4 p-6'>
        <CategoryItem text='전체 상품 보기' size='md' color='primary' />
        <h1 className='font-semibold text-xl'>증상별 모아보기</h1>
        <div className='gap-4 grid grid-cols-2'>
          {symptomData.map((item) => (
            <CategoryItem key={item.key} category={item.key} text={item.example} />
          ))}
        </div>
        <h1 className='mt-4 font-semibold text-xl'>비타민별 모아보기</h1>
        <div className='gap-4 grid grid-cols-3 md:grid-cols-4'>
          {vitaminData.map((item) => (
            <CategoryItem key={item.key} category={item.key} text={item.name.replace(/ /g, '\n')} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;