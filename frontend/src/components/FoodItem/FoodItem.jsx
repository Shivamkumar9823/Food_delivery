import './FoodItem.css'
import { assets, food_list } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext';
import { useContext } from 'react';

const FoodItem = ({ id, name, price, description, image}) => {
    const {cartItems,addtoCart, removeFromCart} = useContext(StoreContext);
    return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={image} alt="" />
            { !cartItems[id]
               ? <img className='add' onClick={()=>addtoCart(id)} src={assets.add_icon_white} alt="" />
               : <div className='food-item-counter'>
                   <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                   <p>{cartItems[id]}</p>
                   <img onClick={()=>addtoCart(id)}src={assets.add_icon_green} alt="" />
                 </div>
             }
        </div>
        <div className="food-item-info">
             <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
             </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>₹ {price*49}</p>
        </div>
    </div>
  )
}

export default FoodItem
