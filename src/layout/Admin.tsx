import MenuItem from '@/components/admin/MenuItem';
import { Home, Pill, PlusSquare, ShoppingBag } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className='flex admin'>
      <nav className='flex flex-col justify-between border-slate-200 bg-slate-50 p-4 pt-10 border-r w-60 h-screen'>
        <div>
          <div className='pb-10 pl-4'>
            <h1 className='font-semibold text-2xl'>비타플로우</h1>
            <h6 className='font-normal text-sm'>판매자 페이지</h6>
          </div>
          <div className='flex flex-col gap-y-4'>
            <MenuItem
              icon={ShoppingBag}
              to='/admin/orders'
              text='주문 관리'
              active={pathname == '/admin/orders'}
            />
            <MenuItem
              icon={Pill}
              to='/admin/products'
              text='주문 관리'
              active={pathname == '/admin/products'}
            />
            <MenuItem
              icon={PlusSquare}
              to='/admin/product/new'
              text='상품 등록'
              active={pathname == '/admin/products/new'}
            />
          </div>
        </div>
        <MenuItem
          icon={Home}
          to='/'
          text='홈'
        />
      </nav>
      <section className='flex flex-col gap-y-8 p-10 w-full h-screen overflow-y-scroll'>
        <Outlet />
      </section>
    </div >
  );
}

export default AdminLayout;