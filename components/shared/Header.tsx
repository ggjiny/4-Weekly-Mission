import Image from 'next/image';
import styles from './Header.module.css';

interface Owner {
  name: string;
  profileImageSource: string;
}

interface HeaderProps {
  name: string;
  owner: Owner;
}
const Header = ({ name, owner }: HeaderProps) => {
  if (!name) return <h2 className={styles.fail}>소유자 정보를 가져오지 못했습니다.</h2>;

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.owner}>
          <Image
            id={styles.img}
            src={owner.profileImageSource}
            alt="owner-profile-img"
            width={60}
            height={60}
          />
          <p id={styles.name}>@{owner.name}</p>
        </div>
        <h1 id={styles.folderName}>{name}</h1>
      </div>
    </header>
  );
};
export default Header;
