import { List, Home, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className='right-0 bottom-0 left-0 fixed flex justify-around bg-muted m-auto p-2 max-w-[600px]'>
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
