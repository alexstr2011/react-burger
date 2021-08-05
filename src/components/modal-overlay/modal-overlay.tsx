import React, {FC} from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  closeModal: () => void;
};

const ModalOverlay: FC<IModalOverlayProps> = ({closeModal}) => {
    return (
        <div onClick={closeModal} className={styles.overlay} />
    );
}

export default ModalOverlay;