import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VitaminDetail from '@/components/Main/VitaminDetail';

const VitaminDetailPage = () => {
  const { id } = useParams();

  if (!id) {
    return
  }

  return (
    <>
      <div className='flex flex-col gap-y-6 px-6 p-6'>
        <VitaminDetail productId={id} />
      </div>
      <div className='right-0 bottom-0 left-0 z-[9999] fixed bg-white m-auto px-6 py-4 border-t max-w-[600px]'>
        <Button className='w-full' size='lg'>구매하기</Button>
      </div>
    </>
  );
}

export default VitaminDetailPage;