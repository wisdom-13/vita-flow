import { useParams } from 'react-router-dom';

import { useProduct } from '@/hooks/useProduct';
import VitaminDetail from '@/components/Main/VitaminDetail';
import AddCartSection from '@/components/Main/AddCartSection';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorContext from '@/components/Shared/ErrorContext';

const VitaminDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-y-6 px-6 p-6'>
        <div className='flex items-center gap-x-4'>
          <Skeleton className='rounded-md w-36 h-36' />
          <div className='space-y-1 text-sm'>
            <Skeleton className='rounded-md w-44 h-10' />
            <Skeleton className='rounded-md w-20 h-6' />
          </div>
        </div>
        <div className='space-y-2'>
          <Skeleton className='rounded-md w-full h-8' />
          <Skeleton className='rounded-md w-full h-8' />
          <Skeleton className='rounded-md w-full h-8' />
        </div>
      </div>
    )
  }

  if (!id || !data || error) {
    return (
      <ErrorContext title='비타민 정보를 찾지 못했어요 😢' />
    )
  }

  return (
    <>
      <div className='flex flex-col gap-y-6 px-6 p-6'>
        <VitaminDetail product={data} />
      </div>
      <AddCartSection id={id} product={data} />
    </>
  );
}

export default VitaminDetailPage;