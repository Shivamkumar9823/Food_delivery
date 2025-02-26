import './FoodItem.css'
import { assets, food_list } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image}) => {

    const {cartItems,addtoCart,removeFromCart, url} = useContext(StoreContext);
  
    return (
   
     <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            { !cartItems[id]
               ? 
               <img className='add' onClick={()=>addtoCart(id)} src={assets.add_icon_white} alt="" />
               :
                <div className='food-item-counter'>
                   <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                   <p>{cartItems[id]}</p>   {/* showing the quantity of that food id */}
                   <img onClick={()=>addtoCart(id)}src={assets.add_icon_green} alt="" />
                 </div>
             }
        </div>
        <div className="food-item-info">
             <div className="food-item-name-rating">
             <Link 
               key={id}
               to={`/food/${id}`}
               > 
               <p className='food-item-name'>{name}</p>

              </Link> 

                <img src={assets.rating_starts} alt="" />
             </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>₹ {price*49}</p>
        </div>
    </div>
   
   
  )
}

export default FoodItem
