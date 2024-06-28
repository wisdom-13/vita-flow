import { Outlet } from 'react-router-dom';

import HomeHeader from '@/components/Main/HomeHeader';
import Navigation from '@/components/Main/Navigation';

const MainLayout = () => {
  return (
    <div className='flex flex-col justify-between h-screen main'>
      <HomeHeader />
      <div className='pt-[60px] pb-20'>
        <Outlet />
      </div>
      <Navigation />
    </div>
  );
}

export default MainLayout;
