import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '@/components/Main/MainHeader';
import Navigation from '@/components/Main/Navigation';
import CartDrawer from '@/components/Shared/CartDrawer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const MainLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { cart, toggleCart } = useCart();

  let title = '';
  let isCartPage = false;
  let isMain = false;

  if (location.pathname === '/') {
    isMain = true;
  } else if (location.pathname.startsWith('/category')) {
    title = '카테고리';
  } else if (location.pathname === '/vitamins') {
    title = '비타민 모아보기';
  } else if (location.pathname.startsWith('/vitamin/')) {
    title = '상세보기';
  } else if (location.pathname === '/cart') {
    title = '장바구니';
    isCartPage = true;
  }

  return (
    <div className='relative flex flex-col justify-between h-[100vh-200px] md:h-screen main'>
      <MainHeader>
        {!isMain && <MainHeader.BackButton />}
        <MainHeader.Title title={title} isMain={isMain} />
        <MainHeader.RightSection>
          <MainHeader.UserIcon isSeller={user?.isSeller && isMain} />
          <MainHeader.CartIcon cartLength={cart.filter((item) => !item.isPayment).length} isHidden={isCartPage} toggleCart={toggleCart} />
        </MainHeader.RightSection>
      </MainHeader>
      <div className='pt-[50px] pb-16'>
        <Outlet />
      </div>
      <Navigation />
      <CartDrawer />
    </div>
  );
}

export default MainLayout;
