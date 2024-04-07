import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoIcon from '../public/icons/logo.svg';
import googleImg from '../public/images/google.png';
import kakaoImg from '../public/images/kakao.png';
import styles from '@/styles/signin.module.css';
import Input from '@/components/common/form/Input';
import { useForm } from 'react-hook-form';

const signin = () => {
  const { register, handleSubmit } = useForm();
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
      <form className={styles.signForm} onSubmit={handleSubmit((data) => console.log(data))}>
        <label htmlFor="email">이메일</label>
        <Input
          //name="email"
          // type="email"
          placeholder="이메일을 입력해 주세요."
          {...register('email')}
        />
        <label htmlFor="password">이메일</label>
        <Input
          // name="password"
          // type="password"
          // value={}
          // onChange={}
          placeholder="비밀번호를 입력해 주세요."
          {...register('password')}
        />
      </form>
      <button>로그인</button>
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

export default signin;
