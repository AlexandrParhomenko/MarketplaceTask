import React from 'react';
import {selectStore} from "@/store/reducers/storeSlice";
import {useSelector} from "react-redux";
import Card from "@/components/Card/Card";
import styles from './Main.module.scss'

const Main = () => {
    const shopItems = useSelector(selectStore)
    console.log(shopItems)
    return (
        <div className={styles.main}>
            {shopItems.map(el => el.products.map(elem => <Card type='standard' key={elem.title} item={elem}/>))}
        </div>
    );
};

export default Main;