import React from 'react';
import {product} from "@/types/types";
import styles from './Card.module.scss'
import {AiOutlineShop} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {selectCart, setCart} from "@/store/reducers/cartSlice";

const Card = (props: { item: product }) => {
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)
    return (
        <div className={styles.cardWrapper}>
            <AiOutlineShop color={'grey'} size={'70'}/>
            <span>{props.item.title}</span>
            <span>{`Price: ${props.item.price}$`}</span>
            <span onClick={() => dispatch(setCart([...cart, props.item]))}>Add to cart</span>
        </div>
    );
};

export default Card;