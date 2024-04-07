import Image from 'next/image';
import Link from 'next/link';
import logoIcon from '../public/icons/logo.svg';
import googleImg from '../public/images/google.png';
import kakaoImg from '../public/images/kakao.png';
import styles from '@/styles/signin.module.css';
import Input from '@/components/common/form/Input';
import { useForm } from 'react-hook-form';
import { postLoginForm } from './api/signAPI';
import { redirectPage } from '@/lib/utils';

interface LoginFormData {
  email: string;
  password: string;
}
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ mode: 'onBlur' });

  const emailValidation = register('email', {
    required: {
      value: true,
      message: '이메일을 입력해 주세요.',
    },
    pattern: {
      value:
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      message: '올바른 이메일 주소가 아닙니다.',
    },
  });

  const passwordValidation = register('password', {
    required: {
      value: true,
      message: '비밀번호를 입력해 주세요.',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await postLoginForm(data);
    if (result) {
      const accessToken = result.data.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        redirectPage('folder');
      }
    } else {
      setError('email', { message: '이메일을 확인해주세요.' });
      setError('password', { message: '비밀번호를 확인해주세요.' });
    }
  };
  return (
    <div className={styles.signin}>
      <div>
        <Link href="/">
          <Image src={logoIcon} alt="logo" id={styles.logo} width={210.58} height={38} />
        </Link>
        <h2>
          회원이 아니신가요? <Link href="/signup">회원 가입하기</Link>
        </h2>
      </div>
      <form className={styles.signForm} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <Input
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          register={emailValidation}
          errors={errors}
        />
        <label htmlFor="password">비밀번호</label>
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          register={passwordValidation}
          errors={errors}
        />
        <button type="submit">로그인</button>
      </form>

      <div>
        <p>소셜 로그인</p>
        <div>
          <Link href="https://www.google.com">
            <Image src={googleImg} width={42} height={42} alt="google-login" />
          </Link>
          <Link href="https://www.kakaocorp.com/page">
            <Image src={kakaoImg} width={42} height={42} alt="kakao-login" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
