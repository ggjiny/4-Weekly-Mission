import { useState } from 'react';
import styles from './Modal.module.css';
import Image from 'next/image';
import closeIcon from '../../public/icons/close.svg';

interface RenameFolderModalProps {
  closeModal: () => void;
}

const RenameFolderModal = ({ closeModal }: RenameFolderModalProps) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <div className={styles['box-text']}>
        <h2 className={styles.title}>폴더 이름 변경</h2>
      </div>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        placeholder="내용 입력"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.button}>변경하기</button>
      <button className={styles.close} onClick={closeModal}>
        <Image src={closeIcon} alt="close-icon" width={24} height={24} />
      </button>
    </>
  );
};
export default RenameFolderModal;
