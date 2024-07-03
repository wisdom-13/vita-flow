import SignInForm from '@/components/Auth/SignInForm';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <div className='flex flex-col justify-between m-auto py-16 w-4/6 h-[calc(100vh-48px)]'>
      <SignInForm />
      <div className='text-center'>
        <p className='text-sm'>계정이 없으신가요?</p>
        <Link to='/auth/signup' className='font-semibold'>이메일로 회원가입</Link>
      </div>
    </div>
  );
};

export default SignInPage;
