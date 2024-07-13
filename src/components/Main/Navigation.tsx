import { cn } from '@/lib/utils';
import { List, Home, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const atBottom = (windowHeight + scrollY + 20) >= documentHeight;

    if (atBottom) {
      setShowNav(true);
    } else {
      setShowNav(scrollY <= lastScrollY);
    }

    setLastScrollY(scrollY);
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={cn(
      'right-0 bottom-0 left-0 fixed flex justify-around bg-white m-auto p-2 border-t max-w-[600px] duration-300',
      showNav ? 'translate-y-0' : 'translate-y-full'
    )}>
      <Link to='/category' className='flex flex-col items-center gap-y-1 w-full'>
        <List />
        <span className='font-semibold text-xs cursor-pointer'>카테고리</span>
      </Link>
      {/* <Link to='/vitamins' className='flex flex-col items-center gap-y-1 w-full'>
        <Search />
        <span className='font-semibold text-xs cursor-pointer'>검색</span>
      </Link> */}
      <Link to='/' className='flex flex-col items-center gap-y-1 w-full'>
        <Home />
        <span className='font-semibold text-xs cursor-pointer'>홈</span>
      </Link>
      {/* <Link to='/mypage' className='flex flex-col items-center gap-y-1 w-full'>
        <Pill />
        <span className='font-semibold text-xs cursor-pointer'>내비타민</span>
      </Link> */}
      <Link to='/mypage' className='flex flex-col items-center gap-y-1 w-full'>
        <User2 />
        <span className='font-semibold text-xs cursor-pointer'>마이페이지</span>
      </Link>
    </div>
  );
}

export default Navigation;
