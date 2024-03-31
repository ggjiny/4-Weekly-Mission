import styles from './Nav.module.css';
import logoIcon from '../../public/icons/logo.svg';
import useAsync from '../hooks/useAsync';
import { getUserInfo } from '@/pages/api/api';
import Image from 'next/image';
import Link from 'next/link';

interface UserInfoProps {
  email: string;
  imgSrc: string;
}
interface UserData {
  email: string;
  image_source: string;
}

const UserInfo = ({ email, imgSrc }: UserInfoProps) => {
  return (
    <div className={styles.userInfo}>
      <Image id={styles.img} src={imgSrc} alt="userImage" width={28} height={28} />
      <span id={styles.emai}>{email}</span>
    </div>
  );
};

const Nav = () => {
  const { result } = useAsync(getUserInfo);
  const data = result ? result['data'] : [];
  const initialUserData: UserData = { email: '', image_source: '' };
  const userData = data.length > 0 ? data[0] : initialUserData;
  const { email, image_source } = userData;

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/">
          <Image src={logoIcon} alt="logo" id={styles.logo} />
        </Link>
        {email ? (
          <UserInfo email={email} imgSrc={image_source} />
        ) : (
          <button className={styles.button}>로그인</button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
