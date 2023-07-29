import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit'
import {createWrapper} from 'next-redux-wrapper'

import {storeSlice} from './reducers/storeSlice'
import {cartSlice} from "@/store/reducers/cartSlice";
import {walletSlice} from "@/store/reducers/walletSlice";


const makeStore = () =>
    configureStore({
        reducer: {
            [storeSlice.name]: storeSlice.reducer,
            [cartSlice.name]: cartSlice.reducer,
            [walletSlice.name]: walletSlice.reducer,
        },
        devTools: true
    })

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);