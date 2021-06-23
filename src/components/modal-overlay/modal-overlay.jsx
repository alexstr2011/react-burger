import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({closeModal}) {
    return ReactDOM.createPortal(
        (
            <div onClick={closeModal} className={styles.overlay}>
            </div>
        ),
        document.getElementById("react-modals")
    );
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;