import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home";
import Card from "./pages/Card/Card";
import Placeorder from './pages/Placeorder/Placeorder';

const App = () => {
  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          < Route path='/' element={<Home />} />
          < Route path='/card' element={<Card />} />
          < Route path='/placeorder' element={<Placeorder />} />
        </Routes>
      </div>
      <Footer />

    </>

  )
}

export default App
