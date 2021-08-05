import React, {FC} from 'react';
import ReactDOM from "react-dom";
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface IModalProps {
    closeModal: () => void;
    title?: string;
}

const modalRoot = document.getElementById("react-modals");

const Modal: FC<IModalProps> = ({closeModal, children, title}) => {

    React.useEffect(() => {
        const closeModalEsc = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', closeModalEsc);
        return ()=>{
            document.removeEventListener('keydown', closeModalEsc);
        };
    }, [closeModal]);

    return modalRoot &&
        ReactDOM.createPortal(
            (
                <>
                    <section className={styles.modal}>
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
            modalRoot
        );
};

export default Modal;