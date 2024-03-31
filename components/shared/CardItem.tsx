import styles from './Card.module.css';
import caculateTime from '@/lib/caculateTime';
import formatDate from '@/lib/formatDate';
import logoIcon from '../../public/icons/logo.svg';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

interface Link {
  createdAt: string;
  description: string;
  imageSource: string;
  title: string;
  url: string;
}
interface CardItemProps {
  link: Link;
  searchItem: string;
}

const CardItem = ({ link, searchItem }: CardItemProps) => {
  if (!link) return null;
  const { createdAt, description, imageSource, title, url } = link;

  const isSearchedLink = () => {
    if (url && title && description) {
      return (
        url.includes(searchItem) ||
        title.includes(searchItem) ||
        description.includes(searchItem)
      );
    }
  };

  if (searchItem && !isSearchedLink()) {
    return null;
  }
  return (
    <div className={styles.card}>
      <Link href={url} target="_blank" rel="noreferrer">
        {imageSource ? (
          <div className={styles.img}>
            <Image
              id={styles.cardImg}
              src={imageSource}
              alt={title}
              width={340}
              height={200}
              priority={true}
            />
          </div>
        ) : (
          <div className={classNames(styles.img, styles.noImg)}>
            <Image id={styles.noImgLogo} src={logoIcon} alt="noImg" width={133} height={24} />
          </div>
        )}
        <div className={styles.contents}>
          <h3 id={styles.createdTime}>{caculateTime(createdAt)}</h3>
          <h2 id={styles.description}>{description}</h2>
          <h3 id={styles.date}>{formatDate(new Date(createdAt))}</h3>
        </div>
      </Link>
    </div>
  );
};

export default CardItem;
