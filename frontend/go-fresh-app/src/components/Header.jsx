import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Make sure this import is correct
import "../styles/Header.css";
import { useState, useEffect } from "react";
import { PersonCircle, BoxArrowRight, PersonBadge, Envelope, Telephone } from 'react-bootstrap-icons';

export default function Header() {
  // Use the cart context - this gives you access to cart and getCartItemCount
  const { cart, getCartItemCount } = useCart(); // Destructure getCartItemCount here
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
    window.location.reload();
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.username) {
      return user.username;
    }
    return "User";
  };

  const getUserInitial = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getRoleName = () => {
    if (!user?.role?.roleName) return "User";
    
    const role = user.role.roleName;
    const roleColors = {
      'Customer': { bg: '#0dcaf0', color: '#fff' },
      'Vendor': { bg: '#fd7e14', color: '#fff' },
      'Admin': { bg: '#dc3545', color: '#fff' }
    };
    
    return {
      name: role,
      ...roleColors[role] || { bg: '#6c757d', color: '#fff' }
    };
  };

  // Calculate cart item count
  const calculateCartItemCount = () => {
    // If getCartItemCount function exists, use it
    if (getCartItemCount) {
      return getCartItemCount();
    }
    // Otherwise, fall back to cart.length
    return cart ? cart.length : 0;
  };

  return (
    <Navbar expand="lg" className="gofresh-navbar" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/home" className="gofresh-brand">
          <span className="brand-icon">🍏</span> Go-Fresh
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Navigation */}
          <Nav className="me-auto gofresh-nav">
            <Nav.Link as={Link} to="/home">
              <span className="nav-icon">🏠</span> Home
            </Nav.Link>

            <Nav.Link as={Link} to="/products">
              <span className="nav-icon">🛒</span> Products
            </Nav.Link>

            <NavDropdown 
              title={
                <>
                  <span className="nav-icon">📦</span> Categories
                </>
              } 
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/category/fruits">
                <span className="dropdown-icon">🍎</span> Fruits
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/vegetables">
                <span className="dropdown-icon">🥦</span> Vegetables
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/offers">
                <span className="dropdown-icon">🔥</span> Hot Offers
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right Side */}
          <div className="header-right-section">
            {/* Search Bar */}
            <Form className="header-search me-3">
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <Form.Control
                  type="search"
                  placeholder="Search fruits, veggies..."
                  aria-label="Search"
                  className="search-input"
                />
              </div>
            </Form>

            {/* Cart with Icon */}
            <Link to="/cart" className="cart-button">
              <span className="cart-icon">🛒</span>
              <span className="cart-count">
                {calculateCartItemCount()}
              </span>
            </Link>

            {/* User Profile or Login Button */}
            {user ? (
              <div className="user-profile-wrapper">
                <div
                  className="profile-trigger"
                  onClick={() => setShowDropdown(!showDropdown)}
                  onMouseEnter={() => setShowDropdown(true)}
                >
                  <div className="user-avatar" style={{ backgroundColor: getRoleName().bg }}>
                    {getUserInitial()}
                  </div>
                  <div className="user-greeting">
                    <span className="greeting-text">Hi,</span>
                    <span className="user-name">{getUserName().split(' ')[0]}</span>
                  </div>
                  <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
                </div>
                
                {showDropdown && (
                  <div 
                    className="profile-dropdown"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    {/* Profile Header */}
                    <div className="profile-header">
                      <div className="profile-avatar-large" style={{ backgroundColor: getRoleName().bg }}>
                        {getUserInitial()}
                      </div>
                      <div className="profile-info">
                        <h6 className="profile-name">{getUserName()}</h6>
                        <div className="profile-role" style={{ backgroundColor: getRoleName().bg, color: getRoleName().color }}>
                          {getRoleName().name}
                        </div>
                        <div className="profile-contact">
                          {user.email && (
                            <span className="contact-item">
                              <Envelope size={12} /> {user.email}
                            </span>
                          )}
                          {user.phoneNumber && (
                            <span className="contact-item">
                              <Telephone size={12} /> {user.phoneNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="dropdown-divider"></div>

                    {/* Quick Actions */}
                    <div className="dropdown-actions">
                      <Link to="/profile" className="dropdown-item">
                        <PersonCircle className="action-icon" />
                        <span>My Profile</span>
                      </Link>
                      {user.role?.roleName === 'Vendor' && (
                        <Link to="/vendor/dashboard" className="dropdown-item">
                          <PersonBadge className="action-icon" />
                          <span>Vendor Dashboard</span>
                        </Link>
                      )}
                      {user.role?.roleName === 'Admin' && (
                        <Link to="/admin/dashboard" className="dropdown-item">
                          <PersonBadge className="action-icon" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                    </div>

                    <div className="dropdown-divider"></div>

                    {/* Logout */}
                    <button 
                      className="logout-button"
                      onClick={handleLogout}
                    >
                      <BoxArrowRight className="logout-icon" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-link">
                <Button variant="success" className="login-button">
                  <PersonCircle className="me-2" />
                  Login / Register
                </Button>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import "../styles/Header.css";
// import { useState, useEffect } from "react";
// import { PersonCircle, BoxArrowRight, PersonBadge, Envelope, Telephone } from 'react-bootstrap-icons';

// export default function Header() {
//   const { cart } = useCart();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   // Check if user is logged in
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     setShowDropdown(false);
//     navigate("/");
//     window.location.reload();
//   };

//   const getUserName = () => {
//     if (user?.firstName && user?.lastName) {
//       return `${user.firstName} ${user.lastName}`;
//     }
//     if (user?.firstName) {
//       return user.firstName;
//     }
//     if (user?.username) {
//       return user.username;
//     }
//     return "User";
//   };

//   const getUserInitial = () => {
//     if (user?.firstName) {
//       return user.firstName.charAt(0).toUpperCase();
//     }
//     if (user?.username) {
//       return user.username.charAt(0).toUpperCase();
//     }
//     return "U";
//   };

//   const getRoleName = () => {
//     if (!user?.role?.roleName) return "User";
    
//     const role = user.role.roleName;
//     const roleColors = {
//       'Customer': { bg: '#0dcaf0', color: '#fff' },
//       'Vendor': { bg: '#fd7e14', color: '#fff' },
//       'Admin': { bg: '#dc3545', color: '#fff' }
//     };
    
//     return {
//       name: role,
//       ...roleColors[role] || { bg: '#6c757d', color: '#fff' }
//     };
//   };

//   return (
//     <Navbar expand="lg" className="gofresh-navbar" sticky="top">
//       <Container>
//         {/* Brand */}
//         <Navbar.Brand as={Link} to="/home" className="gofresh-brand">
//           <span className="brand-icon">🍏</span> Go-Fresh
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />

//         <Navbar.Collapse id="basic-navbar-nav">
//           {/* Left Navigation */}
//           <Nav className="me-auto gofresh-nav">
//             <Nav.Link as={Link} to="/home">
//               <span className="nav-icon">🏠</span> Home
//             </Nav.Link>

//             <Nav.Link as={Link} to="/products">
//               <span className="nav-icon">🛒</span> Products
//             </Nav.Link>

//             <NavDropdown 
//               title={
//                 <>
//                   <span className="nav-icon">📦</span> Categories
//                 </>
//               } 
//               id="basic-nav-dropdown"
//             >
//               <NavDropdown.Item as={Link} to="/category/fruits">
//                 <span className="dropdown-icon">🍎</span> Fruits
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} to="/category/vegetables">
//                 <span className="dropdown-icon">🥦</span> Vegetables
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item as={Link} to="/offers">
//                 <span className="dropdown-icon">🔥</span> Hot Offers
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>

//           {/* Right Side */}
//           <div className="header-right-section">
//             {/* Search Bar */}
//             <Form className="header-search me-3">
//               <div className="search-wrapper">
//                 <span className="search-icon">🔍</span>
//                 <Form.Control
//                   type="search"
//                   placeholder="Search fruits, veggies..."
//                   aria-label="Search"
//                   className="search-input"
//                 />
//               </div>
//             </Form>

//             {/* Cart with Icon */}
//             <Link to="/cart" className="cart-button">
//               <span className="cart-icon">🛒</span>
//               <span className="cart-count">{cart.length}</span>
//             </Link>

//             {/* User Profile or Login Button */}
//             {user ? (
//               <div className="user-profile-wrapper">
//                 <div
//                   className="profile-trigger"
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   onMouseEnter={() => setShowDropdown(true)}
//                 >
//                   <div className="user-avatar" style={{ backgroundColor: getRoleName().bg }}>
//                     {getUserInitial()}
//                   </div>
//                   <div className="user-greeting">
//                     <span className="greeting-text">Hi,</span>
//                     <span className="user-name">{getUserName().split(' ')[0]}</span>
//                   </div>
//                   <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
//                 </div>
                
//                 {showDropdown && (
//                   <div 
//                     className="profile-dropdown"
//                     onMouseLeave={() => setShowDropdown(false)}
//                   >
//                     {/* Profile Header */}
//                     <div className="profile-header">
//                       <div className="profile-avatar-large" style={{ backgroundColor: getRoleName().bg }}>
//                         {getUserInitial()}
//                       </div>
//                       <div className="profile-info">
//                         <h6 className="profile-name">{getUserName()}</h6>
//                         <div className="profile-role" style={{ backgroundColor: getRoleName().bg, color: getRoleName().color }}>
//                           {getRoleName().name}
//                         </div>
//                         <div className="profile-contact">
//                           {user.email && (
//                             <span className="contact-item">
//                               <Envelope size={12} /> {user.email}
//                             </span>
//                           )}
//                           {user.phoneNumber && (
//                             <span className="contact-item">
//                               <Telephone size={12} /> {user.phoneNumber}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="dropdown-divider"></div>

//                     {/* Quick Actions */}
//                     <div className="dropdown-actions">
//                       <Link to="/profile" className="dropdown-item">
//                         <PersonCircle className="action-icon" />
//                         <span>My Profile</span>
//                       </Link>
//                       {user.role?.roleName === 'Vendor' && (
//                         <Link to="/vendor/dashboard" className="dropdown-item">
//                           <PersonBadge className="action-icon" />
//                           <span>Vendor Dashboard</span>
//                         </Link>
//                       )}
//                       {user.role?.roleName === 'Admin' && (
//                         <Link to="/admin/dashboard" className="dropdown-item">
//                           <PersonBadge className="action-icon" />
//                           <span>Admin Dashboard</span>
//                         </Link>
//                       )}
//                     </div>

//                     <div className="dropdown-divider"></div>

//                     {/* Logout */}
//                     <button 
//                       className="logout-button"
//                       onClick={handleLogout}
//                     >
//                       <BoxArrowRight className="logout-icon" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="login-link">
//                 <Button variant="success" className="login-button">
//                   <PersonCircle className="me-2" />
//                   Login / Register
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

