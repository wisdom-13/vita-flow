import MenuItem from '@/components/admin/MenuItem';
import '@/styles/admin.css'
import { Home, Pill, PlusSquare, ShoppingBag } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className='flex'>
      <nav className='flex flex-col justify-between border-slate-200 bg-slate-50 p-4 pt-10 border-r w-60 h-screen'>
        <div>
          <h1 className='pb-8 pl-4 font-semibold text-2xl'>
            비타플로우
            <h6 className='mt-2 font-normal text-sm'>판매자 페이지</h6>
          </h1>
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