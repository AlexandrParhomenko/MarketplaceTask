import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'
import {product} from "@/types/types";

interface cart {
    cart: product[]
}

const initialState: cart = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action) {
            state.cart = action.payload
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

export const { setCart } = cartSlice.actions
export const selectCart = (state: AppState) => state.cart.cart

export default cartSlice.reducer;
