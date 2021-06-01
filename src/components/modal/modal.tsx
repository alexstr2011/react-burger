import React from 'react';
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

// @ts-ignore
function Modal({closeModal,title}) {
    // @ts-ignore
    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    React.useEffect(() => {
        // @ts-ignore
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

    return (
        <section className={styles.modal} onClick={stopPropagation}>
            <header className={styles.header}>
                <p className="text text_type_main-large mt-10 ml-10">
                    {title}
                </p>
                <div onClick={closeModal} className={styles.closeButton + ' mt-15 mr-10'}>
                    <CloseIcon type="primary" />
                </div>
            </header>
        </section>
    );
}

export default Modal;