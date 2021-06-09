import React from 'react';
import {ConstructorElement,DragIcon,CurrencyIcon,Button} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { Context } from '../../context/context';
import { CREATE_ORDER_URL } from '../../api/urls';

// @ts-ignore
function getConstructorElement(element, type) {
    const isLocked = !!type;
    let text = element.name;
    let key = element._id;
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
            />
        </div>
    );
}

function BurgerConstructor () {
    const data = React.useContext(Context);
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [orderNumber, setOrderNumber] = React.useState(null);

    const openModal = () => {
        setVisibleModal(true);
    }
    const closeModal = () => {
        setVisibleModal(false);
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

        fetch(CREATE_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'ingredients': ingredients})
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed getting data from server');
            }
        })
            .then((response) => {
                if (!response.success) {
                    throw new Error('Failed creating order');
                }
                setOrderNumber(response.order.number);
                openModal();
            })
            .catch((error) => {
                console.log(error.message);
            });
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
                    <Button onClick={createOrderHandler} type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {visibleModal && <ModalOverlay closeModal={closeModal}>
                {/* @ts-ignore*/}
                <OrderDetails orderNumber={orderNumber}/>
            </ModalOverlay>}
        </section>
    );
}

export default BurgerConstructor;