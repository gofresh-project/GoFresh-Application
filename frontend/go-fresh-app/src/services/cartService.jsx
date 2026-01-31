import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Change to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productService = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
};

// Stocks/Vendors API
export const stockService = {
  getAllStocks: () => api.get('/stocks'),
  getStocksByProduct: (productId) => api.get(`/stocks/product/${productId}`),
  getVendorStocks: (vendorId) => api.get(`/stocks/vendor/${vendorId}`),
};

// Vendors API
export const vendorService = {
  getAllVendors: () => api.get('/vendors'),
  getVendorById: (id) => api.get(`/vendors/${id}`),
};

// Cart API
export const cartService = {
  getCartByUser: (userId) => api.get(`/carts/user/${userId}`),
  addToCart: (cartData) => api.post('/cart-items', cartData),
  updateCartItem: (cartItemId, data) => api.put(`/cart-items/${cartItemId}`, data),
  removeFromCart: (cartItemId) => api.delete(`/cart-items/${cartItemId}`),
  clearCart: (cartId) => api.delete(`/carts/${cartId}/items`),
};

// Categories API
export const categoryService = {
  getAllCategories: () => api.get('/categories'),
};

// Users API (for authentication)
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/users/me'),
};

export default api;