import styles from './Modal.module.css';
import closeIcon from '../../public/icons/close.svg';
import Image from 'next/image';
import classNames from 'classnames';

interface DeleteLinkModalProps {
  data: {
    link: string;
  };
  closeModal: () => void;
}

const DeleteLinkModal = ({ data, closeModal }: DeleteLinkModalProps) => {
  const { link } = data;
  return (
    <>
      <div className={styles['box-text']}>
        <h2 className={styles.title}>링크 삭제</h2>
        <h3 className={styles['sub-text']}>{link}</h3>
      </div>
      <button className={classNames(styles.button, styles.red)}>삭제하기</button>
      <button className={styles.close} onClick={closeModal}>
        <Image src={closeIcon} alt="close-icon" width={24} height={24} />
      </button>
    </>
  );
};
export default DeleteLinkModal;
