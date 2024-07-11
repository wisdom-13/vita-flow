import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

import { toast } from "sonner"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoading } from '@/context/LoadingContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: '2-10자 사이의 닉네임을 설정해주세요.' })
    .max(10, { message: '2-10자 사이의 닉네임을 설정해주세요.' }),
  email: z
    .string()
    .email({ message: '유효한 형식의 이메일을 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.' })
    .regex(/[!@#$%^&*(),.?':{}|<>]/, { message: '특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.' }),
});

export const useSignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setLoading } = useLoading();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      await updateProfile(user, { displayName: values.nickname });

      await setDoc(doc(db, 'users', user.uid), {
        email: values.email,
        password: values.password,
        isSeller: false,
        nickname: values.nickname,
        createAt: Timestamp.now(),
        updateAt: Timestamp.now(),
      });

      setUser({
        uid: user.uid,
        email: values.email,
        nickname: values.nickname,
        isSeller: false,
      });

      toast.success('회원가입이 완료되었습니다!');
      navigate('/');

    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('이미 가입된 이메일입니다.');
      } else {
        toast.error('회원가입 중 오류가 발생했습니다.');
      }

    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit,
  };
};
