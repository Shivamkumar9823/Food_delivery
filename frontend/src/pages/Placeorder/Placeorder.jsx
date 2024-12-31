import React, { useContext, useState } from 'react'
import "./placeorder.css"
import { Form } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'

const Placeorder = () => {
const {getTotalCartAmount, token, food_list,cartItems, url} = useContext(StoreContext)

const [data,setData] = useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""

})

const onchangeHandler = (event) =>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data =>({...data,[name]:value}))
}

const placeorder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    console.log(orderItems);
    let orderData = {
      address: data,
      items:orderItems,
      amount: getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{Headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error something")
    }
}



  return (
    <form className='place-order'>
       <div className="place-order-left">
              <p className="title">Delevery Information</p>
              <div className="multi-fields">
                <input required name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                <input required name="lastName"  onChange={onchangeHandler} value={data.lastName}  type="text" placeholder='Last Name' />
              </div>
                <input required name="email"  onChange={onchangeHandler} value={data.email}  type="text" placeholder='Email Address' />
                <input required name='street' onChange={onchangeHandler} value={data.street} type="text" placeholder='Street' />
              <div className="multi-fields">
                <input required name='city'   onChange={onchangeHandler} value={data.city}   type="text" placeholder='City' />
                <input required  name='state' onChange={onchangeHandler} value={data.state}  type="text" placeholder='State' />
              </div>
              <div className="multi-fields">
                <input required name='zipcode' onChange={onchangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
                <input required name='country' onChange={onchangeHandler} value={data.country} type="text" placeholder='Country' />
              </div>
              <input required name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone' />
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
          <button onClick={placeorder} >PROCEED TO PAYMENT</button>
        </div>

      </div>
    </form>
  )
}

export default Placeorder
