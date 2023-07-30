import React, {useEffect, useState} from 'react';
import styles from './Header.module.scss'
import {BsCoin} from "react-icons/bs";
import {FaDollarSign} from "react-icons/fa";
import {AiFillPlusSquare, AiOutlineShoppingCart} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {selectCart, setCart} from "@/store/reducers/cartSlice";
import Card from "@/components/Card/Card";
import {ImCross} from "react-icons/im";
import {selectCoins, selectDollars, setCoins, setDollars} from "@/store/reducers/walletSlice";
import {paymentMessage, wallet} from "@/types/types";
import AddWalletWindow from "@/components/AddWalletWindow/AddWalletWindow";
import {Button} from "@mui/material";

const Header = () => {
    const [isCartOpened, setIsCartOpened] = useState<boolean>(false)
    const [paymentMessage, setPaymentMessage] = useState<paymentMessage>({} as paymentMessage)
    const cart = useSelector(selectCart)
    const coins = useSelector(selectCoins)
    const dollars = useSelector(selectDollars)
    const dispatch = useDispatch()
    const [transactionComplete, setTransactionComplete] = useState<boolean>(false)
    const countPayment = () => {
        return cart.reduce((acc, el) =>
            acc + el.price, 0
        )
    }

    const handlePayment = (el: 'coins' | 'dollars') => {
        let payment = countPayment()
        if (el === 'coins') {
            if (coins >= payment) {
                dispatch(setCart([]))
                dispatch(setCoins(coins - payment))
                setPaymentMessage({message: 'Thank you for your purchase', buttonMessage: 'Continue shopping'})
                setTransactionComplete(true)
            } else {
                setTransactionComplete(true)
                setPaymentMessage({message: `You haven't enough wallet. Fill your balance with ${payment - coins} ${el} and try again`, buttonMessage: 'Return back'})
            }
        } else if (dollars >= payment) {
            setPaymentMessage({message: 'Thank you for your purchase', buttonMessage: 'Continue shopping'})
            setTransactionComplete(true)
            dispatch(setCart([]))
            dispatch(setDollars(dollars - payment))
        } else {
            setTransactionComplete(true)
            setPaymentMessage({message: `You haven't enough wallet. Top up your balance with ${payment - dollars} ${el} and try again`, buttonMessage: 'Return back'})
        }
    }

    return (
        <div className={styles.header}>
            <span>Marketplace</span>
            <div className={styles.cartWrapper}>
                <div className={styles.header__walletTable}>
                    <div className={styles.table}>
                        <span>{`Your coins: ${coins}`}</span>
                        <BsCoin size={'20'} color={'orange'}/>
                        <AddWalletWindow type="coins"/>
                    </div>
                    <div className={styles.table}>
                        <span>{`Your dollars: ${dollars}`}</span>
                        <FaDollarSign size={'20'} color={'green'}/>
                        <AddWalletWindow type="dollars"/>
                    </div>
                </div>
                {isCartOpened ? <div onClick={() => setIsCartOpened(false)} className={styles.overlay}></div> : ''}
                {isCartOpened
                    ? <div className={styles.cartWindow}>
                        {transactionComplete ? <div className={styles.purchaseWindow}>
                            <span>{paymentMessage.message}</span>
                            <Button onClick={() => {
                                setIsCartOpened(false)
                                setTransactionComplete(false)
                            }}>{paymentMessage.buttonMessage}</Button>
                        </div> : <><ImCross cursor={'pointer'} onClick={() => setIsCartOpened(false)}/>
                            <div className={styles.table}>
                                <span>{`Your coins: ${coins}`}</span>
                                <BsCoin size={'20'} color={'orange'}/>
                                <AddWalletWindow type="coins"/>
                            </div>
                            <div className={styles.table}>
                                <span>{`Your dollars: ${dollars}`}</span>
                                <FaDollarSign size={'20'} color={'green'}/>
                                <AddWalletWindow type="dollars"/>
                            </div>
                            <div className={styles.cartWindow__items}>
                                {cart.map(el => <Card type='cart' key={el.title} item={el}/>)}
                            </div>
                            <span>{`Total: ${countPayment()}`}</span>
                            <div>

                                    <Button className={styles.table} onClick={() => handlePayment('coins')}>Pay in
                                        <BsCoin size={'20'} color={'orange'}/>
                                    </Button>


                                    <Button className={styles.table} onClick={() => handlePayment('dollars')}>Pay in
                                        <FaDollarSign size={'20'} color={'green'}/>
                                    </Button>

                            </div>

                        </>
                        }
                    </div>
                    : <>
                        <AiOutlineShoppingCart onClick={() => {
                            cart.length ? setIsCartOpened(true) : ''
                        }} size={'50'}
                                               className={styles.cart}/>
                        <div className={styles.cartLength}>{cart.length}</div>
                    </>
                }
            </div>
        </div>
    );
};

export default Header;