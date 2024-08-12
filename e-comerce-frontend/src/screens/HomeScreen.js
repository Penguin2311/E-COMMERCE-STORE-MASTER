import "./HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import the Product component
import Product from "../components/Product";

// Import action creators
import { getProducts as fetchProducts } from "../redux/actions/productActions";
import { setUserDeatils } from "../redux/actions/userAction";

const HomeScreen = () => {
  const dispatch = useDispatch();

  // Retrieve products and loading/error states from the Redux store
  const { products, loading, error } = useSelector((state) => state.getProducts);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Set user details on component mount
  useEffect(() => {
    dispatch(setUserDeatils());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Latest Products</h2>
      <p className="homescreen__subtitle">
        Summer Collection New Modern Design
      </p>

      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
