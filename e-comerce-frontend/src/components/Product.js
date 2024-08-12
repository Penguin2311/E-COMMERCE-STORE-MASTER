import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ imageUrl, description, price, name, productId }) => {
  return (
    <div className="product">
      {/* Display the product image */}
      <img src={imageUrl} alt={name} />

      <div className="product__info">
        {/* Show the product name */}
        <p className="info__name">{name}</p>

        {/* Show the product price */}
        <p className="info__price">${price}</p>
      </div>

      {/* Link to the product details page */}
      <Link to={`/product/${productId}`} className="info__button">
        View
      </Link>
    </div>
  );
};

export default Product;

