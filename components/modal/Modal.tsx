import styles from './Modal.module.css';
import AddFolderModal from './AddFolderModal';
import RenameFolderModal from './RenameFolderModal';
import DeleteFolderModal from './DeleteFolderModal';
import DeleteLinkModal from './DeleteLinkModal';
import ShareFolderModal from './ShareFolderModal';
import AddLinkModal from './AddLinkModal';

interface ModalProps {
  operation: string;
  closeModal: () => void;
  data?: any;
}

const Modal = ({ operation, closeModal, data = {} }: ModalProps) => {
  const renderModal = () => {
    switch (operation) {
      case 'add-link':
        return <AddLinkModal data={data} closeModal={closeModal} />;

      case 'add-folder':
        return <AddFolderModal closeModal={closeModal} />;

      case 'rename-folder':
        return <RenameFolderModal data={data} closeModal={closeModal} />;

      case 'delete-folder':
        return <DeleteFolderModal data={data} closeModal={closeModal} />;

      case 'delete-link':
        return <DeleteLinkModal data={data} closeModal={closeModal} />;

      case 'share-folder':
        return <ShareFolderModal data={data} closeModal={closeModal} />;

      default:
        return;
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.box}>{renderModal()}</div>
    </div>
  );
};

export default Modal;
