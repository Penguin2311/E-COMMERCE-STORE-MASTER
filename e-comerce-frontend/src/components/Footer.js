import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Contact Us</h3>
          <p>Email: support@example.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 E-commerce St, Shopville, USA</p>
        </div>
        <div className="footer__section">
        <h3>Follow Us</h3>
        <ul>
            <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
            </a>
            </li>
            <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
            </a>
            </li>
            <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
            </a>
            </li>
            <li>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
            </a>
            </li>
        </ul>
        </div>

      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 E-commerce. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
