import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className='top-0 right-0 left-0 fixed flex justify-between items-center bg-white m-auto px-6 border-b max-w-[598px] h-[50px]'>
      <button onClick={handleBack}>
        <ChevronLeft />
      </button>
      <h1 className='font-semibold font-xl cursor-default'>{title}</h1>
      <div className='relative flex gap-x-4'>
        <div>
          <ShoppingBag />
          <span className='-right-2 -bottom-1 absolute bg-primary px-1 rounded-full min-w-4 h-4 font-semibold text-center text-white text-xs cursor-pointer'>10</span>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
