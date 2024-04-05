import { useState } from 'react';
import styles from './Modal.module.css';
import classNames from 'classnames';
import closeIcon from '../../public/icons/close.svg';
import checkIcon from '../../public/icons/check.svg';
import Image from 'next/image';

interface Folder {
  id: string;
  name: string;
  link: {
    count: number;
  };
}

interface FolderInfoProps {
  name: string;
  count: number;
  isSelected: boolean;
  onSelect: (folder: string) => void;
}

interface AddLinkModalProps {
  data: {
    link: string;
    folderList: Folder[];
  };
  closeModal: () => void;
}

const FolderInfo = ({ name, count, isSelected, onSelect }: FolderInfoProps) => {
  const handleClick = () => {
    onSelect(name);
  };

  return (
    <div
      className={classNames(styles.folder, { [styles.selected]: isSelected })}
      onClick={handleClick}
    >
      <div className={styles['folder-info']}>
        <h2>{name}</h2>
        <h3>{count}개 링크</h3>
      </div>
      {isSelected && <Image src={checkIcon} alt="check-icon" width={11.25} height={9.5} />}
    </div>
  );
};

const AddLinkModal = ({ data, closeModal }: AddLinkModalProps) => {
  const { link, folderList } = data;
  const [selectedFolder, setSelectedFolder] = useState<string>();

  const handleFolderSelect = (folder: string) => {
    setSelectedFolder(folder);
  };

  return (
    <>
      <div className={styles['box-text']}>
        <h2 className={styles.title}>폴더에 추가</h2>
        <h3 className={styles['sub-text']}>{link}</h3>
      </div>
      <div className={styles['folder-list']}>
        {folderList.map((folder) => (
          <FolderInfo
            key={folder.id}
            name={folder.name}
            count={folder.link.count}
            onSelect={handleFolderSelect}
            isSelected={selectedFolder === folder.name}
          />
        ))}
      </div>
      <button className={styles.button}>추가하기</button>
      <button className={styles.close} onClick={closeModal}>
        <Image src={closeIcon} alt="close-icon" width={24} height={24} />
      </button>
    </>
  );
};
export default AddLinkModal;
