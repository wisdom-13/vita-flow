import { Link } from 'react-router-dom';
import SignUpForm from '@/components/Auth/SignUpForm';

const SignUpPage = () => {
  return (
    <div className='flex flex-col justify-between m-auto py-16 w-5/6 md:w-2/3 h-[calc(100vh-48px)]'>
      <SignUpForm />
      <div className='text-center'>
        <p className='text-sm'>회원이신가요?</p>
        <Link to='/auth/login' className='font-semibold'>로그인하여 시작하기</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
