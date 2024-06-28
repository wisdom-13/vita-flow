import { Outlet } from 'react-router-dom';
import LeftMenu from '@/components/Admin/LeftMenu';

const AdminLayout = () => {
  return (
    <div className='flex admin'>
      <LeftMenu />
      <section className='flex flex-col gap-y-8 p-10 w-full h-screen overflow-y-scroll'>
        <Outlet />
      </section>
    </div>
  );
}

export default AdminLayout;