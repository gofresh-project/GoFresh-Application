import './App.css';
import { Routes, Route } from 'react-router-dom'; // no BrowserRouter here
import WelcomePage from "./components/Welcome";
import LoginComp from './components/LoginComp';
import RegisterComp from './components/RegisterComp';
import AppHome from './components/AppHome';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import { CartProvider } from "./context/CartContext";
import Cart from './pages/Cart';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <Header /> {/* visible on all pages */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<AppHome />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer/>
    </CartProvider>
  );
}

export default App;
