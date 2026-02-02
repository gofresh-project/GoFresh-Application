import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="navbar-title">Admin Panel</div>

      <div className="navbar-links">
        <Link 
          to="/users" 
          className={location.pathname === "/users" ? "active" : ""}
        >
          Users
        </Link>

        <Link 
          to="/vendors" 
          className={location.pathname === "/vendors" ? "active" : ""}
        >
          Vendors
        </Link>

        <Link 
          to="/approved-vendors" 
          className={location.pathname === "/approved-vendors" ? "active" : ""}
        >
          Approved Vendors
        </Link>

        <Link to="/products">Products</Link>

      </div>
    </div>
  );
}

export default Navbar;
