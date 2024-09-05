import { createSlice } from "@reduxjs/toolkit";


type defaultState = {
  isModalOpen: boolean
}

const initialState:defaultState ={
  isModalOpen: false
}

export const modalSlice = createSlice({
  name:'modal',
  initialState,
  reducers:{
    openModal :(state)=>{
      state.isModalOpen = true
    },
    closeModal: (state) =>{
      state.isModalOpen = false
    }
  }
})


export const {openModal,closeModal} = modalSlice.actions

export default modalSlice.reducer