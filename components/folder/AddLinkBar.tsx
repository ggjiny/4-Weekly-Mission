import styles from './AddLinkBar.module.css';
import link from '../../public/icons/link.svg';
import ModalPortal from '../common/ModalPortal';
import Modal from '../modal/Modal';
import { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';

interface AddLinkBarProps {
  barRef: React.RefObject<HTMLDivElement>;
  folderData: any;
}

const AddLinkBar = ({ barRef, folderData }: AddLinkBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <header>
      <div className={styles.container} ref={barRef}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Image id={styles.icon} src={link} alt="add-icon" width={20} height={20} />
          <input
            className={styles.bar}
            type="text"
            name="add-bar"
            placeholder="링크를 추가해 보세요."
            value={value}
            onChange={handleChange}
          />
          <button type="submit" className={styles.button} onClick={() => setIsModalOpen(true)}>
            추가하기
          </button>
        </form>
      </div>
      {isModalOpen && (
        <ModalPortal>
          <Modal
            action="add-link"
            data={{ link: value, folderList: folderData }}
            closeModal={() => setIsModalOpen(false)}
          />
        </ModalPortal>
      )}
    </header>
  );
};
export default AddLinkBar;
