import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '@/components/Main/MainHeader';
import Navigation from '@/components/Main/Navigation';
import CartDrawer from '@/components/Shared/CartDrawer';
import { useCart } from '@/context/CartContext';

const UserLayout = () => {
  const location = useLocation();
  const { cart, toggleCart } = useCart();

  let title = '';
  let cartIconHidden = false;
  if (location.pathname === '/orders/payment') {
    title = '주문하기';
    cartIconHidden = true;
  } else if (location.pathname === '/mypage') {
    title = '마이페이지';
  } else if (location.pathname === '/mypage/history') {
    title = '주문/배송 내역';
  } else if (location.pathname === '/mypage/info') {
    title = '내정보';
  }

  return (
    <div className='relative flex flex-col justify-between h-[100vh-80px] md:h-screen main'>
      <MainHeader>
        <MainHeader.BackButton />
        <MainHeader.Title title={title} />
        <MainHeader.RightSection>
          <MainHeader.CartIcon cartLength={cart.filter((item) => !item.isPayment).length} isHidden={cartIconHidden} toggleCart={toggleCart} />
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

export default UserLayout;
