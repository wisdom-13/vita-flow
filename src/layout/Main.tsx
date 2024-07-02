import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '@/components/Main/MainHeader';
import Navigation from '@/components/Main/Navigation';
import CartDrawer from '@/components/Shared/CartDrawer';

const MainLayout = () => {
  const location = useLocation();
  let isCardPage = false;

  let headerText = '';
  if (location.pathname === '/') {
    headerText = '';
  } else if (location.pathname === '/vitamins') {
    headerText = '비타민 모아보기';
  } else if (location.pathname.startsWith('/vitamin/')) {
    headerText = '상세보기';
  } else if (location.pathname === '/cart') {
    headerText = '장바구니';
    isCardPage = true;
  }

  return (
    <div className='relative flex flex-col justify-between h-screen main'>
      <MainHeader title={headerText} isCardPage={isCardPage} />
      <div className='pt-[50px] pb-16'>
        <Outlet />
      </div>
      <Navigation />
      <CartDrawer />
    </div>
  );
}

export default MainLayout;
