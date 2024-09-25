import React, { useContext } from 'react'
import "./placeorder.css"
import { Form } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'

const placeorder = () => {
const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <form className='place-order'>
       <div className="place-order-left">
              <p className="title">Delevery Information</p>
              <div className="multi-fields">
                <input type="text" placeholder='First Name' />
                <input type="text" placeholder='Last Name' />
              </div>
              <input type="text" placeholder='Email Address' />
              <input type="text" placeholder='Street' />
              <div className="multi-fields">
                <input type="text" placeholder='City' />
                <input type="text" placeholder='State' />
              </div>
              <div className="multi-fields">
                <input type="text" placeholder='Zip Code' />
                <input type="text" placeholder='Country' />
              </div>
              <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h3>
            Card Totals
          </h3>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount() * 45}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>{55}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>{getTotalCartAmount() * 45 + 55}</p>
            </div>
          </div>
          <button >PROCEED TO PAYMENT</button>
        </div>

      </div>
    </form>
  )
}

export default placeorder
