import { Link } from 'react-router-dom';
import SignUpForm from '@/features/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div className='flex flex-col w-4/6 m-auto h-[calc(100vh-48px)] justify-between py-16'>
      <SignUpForm />
      <div className='text-center'>
        <p className='text-sm'>회원이신가요?</p>
        <Link to='/auth/login' className='font-semibold'>로그인하여 시작하기</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
