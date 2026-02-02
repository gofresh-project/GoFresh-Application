import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Users from "./Components/Users";
import UserAction from "./Components/UserAction";
import Vendors from "./Components/Vendors";
import VendorAction from "./Components/VendorAction";
import ApprovedVendors from "./Components/ApprovedVendors";
import Products from "./Components/Products";

import "./App.css";

function Layout() {
  const location = useLocation();

  // ✅ show navbar ONLY on dashboard (/)
  const showNavbar = location.pathname === "/";

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserAction />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendor-action/:id" element={<VendorAction />} />
        <Route path="/approved-vendors" element={<ApprovedVendors />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
