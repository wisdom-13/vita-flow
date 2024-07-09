

import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import CardViewSection from '@/components/Main/CardViewSection';
import { vitaminData } from '@/lib/common';

import CategoryItem from '@/components/Main/CategoryItem';
import MainSwiper from '@/components/Main/MainSwiper';
import { Helmet } from 'react-helmet-async';

const Meta = () => (
  <Helmet>
    <title>VITAFLOW | 비타플로우</title>
    <meta name="description" content="비타플로우에서 나에게 필요한 비타민과 건강 보조제를 만나보세요." />
    <meta name="keywords" content="비타플로우, 비타민, 건강, 보조제, 영양제" />
    <meta property="og:title" content="비타플로우 - 나에게 딱 맞는 비타민 찾기" />
    <meta property="og:description" content="비타플로우에서 나에게 필요한 비타민과 건강 보조제를 만나보세요." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://vita-flow.vercel.app" />
  </Helmet>
)

const HomePage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex flex-col gap-y-8 px-6 p-6'>
        <div className='flex flex-col gap-y-4'>
          <Skeleton className="rounded-md w-full h-44" />
          <Skeleton className="rounded-md w-full h-44" />
        </div>
        <div>
          <Skeleton className="mb-4 rounded-md w-36 h-8" />
          <Skeleton className="rounded-md w-full h-[136px]" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Meta />
      <div className='flex flex-col gap-y-8 px-6 p-6'>
        <MainSwiper />
        <div>
          <h1 className='mb-4 font-semibold text-xl'>비타민 종류별 보기</h1>
          <div className='gap-2 grid grid-cols-3 md:grid-cols-5 grid-rows-2'>
            {vitaminData.slice(0, 10).map((item) => (
              <CategoryItem key={item.key} category={item.key} text={item.name.replace(/ /g, '\n')} />
            ))}
          </div>
        </div>
        <div>
          {
            user ? (
              <>
                <CardViewSection
                  title={`${user.nickname}님을 위한 추천 영양제`}
                  filters={{ pageSize: 6, productsState: true }}
                />
              </>
            ) : (
              <>
                <CardViewSection
                  title={`많이 찾는 영양제`}
                  filters={{ pageSize: 6, sortBy: 'bySales', productsState: true }}
                />
              </>
            )
          }
        </div>
      </div>
    </>
  );
}

export default HomePage;