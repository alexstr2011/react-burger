import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_CONSTRUCTOR, ORDER_NUMBER, orderNumberLoad } from '../../services/actions/actions';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';

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

    const [{isHover}, dropRef] = useDrop({
        accept: 'ingredient',
        drop(data) {
            dispatch({
                type: BURGER_CONSTRUCTOR.ADD,
                ingredient: data
            });
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const filter = isHover ? 'brightness(1.5)' : 'none';

    let topBun, bottomBun, orderValue = 0;
    if (data.bun) {
        // @ts-ignore
        topBun = <BurgerConstructorElement element={data.bun} type='top' />;
        // @ts-ignore
        bottomBun = <BurgerConstructorElement element={data.bun} type='bottom' />;
        // @ts-ignore
        orderValue = data.bun.price * 2;
    }
    // @ts-ignore
    const innerList = data.inners.map(
        // @ts-ignore
        (element, index) => <BurgerConstructorElement key={element.key}  element={element} index={index}/>
    );

    // @ts-ignore
    orderValue += data.inners.reduce((acc, element) => acc + element.price, 0)

    return (
        <section className={styles.constructor + ' ml-10 pt-15 pl-4'}>
            <section ref={dropRef} className={styles.list} style={{filter}} >
                {
                    !data.bun && !data.inners.length
                    && <p className={styles.info}>Drag the ingredients to make your order</p>
                }
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