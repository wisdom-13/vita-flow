import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';

const MypagePage = () => {
  const { user } = useAuth();
  if (!user) return

  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <div className='relative flex flex-col gap-y-6 p-6'>
      <div className='bg-muted p-8 rounded-md cursor-default'>
        <h3 className='font-semibold text-2xl'>{user.nickname}님 안녕하세요!</h3>
        <p>{user.email}</p>
      </div>
      <div className='flex flex-col gap-y-4 mt-8 font-semibold text-xl'>
        <Link to='/mypage/history'>주문/배송 내역</Link>
        <Link to='/mypage/history'>내 정보</Link>
        <Link to='/mypage/history'>내 피타민 정보</Link>
      </div>
      <div className='mt-10'>
        <div className='text-muted-foreground' onClick={handleLogout}>로그아웃</div>
      </div>
    </div>
  );
}

export default MypagePage;