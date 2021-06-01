import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../modal/modal';
import styles from './modal-overlay.module.css';

// @ts-ignore
function ModalOverlay({closeModal}) {
    return ReactDOM.createPortal(
        (
            <div onClick={closeModal} className={styles.overlay}>
                <Modal closeModal={closeModal} title={'Тест'}/>
            </div>
        ),
        // @ts-ignore
        document.getElementById("react-modals")
    );
}

export default ModalOverlay;