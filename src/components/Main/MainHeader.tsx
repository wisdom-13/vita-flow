import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, ClipboardPen } from 'lucide-react';

interface MainHeaderProps {
  children: ReactNode
}

const MainHeader = ({ children }: MainHeaderProps) => {
  return (
    <div className='top-0 right-0 left-0 z-[9999] fixed flex justify-between items-center bg-white m-auto px-6 border-b max-w-[600px] h-[50px]'>
      {children}
    </div>
  );
};

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button onClick={handleBack}>
      <ChevronLeft />
    </button>
  );
};

const Title = ({ title, isMain }: { title: string, isMain?: boolean }) => (
  isMain ? (
    <Link to='/'>
      <h1 className='font-Cafe24Ssurround text-primary text-xl cursor-pointer'>비타플로우</h1>
    </Link>
  ) : (
    <h1 className='font-semibold font-xl cursor-default'>{title}</h1>
  )
);

const RightSection = ({ children }: MainHeaderProps) => (
  <div className='relative flex gap-x-4'>
    {children}
  </div>
)

const UserIcon = ({ isSeller }: { isSeller?: boolean }) => (
  isSeller ? (
    <Link to='/admin/products'>
      <ClipboardPen />
    </Link>
  ) : null
);

const CartIcon = ({ cartLength, isCartPage, toggleCart }: { cartLength: number, isCartPage?: boolean, toggleCart: () => void }) => (
  !isCartPage ? (
    <button onClick={toggleCart}>
      <ShoppingBag />
      {cartLength > 0 && (
        <span className='-right-2 -bottom-1 absolute bg-primary px-1 rounded-full min-w-4 h-4 font-semibold text-center text-white text-xs cursor-pointer'>
          {cartLength}
        </span>
      )}
    </button>) : (null)
);

const RightIcon = ({ Icon, handleClick }: { Icon: React.ComponentType, handleClick: () => void }) => (
  <button onClick={handleClick}>
    <Icon />
  </button>
);

MainHeader.BackButton = BackButton;
MainHeader.Title = Title;
MainHeader.RightSection = RightSection;
MainHeader.UserIcon = UserIcon;
MainHeader.CartIcon = CartIcon;
MainHeader.RightIcon = RightIcon;

export default MainHeader;
