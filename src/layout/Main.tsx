import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '@/components/Main/MainHeader';
import Navigation from '@/components/Main/Navigation';

const MainLayout = () => {
  const location = useLocation();

  let headerText = '';
  if (location.pathname === '/') {
    headerText = '';
  } else if (location.pathname === '/vitamins') {
    headerText = '비타민 모아보기';
  } else if (location.pathname.startsWith('/vitamin/')) {
    headerText = '상세보기';
  }

  return (
    <div className='flex flex-col justify-between h-screen main'>
      <MainHeader title={headerText} />
      <div className='pt-[50px] pb-16'>
        <Outlet />
      </div>
      <Navigation />
    </div>
  );
}

export default MainLayout;
