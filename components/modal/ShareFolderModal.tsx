import styles from './Modal.module.css';
import Image from 'next/image';

import closeIcon from '../../public/icons/close.svg';
import facebookIcon from '../../public/icons/facebook.svg';
import linkIcon from '../../public/icons/link.svg';
import KakaoShare from '@/lib/KakaoShare';

interface ShareFolderModalProps {
  data: {
    name: string;
    id: string;
  };
  closeModal: () => void;
}

const ShareFolderModal = ({ data, closeModal }: ShareFolderModalProps) => {
  const BASE_URL = 'http://localhost:3000';

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };
  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${BASE_URL}/shared/${data.id}`,
      '페이스북 공유하기',
      'width=600,height=800,location=no,status=no,scrollbars=yes'
    );
  };

  return (
    <>
      <div className={styles['box-text']}>
        <h2 className={styles.title}>폴더 공유</h2>
        <h3 className={styles['sub-text']}>{data.name}</h3>
      </div>
      <div className={styles['sns-box']}>
        <KakaoShare folderId={data.id} />
        <div className={styles['icon-box']} onClick={handleFacebookShare}>
          <div id={styles.facebook}>
            <Image src={facebookIcon} alt="facebook" width={18} height={18} />
          </div>
          페이스북
        </div>
        <div
          className={styles['icon-box']}
          onClick={() => handleCopyClipBoard(`${BASE_URL}/shared`)}
        >
          <div id={styles.link}>
            <Image src={linkIcon} alt="link" width={18} height={18} />
          </div>
          링크복사
        </div>
      </div>
      <button className={styles.close} onClick={closeModal}>
        <Image src={closeIcon} alt="close-icon" width={24} height={24} />
      </button>
    </>
  );
};
export default ShareFolderModal;
