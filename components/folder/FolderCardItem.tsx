import logoImg from '../../public/icons/logo.svg';
import caculateTime from '@/lib/caculateTime';
import formatDate from '@/lib/formatDate';
import starIcon from '../../public/icons/star.svg';
import kebabIcon from '../../public/icons/kebab.svg';
import styles from '../shared/Card.module.css';
import { useState } from 'react';
import ModalPortal from '../common/ModalPortal';
import Modal from '../modal/Modal';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

interface Link {
  created_at: string;
  description: string;
  image_source: string;
  title: string;
  url: string;
}

interface Folder {
  id: number;
  created_at: string;
  name: string;
  user_id: number;
  favorite: boolean;
  link: {
    count: number;
  };
}

interface FolderCardItemProps {
  link: Link;
  folderList: Folder[];
  searchItem: string;
}

const FolderCardItem = ({ link, folderList, searchItem }: FolderCardItemProps) => {
  const { created_at, description, image_source, title, url } = link || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operation, setOperation] = useState('');
  const formattedCreatedAt: string = created_at as string;

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

  const handleClick = (text: string) => {
    setOperation(text);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.card}>
      <Link href={url} target="_blank" rel="noreferrer">
        <Image className={styles['star-icon']} src={starIcon} alt="star-icon" />
        {image_source ? (
          <div className={styles.img}>
            <Image
              id={styles.cardImg}
              src={image_source}
              alt={title}
              width={340}
              height={200}
              priority={true}
            />
          </div>
        ) : (
          <div className={classNames(styles.img, styles.noImg)}>
            <Image id={styles.noImgLogo} src={logoImg} alt="noImg" />
          </div>
        )}
        <div className={styles.contents}>
          <h3 id={styles.createdTime}>{caculateTime(formattedCreatedAt)}</h3>
          <h2 id={styles.description}>{description}</h2>
          <h3 id={styles.date}>{formatDate(new Date(formattedCreatedAt))}</h3>
        </div>
      </Link>
      <Image
        className={styles['kebab-icon']}
        src={kebabIcon}
        alt="kebab-icon"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <div className={styles['card-dropdown']}>
          <div
            className={styles['card-dropdown-menu']}
            onClick={() => handleClick('delete-link')}
          >
            삭제하기
          </div>
          <div
            className={styles['card-dropdown-menu']}
            onClick={() => handleClick('add-link')}
          >
            폴더에 추가
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalPortal>
          <Modal
            operation={operation}
            data={{ link: link?.url, folderList }}
            closeModal={() => setIsModalOpen(false)}
          />
        </ModalPortal>
      )}
    </div>
  );
};

export default FolderCardItem;
