import { Spinner } from '@/components/Spinner';
import { useLoading } from '@/context/LoadingContext';

const LoadingModal = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className='z-[99999] fixed inset-0 bg-white/60 m-auto data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
      <div className='top-[50%] left-[50%] z-[99999] fixed bg-background shadow-lg p-6 border rounded-lg translate-x-[-50%] translate-y-[-50%] duration-200'>
        <Spinner size='lg' />
      </div>
    </div>
  );
}

export default LoadingModal;