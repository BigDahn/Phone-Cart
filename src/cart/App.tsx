
import Navbars from "./Navbars"
import MainCart from "./MainCart"
import { useAppSelector,useAppDispatch } from "../hooks"
import Modal from "./Modal"
import { useEffect } from "react"
import { getCartItems } from "./cartSlice"


const App = () => {
  const { isModalOpen } = useAppSelector((state) => state.modal)
 const { isLoading } = useAppSelector((state) => state.cart)
 

  const dispatch = useAppDispatch()
   useEffect(() => {
     dispatch(getCartItems())
   }, [])

   if (isLoading === 'pending') {
        return (
          <div className='loading'>
            <div className='loader'></div>
          </div>
        )
   }
 
 
  return (
    <div>
      {isModalOpen && <Modal/>}
      <Navbars />
      <MainCart/>
      
    </div>
  )
}

export default App
