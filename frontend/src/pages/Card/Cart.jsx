import React, { useContext } from 'react'
import "./cart.css"
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems,food_list,removeFromCart, getTotalCartAmount} = useContext(StoreContext);
  
  const Navigate = useNavigate();

  return (
    <div className='cart'>
        <div className="cart-items">
              <div className="cart-items-title">
                 <p>Items</p>
                 <p>Title</p>
                 <p>Price</p>
                 <p>Quantity</p>
                 <p>Total</p>
                 <p>Remove</p>
              </div>
              <br />
              <hr />

              {food_list.map((item, index)=>{
                if(cartItems[item._id]>0){ // if quantity of a perticular item is greater than 0 
                  return(
                    <div>
                          <div className='cart-items-title cart-items-item'>
                         <img src={item.image} alt="" />
                         <p>{item.name}</p>
                         <p>{item.price*45}</p>
                         <p>{cartItems[item._id]}</p>
                         <p>Total Price :{item.price*45*cartItems[item._id]}</p>
                         <p onClick={()=>removeFromCart(item._id)} className='cross'>  x   </p>
                    </div>
                      <hr />
                      
                    </div>

                  )
                }
              })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>
              card Totals 
            </h2>
            <div>
              <div className='cart-total-details'> 
                <p>Subtotal</p>
                <p>{getTotalCartAmount()*45}</p>
              </div>
              <hr />
              <div className='cart-total-details'> 
                <p>Delivery Fee</p>  
                <p>{55}</p>  
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Total</p>
                <p>{getTotalCartAmount()*45+55}</p>
              </div>
            </div>
            <button onClick={()=>Navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>
                If You have a promo code, Enter it here.
              </p>
              <div className="cart-promocode-input">
                   <input type="text" placeholder='Promo code' />
                   <button>Submit</button>
              </div>
            </div>
           </div>
        </div>
    </div>
  )
}

export default Cart
