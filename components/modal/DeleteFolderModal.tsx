import styles from './Modal.module.css';
import closeIcon from '../../public/icons/close.svg';
import classNames from 'classnames';
import Image from 'next/image';

interface Data {
  name: string;
}
interface DeleteFolderModalProps {
  data: Data;
  closeModal: () => void;
}

const DeleteFolderModal = ({ data, closeModal }: DeleteFolderModalProps) => {
  return (
    <>
      <div className={styles['box-text']}>
        <h2 className={styles.title}>폴더 삭제</h2>
        <h3 className={styles['sub-text']}>{data.name}</h3>
      </div>
      <button className={classNames(styles.button, styles.red)}>삭제하기</button>
      <button className={styles.close} onClick={closeModal}>
        <Image src={closeIcon} alt="close-icon" width={24} height={24} />
      </button>
    </>
  );
};
export default DeleteFolderModal;
