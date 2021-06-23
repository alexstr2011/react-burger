import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({closeModal, children, title}) {
    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    React.useEffect(() => {
        const closeModalEsc = (e) => {
            if (e.code === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', closeModalEsc);
        return ()=>{
            document.removeEventListener('keydown', closeModalEsc);
        };
    }, [closeModal]);

    return ReactDOM.createPortal(
        (
            <>
                <section className={styles.modal} onClick={stopPropagation}>
                    <header className={styles.header}>
                        <p className="text text_type_main-large mt-10 ml-10">
                            {title}
                        </p>
                        <div onClick={closeModal} className={styles.closeButton + ' mt-15 mr-10'}>
                            <CloseIcon type="primary"/>
                        </div>
                    </header>
                    {children}
                </section>
                <ModalOverlay closeModal={closeModal}/>
            </>
        ),
        document.getElementById("react-modals")
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string
}

export default Modal;