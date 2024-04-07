import { useEffect, useState } from 'react';
import { getLinks } from '@/pages/api/api';
import styles from './FolderCardList.module.css';
import FolderCardItem from './FolderCardItem';
import useAsync from '../hooks/useAsync';
import shareIcon from '../../public/icons/share.svg';
import penIcon from '../../public/icons/pen.svg';
import deleteIcon from '../../public/icons/delete.svg';
import ModalPortal from '../common/ModalPortal';
import Modal from '../modal/Modal';
import Image from 'next/image';

interface Link {
  id: number;
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

interface FolderCardListProps {
  id: number;
  name: string;
  folderList: Folder[];
  searchItem: string;
}

const FolderCardList = ({ id, name, folderList, searchItem }: FolderCardListProps) => {
  const { result, execute, loading } = useAsync(() => getLinks(Number(id)));
  const { data: links } = result || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operation, setOperation] = useState('');
  const [renameData, setRenameData] = useState('');

  useEffect(() => {
    execute();
  }, [id]);

  const handleModalOpen = (text: string) => {
    setOperation(text);
    setIsModalOpen(true);
    setRenameData(name);
  };
  return (
    <>
      <div className={styles.folderList}>
        <div className={styles.container}>
          <div className={styles.name}>{name}</div>
          {name !== '전체' && (
            <div className={styles.icons}>
              <button onClick={() => handleModalOpen('share-folder')}>
                <Image src={shareIcon} alt="share-icon" width={20} height={20} />
                공유
              </button>
              <button onClick={() => handleModalOpen('rename-folder')}>
                <Image src={penIcon} alt="pen-icon" width={20} height={20} />
                이름 변경
              </button>
              <button onClick={() => handleModalOpen('delete-folder')}>
                <Image src={deleteIcon} alt="delete-icon" width={20} height={20} />
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      {loading && <div className={styles['no-link-data']}>데이터를 불러오는 중...</div>}
      {!loading &&
        (links?.length > 0 ? (
          <div className={styles['card-list']}>
            <div className={styles['card-list-container']}>
              {links.map((item: Link) => (
                <FolderCardItem
                  key={item.id}
                  link={item}
                  folderList={folderList}
                  searchItem={searchItem}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles['no-link-data']}>저장된 링크가 없습니다.</div>
        ))}

      {isModalOpen && (
        <ModalPortal>
          <Modal
            operation={operation}
            data={{ name, id, renameData }}
            closeModal={() => setIsModalOpen(false)}
          />
        </ModalPortal>
      )}
    </>
  );
};
export default FolderCardList;
