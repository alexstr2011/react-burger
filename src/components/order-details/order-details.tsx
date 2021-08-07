import React, {FC} from 'react';
import styles from './order-details.module.css';
import checkMark from '../../images/checkMark.png';

interface IOrderDetailsProps {
    orderNumber: string;
};

const OrderDetails: FC<IOrderDetailsProps> = ({orderNumber}) => {
    return (
        <section className={styles.order}>
            <p className="text text_type_digits-large mt-8">{orderNumber}</p>
            <p className="text text_type_main-medium mt-8 mb-15">
                идентификатор заказа
            </p>
            <img src={checkMark} className={styles.checkMark} alt='Done'/>
            <p className="text text_type_main-default mt-15 mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mb-30">
                Дождитесь готовности на орбитальной станции
            </p>
        </section>
    );
}

export default OrderDetails;
