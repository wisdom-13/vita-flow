import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <div>AdminLayout</div>
      <Link to='/admin/orders'>주문 관리</Link>
      <Link to='/admin/products'>상품 관리</Link>
      <Link to='/admin/product/new'>상품 등록</Link>
      <Outlet />
    </>
  );
}

export default AdminLayout;