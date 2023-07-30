import React from 'react';
import {product} from "@/types/types";
import styles from './Card.module.scss'
import {AiOutlineShop} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {selectCart, setCart} from "@/store/reducers/cartSlice";
import {Button} from "@mui/material";

const Card = (props: { item: product, type: 'cart' | 'standard' }) => {
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardData}>
                <AiOutlineShop color={'grey'} size={'70'}/>
                <span>{props.item.title}</span>
                <span>{`Price: ${props.item.price}$`}</span>
            </div>
            {props.type === 'cart' ? '' : <Button onClick={() => dispatch(setCart([...cart, props.item]))}>Add to cart</Button>}
        </div>
    );
};

export default Card;