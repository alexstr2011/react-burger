import React from 'react';
import OrderElement from "../components/order-element/order-element";
import ProfileMenu from "../components/profile-menu/profile-menu";
import styles from './history.module.css';

function HistoryPage() {
    return (
        <div className={styles.wrapper}>
            <ProfileMenu/>
            <ul className={styles.list + ' scrollbar'}>
                <li><OrderElement/></li>
                <li><OrderElement/></li>
                <li><OrderElement/></li>
                <li><OrderElement/></li>
                <li><OrderElement/></li>
            </ul>
        </div>

    );
}

export default HistoryPage;