import React from 'react';
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { Context } from '../../context/context';

// @ts-ignore
function getConstructorElement(element, type) {
    const isLocked = !!type;
    let text = element.name;
    if (!!type) {
        text += (type === 'top') ? ' (верх)' : ' (низ)';
    }

    return (
        <div className={styles.ingredient} key={element._id}>
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
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
        setVisibleModal(true);
    }
    const closeModal = () => {
        setVisibleModal(false);
    }

    let topBun, bottomBun, orderValue = 0;
    if (data.bun) {
        topBun = getConstructorElement(data.bun, 'top');
        bottomBun = getConstructorElement(data.bun, 'bottom');
        // @ts-ignore
        orderValue = data.bun.price * 2;
    }
    // @ts-ignore
    const innerList = data.inners.map((element) => getConstructorElement(element));
    // @ts-ignore
    orderValue += data.inners.reduce((acc, element) => acc + element.price, 0)

    return (
        <section className={styles.constructor + ' ml-10 pt-15 pl-4'}>
            <section className={styles.list}>
                {topBun}
                <div className={styles.innerList + ' scrollbar'}>
                    {innerList}
                </div>
                {bottomBun}
            </section>
            <div className={styles.order + ' mt-10'}>
                <p className="text text_type_digits-medium mr-2">{orderValue}</p>
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