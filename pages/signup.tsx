import Image from 'next/image';
import Link from 'next/link';
import logoIcon from '../public/icons/logo.svg';
import googleImg from '../public/images/google.png';
import kakaoImg from '../public/images/kakao.png';
import styles from '@/styles/signin.module.css';
import Input from '@/components/common/form/Input';
import { useForm } from 'react-hook-form';
import { postCheckEmail, postRegisterForm } from './api/signAPI';
import { redirectPage } from '@/lib/utils';

interface RegisterFormData {
  email: string;
  password: string;
  passwordCheck: string;
}

const SignUp = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ mode: 'onBlur' });

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
    validate: async (value) => {
      const data = await postCheckEmail(value);

      if (data === undefined) return '이미 사용 중인 이메일입니다.';
    },
  });

  const passwordValidation = register('password', {
    required: {
      value: true,
      message: '비밀번호를 입력해 주세요.',
    },
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
      message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
    },
  });

  const passwordCheckValidation = register('passwordCheck', {
    required: {
      value: true,
      message: '비밀번호 확인을 입력해 주세요.',
    },
    validate: (value) => {
      if (watch('password') !== value) return '비밀번호가 일치하지 않아요.';
    },
  });

  const onSubmitForm = async (data: RegisterFormData) => {
    const result = await postRegisterForm({ email: data.email, password: data.password });
    if (result) {
      const accessToken = result.data.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        redirectPage('folder');
      }
    }
  };
  return (
    <div className={styles.signin}>
      <div>
        <Link href="/">
          <Image src={logoIcon} alt="logo" id={styles.logo} width={210.58} height={38} />
        </Link>
        <h2>
          회원이 아니신가요? <Link href="/signin">회원 가입하기</Link>
        </h2>
      </div>
      <form className={styles.signForm} onSubmit={handleSubmit(onSubmitForm)}>
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
          placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
          register={passwordValidation}
          errors={errors}
        />
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <Input
          name="passwordCheck"
          type="password"
          placeholder="비밀번호와 일치하는 값을 입력해 주세요."
          register={passwordCheckValidation}
          errors={errors}
        />
        <button type="submit">회원가입</button>
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

export default SignUp;
