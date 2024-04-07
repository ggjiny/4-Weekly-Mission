import Image from 'next/image';
import eyeOn from '../../../public/icons/eye-on.svg';
import eyeOff from '../../../public/icons/eye-off.svg';
import { ChangeEvent, useState } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

interface InputProps {
  //name: string;
  // type: 'text' | 'password' | 'email';
  //value: string;
  //onChange: (name: string, value: string) => void;
  placeholder: string;
}

const validateFunc = (input: string) => {
  return input.length > 4;
};

export default function Input({ placeholder = '' }: InputProps) {
  const [eye, setEye] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const customType = type === 'password' ? (eye ? 'text' : 'password') : type;
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   onChange(name, e.target.value);
  // };

  const handleEyeClick = () => {
    setEye(!eye);
  };
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValid(validateFunc(e.target.value));
  };

  return (
    <>
      <input
        className={classNames(styles.input, { [styles.error]: !isValid })}
        name={name}
        // value={value}
        type={customType}
        onBlur={handleBlur}
        // onChange={handleChange}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <Image src={eye ? eyeOn : eyeOff} alt="password-eye" onClick={handleEyeClick} />
      )}
      {!isValid && <div className={styles.errorMessage}>내용을 다시 작성해주세요</div>}
    </>
  );
}
