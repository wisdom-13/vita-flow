import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-6 h-[calc(100vh-100px)] main'>
      <div className='font-semibold text-3xl'>
        길을 잃었어요 😢
      </div>
      <Link to='/'>
        <Button>메인으로 돌아가기</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;