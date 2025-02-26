import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import "./FoodDetail.css"; // Import CSS file

const FoodDetail = () => {
    const { food_list, url, cartItems, addtoCart, removeFromCart } = useContext(StoreContext);
    const { id } = useParams();
    const navigate = useNavigate();

    if (!food_list) return <h2 className="food-not-found">Loading...</h2>;

    const food = food_list.find((item) => item._id === id);
    if (!food) return <h2 className="food-not-found">Food item not found</h2>;

    return (
        <div className="food-detail-container">
            <div className="food-card">
                {/* Food Image */}
                <img className="food-image" src={url + "/images/" + food.image} alt={food.name} />

                {/* Food Details */}
                <div className="food-info">
                    <h1 className="food-name">{food.name}</h1>
                    <p className="food-description">{food.description}</p>
                    <h3 className="food-price">Price: ₹ {food.price * 49}</h3>

                    {/* Add to Cart Functionality */}
                    {!cartItems[id] ? (
                        <button className="add-btn" onClick={() => addtoCart(id)}>
                            Add to Cart
                        </button>
                    ) : (
                        <div className="food-item-counter">
                            <button className="counter-btn" onClick={() => removeFromCart(id)}>-</button>
                            <p className="counter-value">{cartItems[id]}</p>
                            <button className="counter-btn" onClick={() => addtoCart(id)}>+</button>
                        </div>
                    )}

                    {/* Back Button */}
                    <button onClick={() => navigate("/")} className="back-btn">
                        Back to Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
