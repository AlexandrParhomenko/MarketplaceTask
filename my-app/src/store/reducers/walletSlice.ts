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
        setWallet(state, action) {
            state.coins = action.payload
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

export const { setWallet } = walletSlice.actions
export const selectWallet = (state: AppState) => state.wallet

export default walletSlice.reducer;
