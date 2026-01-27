// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// export default function Header() {
//   const { cart } = useCart(); // ✅ get cart from context

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Go-Fresh</Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           {/* Left menu */}
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/home">Home</Nav.Link>
//             <Nav.Link as={Link} to="/products">Products</Nav.Link>

//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>

//           {/* Search Bar (Right side) */}
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search fruits & veggies"
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="success">Search</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>

//       <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
//         <Link to="/">GoFresh</Link>
//         <Link to="/cart" style={{ marginLeft: "20px" }}>
//           Cart ({cart.length})
//         </Link>
//       </nav>
//     </Navbar>
//   );
// }

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

export default function Header() {
  const { cart } = useCart(); // ✅ cart from context

  return (
    <Navbar expand="lg" className="gofresh-navbar" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/home" className="gofresh-brand">
          Go-Fresh
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Navigation */}
          <Nav className="me-auto gofresh-nav">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/category/fruits">
                Fruits
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/vegetables">
                Vegetables
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/offers">
                Offers
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right Side */}
          <Form className="d-flex align-items-center gofresh-search">
            <Form.Control
              type="search"
              placeholder="Search fruits & veggies"
              aria-label="Search"
            />

            <Button variant="success" className="ms-2">
              Search
            </Button>

            <Link to="/cart" className="cart-link">
              Cart ({cart.length})
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
