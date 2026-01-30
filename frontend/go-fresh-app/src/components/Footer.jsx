import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="gofresh-footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <h2 className="footer-brand">Go-Fresh</h2>
          <p className="footer-text">
            Fresh fruits & vegetables delivered directly from local vendors to
            your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/offers">Offers</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4 className="footer-title">Categories</h4>
          <ul>
            <li><Link to="/category/fruits">Fruits</Link></li>
            <li><Link to="/category/vegetables">Vegetables</Link></li>
            <li><Link to="/category/organic">Organic</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-title">Contact</h4>
          <p>Email: support@gofresh.com</p>
          <p>Phone: +91 90000 00000</p>
          <p>Location: India</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Go-Fresh. All rights reserved.</p>
      </div>
    </footer>
  );
}
