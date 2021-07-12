import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_CONSTRUCTOR, ORDER_NUMBER, orderNumberLoad } from '../../services/actions/actions';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import styles from './burger-constructor.module.css';

function BurgerConstructor () {
    const {data, orderNumber} = useSelector(store => ({
        data: store.burgerConstructorReducer,
        orderNumber: store.orderNumberReducer.number,
    }));

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch({
            type: ORDER_NUMBER.DELETE
        });
        dispatch({
            type: BURGER_CONSTRUCTOR.REMOVE_ALL
        });
    }

    const createOrderHandler = () => {
        if (!data.bun) {
            return;
        }
        
        const ingredients = data.inners.map(element => element._id);
        if (data.bun) {
            ingredients.push(data.bun._id);
            ingredients.push(data.bun._id);
        }

        dispatch(orderNumberLoad(ingredients));
    }

    const [{isHover}, dropRef] = useDrop({
        accept: 'ingredient',
        drop(data) {
            dispatch({
                type: BURGER_CONSTRUCTOR.ADD,
                ingredient: data,
                localId: Math.floor(Math.random() * 10000)
            });
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const filter = isHover ? 'brightness(1.5)' : 'none';

    let topBun, bottomBun, orderValue = 0;
    if (data.bun) {
        topBun = <BurgerConstructorElement element={data.bun} type='top' />;
        bottomBun = <BurgerConstructorElement element={data.bun} type='bottom' />;
        orderValue = data.bun.price * 2;
    }
    const innerList = data.inners.map(
        (element, index) => <BurgerConstructorElement key={element.key}  element={element} index={index}/>
    );

    orderValue += data.inners.reduce((acc, element) => acc + element.price, 0);

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
                    <Button onClick={createOrderHandler} type="primary" size="large" >
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {!!orderNumber && <Modal closeModal={closeModal}>
                <OrderDetails orderNumber={orderNumber}/>
            </Modal>}
        </section>
    );
}

export default BurgerConstructor;