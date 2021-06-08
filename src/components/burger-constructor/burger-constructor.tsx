import React from 'react';
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { Context } from '../../context/context';

// @ts-ignore
function getConstructorElement(arr, ind, type) {
    const element = arr[ind];
    const isLocked = !!type;

    return (
        <div className={styles.ingredient} key={element._id}>
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={element.name}
                price={element.price}
                thumbnail={element.image}
            />
        </div>
    );
}

function BurgerConstructor () {
    const data = React.useContext(Context);
    const [visibleModal, setVisibleModal] = React.useState(false);

    const openModal = () => {
        setVisibleModal(true)
    }
    const closeModal = () => {
        setVisibleModal(false)
    }

    let firstElement, lastElement;
    if (data.length) {
        firstElement = getConstructorElement(data, 0, 'top');
    }
    if (data.length > 1) {
        lastElement = getConstructorElement(data, data.length - 1, 'bottom');
    }

    const innerList = data
        // @ts-ignore
        .filter((element,ind,arr) => ind !== 0 && ind !== (arr.length - 1))
        // @ts-ignore
        .map((element, ind, arr) => getConstructorElement(arr, ind));

    return (
        <section className={styles.constructor + ' ml-10 pt-15 pl-4'}>
            <section className={styles.list}>
                {firstElement}
                <div className={styles.innerList + ' scrollbar'}>
                    {innerList}
                </div>
                {lastElement}
            </section>
            <div className={styles.order + ' mt-10'}>
                <p className="text text_type_digits-medium mr-2">12345</p>
                <CurrencyIcon type="primary" />
                <div className="ml-10 mr-4">
                    <Button onClick={openModal} type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {visibleModal && <ModalOverlay closeModal={closeModal}>
                <OrderDetails />
            </ModalOverlay>}
        </section>
    );
}

export default BurgerConstructor;