import "./CartScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Import CartItem component
import CartItem from "../components/CartItem";

// Import actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import useLogin from "../utils/hooks/useLogin";

const CartScreen = () => {
  const dispatch = useDispatch();
  
  // Retrieve cart state from Redux store
  const cart = useSelector((state) => state.cart);
  
  // Custom hook to get login info
  const { loginInfo } = useLogin();

  // Destructure cartItems from cart state
  const { cartItems } = cart;

  // Handler for changing quantity of items in the cart
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  // Handler for removing items from the cart
  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart({ pId: item.product, _id: item._id }));
  };

  // Calculate total number of items in the cart
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  // Calculate subtotal for the cart
  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  // Placeholder function for checkout
  const handleProceedBtn = () => {
    alert("This feature is coming soon. Stay tuned!");
  };

  // Render loading state or cart contents based on login status
  if (loginInfo.loading) return <h1>Loading...</h1>;
  
  if (!loginInfo.loading && loginInfo.isLogin) {
    return (
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>
          
          {cartItems.length === 0 ? (
            <div>
              Your cart is empty. <Link to="/">Go back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={() => removeFromCartHandler(item)}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button
              title="Checkout functionality is under development."
              onClick={handleProceedBtn}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null; // Return null if user is not logged in
};

export default CartScreen;
