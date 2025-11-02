import React, { useContext, useEffect, useState } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/storeContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
  const {food_list} = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  console.log(food_list );

  useEffect(()=>{
      if (food_list && food_list.length > 0) {
      setLoading(false);
    }
  },[category, food_list])

  if (loading) {
    return (
      <div className="food-display-loading">
        <h2>Loading delicious dishes 🍽️...</h2>
      </div>
    );
  }

  return (
     <div className='food-display' id='food-display'>
        <h2> Top dishes near you.</h2>

        <div className="food-display-list">
          {
           food_list.map((item, index)=>{
               if( category==="All"  || category.toLowerCase() === item.category.toLowerCase() ){
                    return <FoodItem key={index} id={item._id} name={item.name} description ={item.description} price={item.price} image={item.image} />
               }   
            })
          }
         </div>
      </div>
  )
}

export default FoodDisplay





