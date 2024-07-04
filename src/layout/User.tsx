import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '@/components/Main/MainHeader';
import Navigation from '@/components/Main/Navigation';
import CartDrawer from '@/components/Shared/CartDrawer';
import { Home } from 'lucide-react';

const UserLayout = () => {
  const location = useLocation();
  let isCardPage = false;

  let headerText = '';
  if (location.pathname === '/orders/payment') {
    headerText = '주문하기';
  }

  const handleRightIconClick = () => {

  }

  return (
    <div className='relative flex flex-col justify-between h-screen main'>
      <MainHeader
        title={headerText}
        isCardPage={isCardPage}
        rightIcon={Home}
        handleRightIconClick={handleRightIconClick}
      />
      <div className='pt-[50px] pb-16'>
        <Outlet />
      </div>
      <Navigation />
      <CartDrawer />
    </div>
  );
}

export default UserLayout;
