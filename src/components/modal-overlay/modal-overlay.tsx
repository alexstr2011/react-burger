import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import Modal from '../modal/modal';
import styles from './modal-overlay.module.css';

// @ts-ignore
function ModalOverlay({closeModal, children, title = ''}) {
    // @ts-ignore
    const closeModalStopPropagation = (e) => {
        e.stopPropagation();
        closeModal();
    }
    return ReactDOM.createPortal(
        (
            <div onClick={closeModalStopPropagation} className={styles.overlay}>
                <Modal closeModal={closeModal} title={title}>
                    {children}
                </Modal>
            </div>
        ),
        // @ts-ignore
        document.getElementById("react-modals")
    );
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string
}

export default ModalOverlay;