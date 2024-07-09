import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { useProduct } from '@/hooks/useProduct';
import VitaminDetail from '@/components/Main/VitaminDetail';
import AddCartSection from '@/components/Main/AddCartSection';
import { Skeleton } from '@/components/ui/skeleton';
import MessageContent from '@/components/Shared/MessageContent';
import { Product } from '@/types/types';

const Meta = ({ vitamin }: { vitamin?: Product }) => {
  if (!vitamin) return

  return (
    <Helmet>
      <title>{vitamin.productName} - 비타플로우</title>
      <meta name="description" content={`${vitamin.productName}에 대한 상세 정보와 구매 옵션을 확인하세요.`} />
      <meta name="keywords" content={`비타플로우, ${vitamin.productName}, 비타민, 건강 보조제`} />
      <meta property="og:title" content={`${vitamin.productName} | 비타플로우`} />
      <meta property="og:description" content={`${vitamin.productName}에 대한 상세 정보와 구매 옵션을 확인하세요.`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://vita-flow.vercel.app/vitamin/${vitamin.id}`} />
      <meta property="og:image" content={vitamin.productImage} />
    </Helmet>
  )
}

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

  if (!id || !data || error || data.productStatus == false) {
    return (
      <MessageContent content='비타민 정보를 찾지 못했어요 😢' />
    )
  }

  return (
    <>
      <Meta vitamin={data} />
      <div className='flex flex-col gap-y-6 px-6 p-6'>
        <VitaminDetail product={data} />
      </div>
      <AddCartSection id={id} product={data} />
    </>
  );
}

export default VitaminDetailPage;