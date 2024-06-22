import { Link, Outlet } from 'react-router-dom';

const OrderLayout = () => {
  return (
    <>
      <div>OrderLayout</div>
      <Link to='/orders/cart'>장바구니</Link>
      <Link to='/orders/history'>주문내역</Link>
      <Link to='/orders/payment'>결제</Link>
      <Outlet />
    </>
  );
}

export default OrderLayout;