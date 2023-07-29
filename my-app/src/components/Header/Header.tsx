import React, {useState} from 'react';
import styles from './Header.module.scss'
import {BsCoin} from "react-icons/bs";
import {FaDollarSign} from "react-icons/fa";
import {AiFillPlusSquare, AiOutlineShoppingCart} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "@/store/reducers/cartSlice";
import Card from "@/components/Card/Card";
import {ImCross} from "react-icons/im";
import {selectWallet, setWallet} from "@/store/reducers/walletSlice";

const Header = () => {
    const [isCartOpened, setIsCartOpened] = useState<boolean>(false)
    const cart = useSelector(selectCart)
    const wallet = useSelector(selectWallet)
    const dispatch = useDispatch()
    const [transactionComplete, setTransactionComplete] = useState<boolean>(false)
    const countPayment = () => {
        return cart.reduce((acc, el) =>
            acc + el.price, 0
        )
    }

    const handlePayment = () => {

    }

    return (
        <div className={styles.header}>
            <span>Marketplace</span>
            <div className={styles.cartWrapper}>
                <div className={styles.header__walletTable}>
                    <div className={styles.table}>
                        <span>{`Your coins: ${wallet.coins}`}</span>
                        <BsCoin size={'20'} color={'orange'}/>
                        <AiFillPlusSquare color={'#5BCB02'} cursor={'pointer'}/>
                    </div>
                    <div className={styles.table}>
                        <span>{`Your dollars: ${wallet.dollars}`}</span>
                        <FaDollarSign size={'20'} color={'green'}/>
                        <AiFillPlusSquare color={'#5BCB02'} cursor={'pointer'}/>
                    </div>
                </div>
                {isCartOpened ? <div className={styles.overlay}></div> : ''}
                {isCartOpened
                    ? <div className={styles.cartWindow}>
                        <ImCross cursor={'pointer'} onClick={() => setIsCartOpened(false)}/>
                        <div className={styles.table}>
                            <span>{`Your coins: ${wallet.coins}`}</span>
                            <BsCoin size={'20'} color={'orange'}/>
                            <AiFillPlusSquare color={'#5BCB02'} cursor={'pointer'}/>
                        </div>
                        <div className={styles.table}>
                            <span>{`Your dollars: ${wallet.dollars}`}</span>
                            <FaDollarSign size={'20'} color={'green'}/>
                            <AiFillPlusSquare color={'#5BCB02'} cursor={'pointer'}/>
                        </div>
                        <div className={styles.cartWindow__items}>
                            {cart.map(el => <Card key={el.title} item={el}/>)}
                        </div>
                        <span>{`Total: ${countPayment()}`}</span>
                        <div className={styles.table}>
                            <span>Pay in</span>
                            <BsCoin size={'20'} color={'orange'}/>
                        </div>
                        <div
                             className={styles.table}>
                            <span>Pay in</span>
                            <FaDollarSign size={'20'} color={'green'}/>
                        </div>

                    </div>
                    : <>
                        <AiOutlineShoppingCart onClick={() => cart.length ? setIsCartOpened(true) : ''} size={'50'}
                                               className={styles.cart}/>
                        <div className={styles.cartLength}>{cart.length}</div>
                    </>
                }
            </div>
        </div>
    );
};

export default Header;