import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "./cart";
import { cartSchema } from "./cart";
import {data} from "./data";
import axios from "axios";
const url = 'https://www.course-api.com/react-useReducer-cart-project'

 export const getCartItems = createAsyncThunk(
   'cart/getCartItems',
   async (name, thunkAPI) => {
     try {
       console.log(name);
       // console.log(thunkAPI);
       // console.log(thunkAPI.getState());
       // thunkAPI.dispatch(openModal());
       const resp = await axios(url)

       return resp.data
     } catch (error) {
       return thunkAPI.rejectWithValue('something went wrong')
     }
   }
 )


export type cartSchema = 
  {
    id: string
    title: string
    amount: number
    img: string
    price: number
  }

type LoadingState = 'idle'|'pending' | 'succeeded' | 'failed'



type DefaultState = {
  cart: cartSchema[] ;
  total: number;
  amount:number,
  isLoading: LoadingState
}
 



const initialState :DefaultState = {
  cart:[],
  amount: data.reduce((ini,curr)=>{
      ini += curr.amount
      return ini
  },0),
  total: data.reduce((initial,current)=>{
      initial += current.price
      return initial
  },0),
  isLoading: 'pending'

}
  
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action:PayloadAction<cartSchema>) => {
      const {id} = action.payload
      
      const tempIncrease = state.cart.map((carts)=>{
        if (carts.id === id) {
          return {...carts,amount:carts.amount + 1}
        }
        return carts
      })

      const salaryInc = tempIncrease.reduce((ini,curr)=>{
          ini += curr.amount
          return ini
      },0)

      const NewTotal = tempIncrease.reduce((ini,curr)=>{
          ini += (curr.amount * curr.price)
          return ini
      },0)

      state.cart = tempIncrease
      state.amount = salaryInc
      state.total = NewTotal
    },
    decrease:(state,action:PayloadAction<cartSchema>)=>{
        const { id } = action.payload

        const tempDecrease = state.cart.map((carts) => {
          if (carts.id === id) {
            return { ...carts, amount: carts.amount - 1 }
          }
          return carts
        })
        .filter((cartItem)=>cartItem.amount !== 0)

        const AmountDec = tempDecrease.reduce((ini, curr) => {
          ini += curr.amount
          return ini
        }, 0)

        const NewTotal = tempDecrease.reduce((ini,curr)=>{
          ini += (curr.amount * curr.price)
          return ini;
        },0)

        state.cart = tempDecrease
        state.amount = AmountDec
        state.total = NewTotal

    },
    removeItem: (state,action:PayloadAction<cartSchema>)=>{
        const {id} = action.payload;
        const UpdatedCart = state.cart.filter((carts)=> carts.id !== id)
        state.cart = UpdatedCart
        const newAmount = UpdatedCart.reduce((ini,curr)=>{
             ini += curr.amount
             return ini
        },0)
        state.amount = newAmount

        const newTotal = UpdatedCart.reduce((ini,curr)=>{
          ini += (curr.amount * curr.price)
          return ini
        },0)

        state.total = newTotal
    },
    clearCart : (state)=>{
        state.amount = 0,
        state.total = 0,
        state.cart = []
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getCartItems.pending,(state)=>{
      state.isLoading = 'pending'
    })
    .addCase(getCartItems.fulfilled,(state,action)=>{
      state.isLoading = 'succeeded'
      state.cart = action.payload
    })
    .addCase(getCartItems.rejected,(state,action)=>{
      state.isLoading = 'failed'
      console.log(action)
    })
  }
})



  export const {increase,decrease,clearCart,removeItem} = cartSlice.actions
  
  export default cartSlice.reducer