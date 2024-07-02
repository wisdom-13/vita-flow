import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ClipboardPen, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface MainHeaderProps {
  title?: string;
  isCardPage?: boolean;
}

const MainHeader = ({ title, isCardPage = false }: MainHeaderProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, toggleCart } = useCart();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className='top-0 right-0 left-0 z-[9999] fixed flex justify-between items-center bg-white m-auto px-6 border-b max-w-[600px] h-[50px]'>
      {title != '' ? (
        <>
          <button onClick={handleBack}>
            <ChevronLeft />
          </button>
          <h1 className='font-semibold font-xl cursor-default'>{title}</h1>
        </>
      ) : (
        <div>
          <Link to='/'>
            <h1 className='font-Cafe24Ssurround text-primary text-xl cursor-pointer'>비타플로우</h1>
          </Link>
        </div>
      )}
      <div className='relative flex gap-x-4'>
        {user?.isSeller && title == '' && (
          <Link to='/admin/products'>
            <ClipboardPen />
          </Link>
        )}
        {!isCardPage && (
          <button onClick={toggleCart}>
            <ShoppingBag />
            {cart.length > 0 && (
              <span className='-right-2 -bottom-1 absolute bg-primary px-1 rounded-full min-w-4 h-4 font-semibold text-center text-white text-xs cursor-pointer'>
                {cart.length}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default MainHeader;
