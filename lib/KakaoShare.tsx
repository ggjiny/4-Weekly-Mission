import React, { useEffect } from 'react';
import kakaoIcon from '../public/icons/kakao.svg';
import styles from './KakaoShare.module.css';
import Image from 'next/image';

declare global {
  interface Window {
    Kakao: any;
  }
}
interface KakaoShareProps {
  folderId: string;
}

const KakaoShare = ({ folderId }: KakaoShareProps) => {
  const kakao = window.Kakao;
  const url: string = `http://localhost:3000/shared/${folderId}`;
  useEffect(() => {
    kakao.cleanup();
    kakao.init(process.env.NEXT_PUBLIC_REACT_APP_KAKAO_KEY);
    console.log(kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '예진 Linkbrary',
        description: 'codeit sprint 4기 part2!',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    });
  };

  return (
    <div className={styles.box}>
      <div id={styles.kakao} onClick={shareKakao}>
        <Image src={kakaoIcon} alt="kakao" width={18.4} height={18.4} />
      </div>
      카카오톡
    </div>
  );
};
export default KakaoShare;
