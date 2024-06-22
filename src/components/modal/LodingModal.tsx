import { Spinner } from '@/components/Spinner';
import { useLoading } from '@/context/LoadingContext';

const LodingModal = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className='fixed inset-0 z-[99999] w-[600px] m-auto bg-white/60  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
      <div className='fixed left-[50%] top-[50%] z-[99999] translate-x-[-50%] translate-y-[-50%] border bg-background p-6 shadow-lg duration-200 rounded-lg'>
        <Spinner size='lg' />
      </div>
    </div>
  );
}

export default LodingModal;