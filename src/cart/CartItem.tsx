import { useAppDispatch, useAppSelector } from "../hooks"


import { cartSchema, decrease, increase, removeItem } from "./cartSlice"


type CartProps = {
    cart: cartSchema[]

}





const CartItem = ({cart}:CartProps) => {
  const dispatch = useAppDispatch()


if(cart.length === 0){
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h4 className="empty-cart">is currently empty</h4>
      </header>
    </section>
  )
}
  

  
  return (
    <article>
      {cart.map((cart)=>{
        const {img,price,id,title,amount} = cart
        return (
          <article className="cart-item" key={id}>
            <img src={img} alt={title} />
            <div>
              <h4>{title}</h4>
              <h4 className="item-price">${price}</h4>
              {/* remove button */}
              <button className="remove-btn" onClick={()=>dispatch(removeItem(cart))}>remove</button>
            </div>
            <div>
              {/* increase amount */}
              <button
                className="amount-btn"
                onClick={() => dispatch(increase(cart))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
                </svg>
              </button>
              {/* amount */}
              <p className="amount">{amount}</p>
              {/* decrease amount */}
              <button
                className="amount-btn"
                onClick={() => dispatch(decrease(cart))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
            </div>
          </article>
        )
      }) }
    </article>
  )
}

export default CartItem
