import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { resolvePath } from "react-router-dom";
// import { food_list } from "../assets/assets";
import { toast } from "react-toastify";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
     const [cartItems, setCartItems] = useState({}); 
     
     const url = "https://food-delivery-backend-vql8.onrender.com";
     const [token, setToken] = useState("");
     const [food_list, setFoodList] = useState([]);
     

      
    

// ======================================= Add to Cart ===================================== //
const isAuthenticated = () => {
    if (!token) {
        toast.warn("You need to log in first!", { theme: "colored" });
        return false;
    }
    return true;
};

    const addtoCart = async(itemId) => {
        if (!isAuthenticated(token)) return;
        if(!cartItems[itemId]){
           setCartItems((prev)=>({...prev,[itemId]:1}))  // setting quantity to 1.
           toast.success("Food Item added to cart!", { theme: "colored" });
         }
        else{
          setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))   // increase quantity by 1.
          toast.success("Food Item added to cart!", { theme: "colored" });
         }
        if(token){
            await axios.post( url+"/api/cart/add",{itemId},{headers:{token}})  //whatever we added in cart updates in DB also.
         }
        }


    const removeFromCart = async(itemId) => {
       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
       if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        toast.success("Food item removed from cart!", { theme: "colored" });

       }
       }
 


     const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if( cartItems[item] > 0 ){  
             let itemInfo = food_list.find((product)=>product._id === item);
             totalAmount += itemInfo.price* cartItems[item];
            }  
        }
        return totalAmount;
     }



     const fetchFoodList = async ()=> {
              const response = await axios.get(url+"/api/food/list");
              setFoodList(response.data.data);
     }


// fuction to load cart item data from db if page refresh it will fetch from db
     const loadCartData = async (token) =>{
           const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
           setCartItems(response.data.cartData);
           
     }

     //if we load the webpage, not going to logout..
     useEffect(()=>{
        async function loadData(){
               await fetchFoodList();
               if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData(); 
     },[])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addtoCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token, 
        setToken

    }

     useEffect(()=>{
          console.log(cartItems);
     },[cartItems])
    
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
