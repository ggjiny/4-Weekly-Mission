import styles from './FolderList.module.css';
import addIcon from '../../public/icons/add.svg';
import { useState } from 'react';
import FolderCardList from './FolderCardList';
import Modal from '../modal/Modal';
import ModalPortal from '../common/ModalPortal';
import classNames from 'classnames';
import Image from 'next/image';

interface FolderData {
  id: number;
  name: string;
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

interface FolderItemProps {
  data: Folder;
  onFolderClick: (folder: FolderData) => void;
  isSelected: boolean;
}

interface FolderListProps {
  folderData: Folder[];
  search: string;
}

const FolderItem = ({ data, onFolderClick, isSelected }: FolderItemProps) => {
  const { name, id } = data;
  const handleFolderClick = () => {
    onFolderClick({ id, name });
  };
  return (
    <div
      className={classNames(styles.button, { [styles.selected]: isSelected })}
      onClick={handleFolderClick}
    >
      {name}
    </div>
  );
};
const INITIAL_FOLDER = {
  id: 0,
  name: '전체',
};

const FolderList = ({ folderData, search }: FolderListProps) => {
  const [selectedFolder, setSelectedFolder] = useState<FolderData>(INITIAL_FOLDER);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectFolder = (folder: FolderData) => {
    setSelectedFolder(folder);
  };

  return (
    <>
      <div className={styles.folderList}>
        <div className={styles.container}>
          <div className={styles.items}>
            <div
              className={classNames(styles.button, {
                [styles.selected]: selectedFolder.name === '전체',
              })}
              onClick={() => selectFolder(INITIAL_FOLDER)}
            >
              전체
            </div>
            {folderData.map((item) => (
              <FolderItem
                key={item.id}
                data={item}
                onFolderClick={selectFolder}
                isSelected={selectedFolder && selectedFolder.id === item.id}
              />
            ))}
          </div>

          <button className={styles.addFolder} onClick={() => setIsModalOpen(true)}>
            폴더 추가
            <Image
              className={styles.addIcon}
              src={addIcon}
              alt="add-icon"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      {selectedFolder ? (
        <FolderCardList
          id={selectedFolder.id}
          name={selectedFolder.name}
          folderList={folderData}
          searchItem={search}
        />
      ) : (
        <div>저장된 링크가 없습니다.</div>
      )}
      {isModalOpen && (
        <ModalPortal>
          <Modal operation="add-folder" closeModal={() => setIsModalOpen(false)} />
        </ModalPortal>
      )}
    </>
  );
};
export default FolderList;
