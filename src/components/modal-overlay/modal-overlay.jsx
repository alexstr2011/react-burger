import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({closeModal}) {
    return (
        <div onClick={closeModal} className={styles.overlay} />
    );
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;