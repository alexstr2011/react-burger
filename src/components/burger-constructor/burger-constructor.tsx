import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_CONSTRUCTOR, ORDER_NUMBER, orderNumberLoad } from '../../services/actions/actions';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';

// @ts-ignore
function getConstructorElement(element, type=undefined, closeHandler=undefined) {
    const isLocked = !!type;
    let text = element.name;
    let key = element.key;
    if (!!type) {
        text += (type === 'top') ? ' (верх)' : ' (низ)';
        key += type;
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
                handleClose={closeHandler}
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

    // @ts-ignore
    const closeHandler = (ingredient, index) => {
        dispatch({
            type: BURGER_CONSTRUCTOR.REMOVE,
            ingredient,
            index
        });
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
        topBun = getConstructorElement(data.bun, 'top');
        // @ts-ignore
        bottomBun = getConstructorElement(data.bun, 'bottom');
        // @ts-ignore
        orderValue = data.bun.price * 2;
    }
    // @ts-ignore
    const innerList = data.inners.map(
        // @ts-ignore
        (element, index) => getConstructorElement(element,undefined,
            // @ts-ignore
            closeHandler.bind(null, element, index))
    );
    // @ts-ignore
    orderValue += data.inners.reduce((acc, element) => acc + element.price, 0)

    return (
        <section className={styles.constructor + ' ml-10 pt-15 pl-4'}>
            <section ref={dropRef} className={styles.list} style={{filter}} >
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