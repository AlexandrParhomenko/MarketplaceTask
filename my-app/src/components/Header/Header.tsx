import React from 'react';
import styles from './Header.module.scss'
import {BsCoin} from "react-icons/bs";
import {FaDollarSign} from "react-icons/fa";
import {AiFillPlusSquare} from "react-icons/ai";

const Header = () => {
    return (
        <div className={styles.header}>
            <span>Marketplace</span>
            <div className={styles.header__walletTable}>
                <div className={styles.table}>
                    <span>Your coins: 0</span>
                    <BsCoin size={'20'} color={'orange'}/>
                    <AiFillPlusSquare color={'#5BCB02'}/>
                </div>
                <div className={styles.table}>
                    <span>Your dollars: 0</span>
                    <FaDollarSign size={'20'} color={'green'}/>
                    <AiFillPlusSquare color={'#5BCB02'}/>
                </div>
            </div>
        </div>
    );
};

export default Header;