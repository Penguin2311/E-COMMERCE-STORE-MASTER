import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/localstorage";
import { setInitialState } from "../redux/actions/userAction";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log({user})

  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const _handleLogout = () => {
    // console.log('click')
    dispatch(setInitialState());
    logout();
    history.push("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
        <h2>E-commerce</h2>
        </Link>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="nav-buttons">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>

        {!user.userInfo.isLogin ? (
          <li>
            <Link to="/signin" className="nav-buttons">
              Login
            </Link>
          </li>
        ) : (
          <li>
            <p className="nav-buttons" onClick={_handleLogout}>
              Logout
            </p>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
