import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';

import { toast } from "sonner"
import { useForm } from 'react-hook-form';
import { useLoading } from '@/context/LoadingContext';
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      toast.success('환영합니다!');
      navigate('/')

    } catch (error: any) {
      toast.error('아이디 또는 비밀번호를 확인해주세요.');

    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit,
  };
};
