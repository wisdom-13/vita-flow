import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MainLayout = () => {
  return (
    <div className='flex flex-col justify-between h-screen main'>
      <Header />
      <div className='pt-[60px] pb-20'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
