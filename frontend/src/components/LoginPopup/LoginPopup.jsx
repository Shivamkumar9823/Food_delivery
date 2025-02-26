import React, { useContext, useState } from 'react';
import "./LoginPopup.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const [currState, setCurrState] = useState("Sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault(); // Prevent page reload
    setLoading(true); 

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!", { theme: "colored" });
        setTimeout(() => {
          setShowLogin(false); // Close login popup after success
        }, 1000);
      } else {
        toast.error(response.data.message, { theme: "colored" });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!", { theme: "colored" });
      console.error("Login Error:", error);
    } finally {
      setLoading(false); // Hide loading spinner after response
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? null : (
            <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />
          )}
          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Your Email' required />
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder='Password' required />
        </div>

        <button type='submit' disabled={loading} className="submit-button">
          {loading ? "Processing..." : currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        {loading && (
          <div className="spinner"></div> // Loading spinner
        )}


        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & Privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>Create a New account? <span onClick={() => setCurrState("Sign up")}>Click Here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
