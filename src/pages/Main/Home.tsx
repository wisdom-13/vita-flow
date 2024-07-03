
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import CardViewSection from '@/components/Main/CardViewSection';
import { symptomData, vitaminData } from '@/lib/common';
import { pickRandomElements } from '@/lib/utils';
import SymptomBanner from '@/components/Main/SymptomBanner';
import CategoryItem from '@/components/Main/CategoryItem';

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
    <div className='flex flex-col gap-y-8 px-6 p-6'>
      <div className='flex flex-col gap-y-4'>
        {pickRandomElements(symptomData, 2).map((item) => (
          <SymptomBanner key={item.key} symptom={item} />
        ))}

      </div>
      <div>
        <h1 className='mb-4 font-semibold text-xl'>비타민 종류별 보기</h1>
        <div className='gap-2 grid grid-cols-5 grid-rows-2'>
          {vitaminData.slice(0, 10).map((item) => (
            <CategoryItem key={item.key} link={`/category/${item.key}`} text={item.name.replace(/ /g, '\n')} />
          ))}
        </div>
      </div>
      <div>
        {
          user ? (
            <>
              <CardViewSection
                title={`${user.nickname}님을 위한 추천 영양제`}
                filters={{ pageSize: 3 }}
              />
            </>
          ) : (
            <>
              <CardViewSection
                title={`많이 찾는 영양제`}
                filters={{ pageSize: 3, sortBy: 'bySales' }}
              />
            </>
          )
        }
      </div>
    </div>
  );
}

export default HomePage;