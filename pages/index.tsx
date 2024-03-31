import Input from '@/components/common/form/Input';
import { useState } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState({
    email: '',
    pw: '',
    pwValid: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  return (
    <>
      <form>
        <label htmlFor="email">이메일</label>
        <Input
          name="email"
          type="email"
          value={userInput.email}
          onChange={handleInputChange}
          placeholder="이메일 입력"
        />

        <label htmlFor="pw">비밀번호</label>
        <Input
          name="pw"
          type="password"
          value={userInput.pw}
          onChange={handleInputChange}
          placeholder="비밀번호 입력"
        />

        <label htmlFor="pwValid">비밀번호 확인</label>
        <Input
          name="pwValid"
          type="password"
          value={userInput.pwValid}
          onChange={handleInputChange}
          placeholder="비밀번호 확인 입력"
        />
      </form>
    </>
  );
}
