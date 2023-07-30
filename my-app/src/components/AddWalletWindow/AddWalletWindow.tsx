import React, {useState} from 'react';
import {AiFillPlusSquare} from "react-icons/ai";
import {useOutside} from "@/hooks/useOutside";
import {Button, TextField} from "@mui/material";
import styles from './AddWalletWindow.module.scss'
import {selectCoins, selectDollars, setCoins, setDollars} from "@/store/reducers/walletSlice";
import {useDispatch, useSelector} from "react-redux";
import {wallet} from "@/types/types";

const AddWalletWindow = ({type}: wallet) => {
    const {ref, isShow, setIsShow} = useOutside(false)
    const [isValid, setIsValid] = useState<boolean>(true)
    const [value, setValue] = useState<number>(0)
    const dispatch = useDispatch()
    const dollars = useSelector(selectDollars)
    const coins = useSelector(selectCoins)
    const handleFill = (el: string) => {
        if (el === 'coins') {
            if (dollars > value) {
                dispatch(setDollars(dollars - value))
                dispatch(setCoins(coins + value))
                setValue(0)
                setIsShow(!isShow)
            } else setIsValid(false)
        } else {
            dispatch(setDollars(dollars + value))
            setIsShow(!isShow)
            setValue(0)
        }
    }


    return (
        <div className={styles.textFieldWrapper} ref={ref}>
            {isShow ? <div className={styles.field}><TextField className={styles.textField}
                                   onChange={(e) => setValue(parseInt(e.target.value) ? parseInt(e.target.value) : 0)}
                                   error={!isValid}
                                   value={value}
                                   label={isValid ? 'Put a sum to add or change' : 'Not enough dollars to change'}
                                   variant="outlined" />
                <Button onClick={() => {
                    handleFill(type)
                }}>Submit</Button>
            </div> : <AiFillPlusSquare onClick={() => {
                setIsShow(!isShow)
            }} color={'#5BCB02'} cursor={'pointer'}/>}
        </div>
    );
};

export default AddWalletWindow;