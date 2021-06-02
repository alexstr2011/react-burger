import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../modal/modal';
import styles from './modal-overlay.module.css';

// @ts-ignore
function ModalOverlay({closeModal, children, title = ''}) {
    return ReactDOM.createPortal(
        (
            <div onClick={closeModal} className={styles.overlay}>
                <Modal closeModal={closeModal} component={children} title={title}/>
            </div>
        ),
        // @ts-ignore
        document.getElementById("react-modals")
    );
}

export default ModalOverlay;