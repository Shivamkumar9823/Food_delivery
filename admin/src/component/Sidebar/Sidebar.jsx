import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [SelectItem , setSelectItem] =  useState("add");


  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' onClick={()=> setSelectItem("add")} className= {`sidebar-option ${SelectItem === "add"? "active": ""}`}>
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' onClick={()=>setSelectItem("list")} className={`sidebar-option ${SelectItem === "list"? "active": ""}`}>
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/order' onClick={()=>setSelectItem("order")} className={`sidebar-option ${SelectItem === "order"? "active": ""}`}>
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidebar
