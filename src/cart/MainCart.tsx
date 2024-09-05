
import { useAppDispatch, useAppSelector } from "../hooks"
import CartItem from "./CartItem"
import { openModal } from "./ModalSlice"


const MainCart = () => {
  const { cart,total } = useAppSelector((state) => state.cart)
   const dispatch = useAppDispatch()
 
   
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        <CartItem  cart={cart} />
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={()=>dispatch(openModal())}>clear cart</button>
      </footer>
    </section>
  )
}

export default MainCart
