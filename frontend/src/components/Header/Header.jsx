import React from 'react'
import "./Header.css"
const Header = () => {
  const headerStyle = {
    height: '34vw', // Wrap units like 'vw' in quotes
    margin: '30px auto',
    background: "url('/Header2.jpg') no-repeat center center", // Use a string for the URL
    backgroundSize: 'cover',
    position: 'relative',
    borderRadius: '25px',
  };


  return (
    <div style={headerStyle} className='header'> 
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary 
              experties </p>
            <button>View Menu</button>
        </div>
      
    </div>
  )
}

export default Header
