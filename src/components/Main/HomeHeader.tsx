import { useAuth } from '@/context/AuthContext';
import { ClipboardPen, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
  const { user } = useAuth();

  return (
    <div className='top-0 right-0 left-0 fixed flex justify-between items-center bg-white m-auto px-6 border-b max-w-[598px] h-[50px]'>
      <div>
        <Link to='/'>
          <h1 className='font-Cafe24Ssurround text-primary text-xl cursor-pointer'>비타플로우</h1>
        </Link>
      </div>
      <div className='relative flex gap-x-4'>
        {user?.isSeller && (
          <Link to='/admin/products'>
            <ClipboardPen />
          </Link>
        )}
        <div>
          <ShoppingBag />
          <span className='-right-2 -bottom-1 absolute bg-primary px-1 rounded-full min-w-4 h-4 font-semibold text-center text-white text-xs cursor-pointer'>10</span>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
