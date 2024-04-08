import Image from 'next/image';
import eyeOn from '../../../public/icons/eye-on.svg';
import eyeOff from '../../../public/icons/eye-off.svg';
import { useState } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
}

export default function Input({ name, type, placeholder, register, errors }: InputProps) {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const error = errors[name];
  const handleEyeClick = () => {
    setIsEyeOpen((isEyeOpen) => !isEyeOpen);
  };
  return (
    <>
      <input
        className={classNames(styles.input, { [styles.error]: error?.message })}
        type={isEyeOpen ? 'text' : type}
        placeholder={placeholder}
        {...register}
      />
      {(name === 'password' || name === 'passwordCheck') && (
        <Image src={isEyeOpen ? eyeOn : eyeOff} alt="password-eye" onClick={handleEyeClick} />
      )}
      {error && <div className={styles.errorMessage}>{error?.message?.toString()}</div>}
    </>
  );
}
