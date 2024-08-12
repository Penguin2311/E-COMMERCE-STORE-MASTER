import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div className="cartitem">
      {/* Display the product image */}
      <div className="cartitem__image">
        <img src={item.imageUrl} alt={item.name} />
      </div>

      {/* Link to the product details page */}
      <Link to={`/product/${item.product}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link>

      {/* Show the price of the item */}
      <p className="cartitem__price">${item.price}</p>

      {/* Dropdown to select the quantity of the item */}
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="cartItem__select"
      >
        {/* Create options based on the item's stock count */}
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>

      {/* Button to remove the item from the cart */}
      <button
        className="cartItem__deleteBtn"
        onClick={() => removeHandler(item.product)}
      >
        <img
          src="bin.PNG"
          alt="Remove item"
          className="cartItem__deleteIcon" // Class for styling the delete icon
        />
      </button>
    </div>
  );
};

export default CartItem;
