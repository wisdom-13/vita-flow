import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const { user, isLoading } = useAuth();

  return (
    <>
      <div>home</div>
      {isLoading ? (
        <Spinner />
      ) : (
        user ? (
          <>
            <div>
              {user.nickname}님 환영합니다.
            </div>
            <Button onClick={() => signOut(auth)}>로그아웃</Button>
            {user.isSeller && (
              <Link to='/admin/products'><Button>관리자</Button></Link>
            )}
          </>
        ) : (
          <Button>
            <Link to='/auth/login'>로그인</Link>
          </Button>
        )
      )}
    </>
  );
}

export default HomePage;