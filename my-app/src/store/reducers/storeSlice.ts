import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { AppState } from '../store'
import {dataContainer} from "@/types/types";

const initialState: dataContainer = {
    carts: []
}

export const storeSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setStore(state, action) {
            state.carts = action.payload
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

export const { setStore } = storeSlice.actions
export const selectStore = (state: AppState) => state.shop.carts

export default storeSlice.reducer;
