import { HomeIcon } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const AuthLayout = () => {
  const location = useLocation();
  const headerText = location.pathname === '/signup' ? '회원가입' : '로그인';

  return (
    <div className='w-full h-screen'>
      <header className='flex items-center justify-between h-12 px-4'>
        <Link to='/'><HomeIcon size='24' /></Link>
        <h1 className='font-semibold text-lg'>{headerText}</h1>
        <div className='w-6'></div>
      </header>
      <Outlet />
    </div>
  );
}

export default AuthLayout;