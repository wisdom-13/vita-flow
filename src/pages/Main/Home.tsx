import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import useAuth from '@/hooks/useAuth';

import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <div>home</div>
      {loading && <Spinner />}
      {
        user ? (
          <>
            <div>
              {user?.displayName}님 환영합니다.
            </div>
            <Button onClick={() => signOut(auth)}>로그아웃</Button>
          </>
        ) : (
          <Button>
            <Link to='/auth/login'>로그인</Link>
          </Button>
        )
      }

    </>
  );
}

export default HomePage;