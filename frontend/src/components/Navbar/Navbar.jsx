import React, { useContext, useState, useRef } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/storeContext';
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { getTotalCartAmount, token, setToken, food_list,url } = useContext(StoreContext);
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        toast.success("Logout successfully!", {theme:'colored'});
        navigate("/");
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        setTimeout(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 100);
    };

    // Filter food_list based on the search query
    const filteredFoodItems = food_list.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                    <div className="navbar-search-container">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search food items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <img src={assets.search_icon} alt="Open Search"  />
                        {searchQuery && (
                            <div className="search-results">
                                {filteredFoodItems.length > 0 ? (
                                    filteredFoodItems.map(item => (
                                        <Link
                                            key={item.id}
                                            to={`/food/${item._id}`}
                                            onClick={() => {
                                                setShowSearch(false);
                                                setSearchQuery("");
                                            }}
                                        >
                                            <div className="search-result-item">
                                                <img src={url+"/images/"+item.image} alt={item.name} />
                                                <p>{item.name}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="no-results">No results found</p>
                                )}
                            </div>
                        )}
                    </div>
                
              
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Signin</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate("/myorders")}>
                                <img src={assets.bag_icon} alt="Orders" />
                                <p>Order</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
