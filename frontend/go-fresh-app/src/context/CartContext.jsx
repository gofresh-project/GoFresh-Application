// src/context/CartContext.jsx - CORRECTED VERSION
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  const [currentUser, setCurrentUser] = useState(null);
  const hasFetched = useRef(false); // Track if we've already fetched

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Wrap fetchCart in useCallback to prevent recreating on every render
  const fetchCart = useCallback(async () => {
    try {
      console.log('🔄 fetchCart called - user:', currentUser?.userId);
      setLoading(true);
      
      // Check if user is logged in
      if (!currentUser || !currentUser.userId) {
        setCart([]); // Empty cart if no user
        setError(null);
        setLoading(false);
        return;
      }

      console.log('Fetching cart for user ID:', currentUser.userId);

      // Fetch cart from backend using userId
      const response = await axios.get(`http://localhost:8080/cart?userId=${currentUser.userId}`);
      
      console.log('Cart API response:', response.data);
      
      // Handle empty cart response
      if (response.data && response.data.message === "Cart is empty") {
        setCart([]);
        setError(null);
      } else if (Array.isArray(response.data)) {
        setCart(response.data);
        setError(null);
      } else {
        console.warn('Unexpected cart response:', response.data);
        setCart([]);
        setError('Unexpected cart format');
      }
      
      hasFetched.current = true; // Mark as fetched
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
      
      if (error.response?.status === 404) {
        // Cart is empty - this is normal for new users
        setCart([]);
        setError(null);
      } else {
        setError('Failed to load cart. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [currentUser?.userId]); // Only depend on userId

  // Fetch cart when userId changes AND we haven't fetched yet
  useEffect(() => {
    if (currentUser?.userId && !hasFetched.current) {
      console.log('🔄 useEffect: Fetching cart for user:', currentUser.userId);
      fetchCart();
    } else if (!currentUser) {
      // User logged out
      hasFetched.current = false;
      setCart([]);
    }
  }, [currentUser?.userId, fetchCart]); // Depend on userId and fetchCart

  // Reset hasFetched when user logs out
  useEffect(() => {
    if (!currentUser) {
      hasFetched.current = false;
    }
  }, [currentUser]);

  // Add item to cart - SIMPLIFIED VERSION
  const addToCart = async (productId, vendorId, quantity) => {
    try {
      if (!currentUser || !currentUser.userId) {
        alert('Please login to add items to cart');
        return false;
      }

      const cartItem = {
        userId: currentUser.userId,
        productId: parseInt(productId),
        vendorId: parseInt(vendorId),
        quantity: parseInt(quantity)
      };

      console.log('Adding to cart:', cartItem);

      const response = await axios.post('http://localhost:8080/cart/add', cartItem, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Add to cart response:', response.data);

      // Force refresh the cart
      hasFetched.current = false;
      await fetchCart();
      
      if (response.data && response.data.message) {
        alert(response.data.message);
      }
      
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      if (!currentUser || !currentUser.userId) {
        alert('Please login to manage cart');
        return false;
      }

      const response = await axios.delete(`http://localhost:8080/cart/${cartItemId}?userId=${currentUser.userId}`);

      console.log('Remove from cart response:', response.data);

      // Update local state immediately
      setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
      
      if (response.data && response.data.message) {
        alert(response.data.message);
      }
      
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to remove item from cart');
      }
      return false;
    }
  };

  // Update item quantity
  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      if (!currentUser || !currentUser.userId) {
        alert('Please login to update cart');
        return false;
      }

      if (newQuantity <= 0) {
        return await removeFromCart(cartItemId);
      }

      const response = await axios.put(`http://localhost:8080/cart/${cartItemId}/quantity`, 
        {
          userId: currentUser.userId,
          quantity: newQuantity
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update quantity response:', response.data);

      // Update local state immediately
      setCart(prevCart => 
        prevCart.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      
      if (response.data && response.data.message) {
        alert(response.data.message);
      }
      
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to update quantity');
      }
      return false;
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      if (!currentUser || !currentUser.userId) {
        alert('Please login to manage cart');
        return false;
      }

      const response = await axios.delete(`http://localhost:8080/cart/clear?userId=${currentUser.userId}`);

      console.log('Clear cart response:', response.data);

      setCart([]);
      
      if (response.data && response.data.message) {
        alert(response.data.message);
      }
      
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to clear cart');
      }
      return false;
    }
  };

  // Calculate total cart value
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Calculate total items count
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if product is already in cart
  const isInCart = (productId, vendorId) => {
    return cart.some(
      item => item.product.prodId === productId && item.vendor.vendorId === vendorId
    );
  };

  // Get quantity of specific product from vendor in cart
  const getCartItemQuantity = (productId, vendorId) => {
    const item = cart.find(
      item => item.product.prodId === productId && item.vendor.vendorId === vendorId
    );
    return item ? item.quantity : 0;
  };

  // Get cart item ID for specific product and vendor
  const getCartItemId = (productId, vendorId) => {
    const item = cart.find(
      item => item.product.prodId === productId && item.vendor.vendorId === vendorId
    );
    return item ? item.cartItemId : null;
  };

  // Update user when login/logout happens
  const updateUser = (user) => {
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      setCurrentUser(null);
      setCart([]);
      localStorage.removeItem('user');
    }
  };

  // IMPORTANT: Make sure ALL functions and state are included here
  const contextValue = {
    // State
    cart,
    loading,
    error,
    currentUser,
    
    // Cart operations
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Cart calculations
    getCartTotal,
    getCartItemCount,
    isInCart,
    getCartItemQuantity,
    getCartItemId,
    
    // Other functions
    refreshCart: fetchCart,
    updateUser,
    fetchCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};