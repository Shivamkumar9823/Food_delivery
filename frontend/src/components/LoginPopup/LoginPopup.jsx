import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'
import axios from "axios"



const LoginPopup = ({setShowLogin}) => {    
  const {url, setToken} = useContext(StoreContext)

  const [ currState, setCurrState ] = useState("Sign up")
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event)=>{
     const name = event.target.name;
     const value = event.target.value;
     setData(data =>({...data,[name]:value}))
  }

  // useEffect(()=>{
  //   console.log(data)
  // })
5
  const onLogin = async(event)=>{
      event.preventDefault(); //page will not load..
      let newUrl = url;
      if(currState === "Login"){
        newUrl +="/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }
      
    const response = await axios.post(newUrl, data); 
     //The data is sending and response is also recieving from server.

      console.log("Response : ",response)
      if( response.data.success ){
           setToken(response.data.token);
           localStorage.setItem("token", response.data.token);
           setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }

  }


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
               <h2>{currState}</h2>
               <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" /> 
            </div>
            <div className="login-popup-input">
              {currState === "Login"?
               <></>:
               <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />
               }
               <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Your Email' required/>
               <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder='Password' required />
            </div>

            <button type='submit'>{currState === "Sign up"?"Create Account":"Login" }</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & Privacy policy.</p>
            </div>
            {
                
            currState === "Login"
            ?
            <p>Create a New account ? <span onClick={()=>setCurrState("Sign up")}>Click Here</span></p>
            :
            <p>Already have an account ?<span onClick={()=>setCurrState("Login")}>Login here</span></p>

            }
            
           
        </form>
    </div>
  )
}

export default LoginPopup

