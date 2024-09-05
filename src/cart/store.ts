import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './cartSlice'
import ModalReducer from './ModalSlice'
export const store =configureStore({
  reducer:{
    cart: CartReducer,
    modal: ModalReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch