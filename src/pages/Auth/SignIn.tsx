import { useEffect, useState } from 'react';

import { auth } from '@/config/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const SignInPage = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    })
  }, [])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const signUp = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('user with signUp', userCredential);

    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('user with signIn', userCredential);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await signOut(auth);
  };

  return (
    <div className='App'>
      <h2>로그인 페이지</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input
            type='email'
            value={email}
            name='email'
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type='password'
            value={password}
            name='password'
            onChange={onChange}
            required
          ></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
      </form>
    </div>
  );
};



export default SignInPage;