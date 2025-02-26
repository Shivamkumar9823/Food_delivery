import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home";
import Cart from "./pages/Card/Cart";
import Placeorder from './pages/Placeorder/Placeorder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import FoodDetail from './components/FoodDetail/FoodDetail';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const [ShowLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* agar showLogin True h to LoginPop show hoga */}
      { ShowLogin? <LoginPopup setShowLogin={setShowLogin} />:<></> } 
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          < Route path='/' element={<Home />} />
          < Route path='/cart' element={<Cart />} />
          < Route path='/order' element={<Placeorder />} />
          <Route  path='/verify' element={<Verify />} />
          <Route  path='/myorders' element={<MyOrders />} />
          <Route path="/food/:id" element={<FoodDetail />} />
        </Routes>
      </div>
      <Footer />

    </>

  )
}

export default App
