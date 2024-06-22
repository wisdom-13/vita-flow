import SignInForm from '@/features/SignInForm';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  return (
    <div className='flex flex-col w-4/6 m-auto h-[calc(100vh-48px)] justify-between py-16'>
      <SignInForm />
      <div className='text-center'>
        <p className='text-sm'>계정이 없으신가요?</p>
        <Link to='/auth/signup' className='font-semibold'>이메일로 회원가입</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
