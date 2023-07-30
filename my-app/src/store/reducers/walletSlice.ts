import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'
import {dataContainer} from "@/types/types";

interface walletType {
    coins: number,
    dollars: number
}

const initialState: walletType = {
    coins: 100,
    dollars: 1500
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setCoins(state, action) {
            state.coins = action.payload
        },
        setDollars(state, action) {
            state.dollars = action.payload
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.item
            }
        }
    }
})

export const { setCoins, setDollars } = walletSlice.actions
export const selectCoins = (state: AppState) => state.wallet.coins
export const selectDollars = (state: AppState) => state.wallet.dollars

export default walletSlice.reducer;
