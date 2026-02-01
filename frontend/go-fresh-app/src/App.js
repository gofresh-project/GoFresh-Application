import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginComp from "./components/LoginComp";
import RegisterComp from "./components/RegisterComp";
import WelcomePage from "./components/Welcome";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Vendor from "./pages/Vendor";
import { CartProvider } from "./context/CartContext";
<<<<<<< HEAD
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

=======
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
>>>>>>> 6ee5750c13b7559524f103b717ee2eb966c1f0fb

function App() {
  return (
    <CartProvider>
      <Header />

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/vendor" element={<Vendor />} />
<<<<<<< HEAD
         <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/orders" element={<MyOrders />} />
=======
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
>>>>>>> 6ee5750c13b7559524f103b717ee2eb966c1f0fb

      </Routes>
    </CartProvider>
  );
}

export default App;
