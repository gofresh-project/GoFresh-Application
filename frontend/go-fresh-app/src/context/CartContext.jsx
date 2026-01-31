// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart from backend when component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setCart([]); // Empty cart if no user
        return;
      }

      // Fetch cart from backend
      const response = await axios.get('http://localhost:8080/cart', {
        headers: {
          'Authorization': `Bearer ${user.token || ''}`,
          'Content-Type': 'application/json'
        }
      });
      
      setCart(response.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // If 404 or no cart, set empty array
      if (error.response?.status === 404) {
        setCart([]);
      } else {
        setError('Failed to load cart');
      }
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, vendorId, quantity) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!user) {
        alert('Please login to add items to cart');
        return false;
      }

      // Prepare cart item data
      const cartItem = {
        productId: parseInt(productId),
        vendorId: parseInt(vendorId),
        quantity: parseInt(quantity)
      };

      // Send to backend
      const response = await axios.post('http://localhost:8080/cart/add', cartItem, {
        headers: {
          'Authorization': `Bearer ${user.token || ''}`,
          'Content-Type': 'application/json'
        }
      });

      // Update local cart state
      setCart(prevCart => {
        // Check if item already exists in cart
        const existingItemIndex = prevCart.findIndex(
          item => item.product.productId === productId && item.vendor.vendorId === vendorId
        );
        
        if (existingItemIndex !== -1) {
          // Update quantity if item exists
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += quantity;
          return updatedCart;
        } else {
          // Add new item to cart
          return [...prevCart, response.data];
        }
      });

      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      await axios.delete(`http://localhost:8080/cart/${cartItemId}`, {
        headers: {
          'Authorization': `Bearer ${user.token || ''}`
        }
      });

      // Update local state
      setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };

  // Update item quantity
  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      const response = await axios.put(`http://localhost:8080/cart/${cartItemId}/quantity`, 
        { quantity: newQuantity },
        {
          headers: {
            'Authorization': `Bearer ${user.token || ''}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update local state
      setCart(prevCart => 
        prevCart.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      
      await axios.delete('http://localhost:8080/cart/clear', {
        headers: {
          'Authorization': `Bearer ${user.token || ''}`
        }
      });

      setCart([]);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  };

  // Calculate total cart value
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // Calculate total items count
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if product is already in cart
  const isInCart = (productId, vendorId) => {
    return cart.some(
      item => item.product.productId === productId && item.vendor.vendorId === vendorId
    );
  };

  // Context value
  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};