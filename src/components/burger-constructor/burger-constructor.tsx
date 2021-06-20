import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { ORDER_NUMBER, orderNumberLoad } from '../../services/actions/actions';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';

// @ts-ignore
function getConstructorElement(element, type, index=0) {
    const isLocked = !!type;
    let text = element.name;
    let key = element._id;
    if (!!type) {
        text += (type === 'top') ? ' (верх)' : ' (низ)';
        key += type;
    } else {
        key += index;
    }

    return (
        <div className={styles.ingredient} key={key}>
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
    // @ts-ignore
    const {data, orderNumber} = useSelector(store => ({
        // @ts-ignore
        data: store.burgerConstructor,
        // @ts-ignore
        orderNumber: store.orderNumber.number,
    }));

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch({
            type: ORDER_NUMBER.DELETE
        });
    }

    const createOrderHandler = () => {
        // @ts-ignore
        const ingredients = data.inners.map(element => element._id);
        if (data.bun) {
            // @ts-ignore
            ingredients.push(data.bun._id);
            // @ts-ignore
            ingredients.push(data.bun._id);
        }

        dispatch(orderNumberLoad(ingredients));
    }

    let topBun, bottomBun, orderValue = 0;
    if (data.bun) {
        topBun = getConstructorElement(data.bun, 'top');
        bottomBun = getConstructorElement(data.bun, 'bottom');
        // @ts-ignore
        orderValue = data.bun.price * 2;
    }
    // @ts-ignore
    const innerList = data.inners.map((element, index) => getConstructorElement(element,index));
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
                    <Button onClick={createOrderHandler} type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {!!orderNumber && <ModalOverlay closeModal={closeModal}>
                {/* @ts-ignore*/}
                <OrderDetails orderNumber={orderNumber}/>
            </ModalOverlay>}
        </section>
    );
}

export default BurgerConstructor;