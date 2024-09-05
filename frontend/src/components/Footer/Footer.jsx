import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sit explicabo quasi nisi veritatis, quam nemo ipsum beatae sunt totam repudiandae repellat omnis in recusandae sint nihil ut, tempora eligendi!</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>

                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+9176879883</li>
                        <li>Contact@tomato.com</li>
                    </ul>
                </div>
            </div>

            <hr />
            <p className='footer-copyright'>Copyright 2024 Tomato.com- All Right Reserved. 
                   
            </p>
        </div>
    )
}

export default footer
