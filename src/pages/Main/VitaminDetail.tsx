import { useParams } from 'react-router-dom';

import { useProduct } from '@/hooks/useProduct';
import VitaminDetail from '@/components/Main/VitaminDetail';
import AddCartSection from '@/components/Main/AddCartSection';
import { Skeleton } from '@/components/ui/skeleton';

const VitaminDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useProduct(id);


  if (isLoading || !data || error) {
    return (
      <>
        <Skeleton />
      </>
    )
  }

  if (isLoading || !data || error) {
    return
  }

  return (
    <>
      <div className='flex flex-col gap-y-6 px-6 p-6'>
        <VitaminDetail product={data} />
      </div>
      <AddCartSection
        productQuantity={data.productQuantity}
        productPrice={data.productPrice}
      />
    </>
  );
}

export default VitaminDetailPage;