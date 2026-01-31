// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { Trash, Plus, Dash, CartX } from 'react-bootstrap-icons';

export default function CartPage() {
  const { 
    cart, 
    loading, 
    error,
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    getCartItemCount,
    refreshCart 
  } = useCart();
  
  const navigate = useNavigate();
  const [updating, setUpdating] = useState({});
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Refresh cart on component mount
  useEffect(() => {
    refreshCart();
  }, []);

  // Handle quantity change for an item
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating({ ...updating, [cartItemId]: true });
    await updateQuantity(cartItemId, newQuantity);
    setUpdating({ ...updating, [cartItemId]: false });
  };

  // Handle remove item
  const handleRemoveItem = async (cartItemId) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      await removeFromCart(cartItemId);
    }
  };

  // Handle clear cart
  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      await clearCart();
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    setCheckoutLoading(true);
    
    // Check if cart is empty
    if (cart.length === 0) {
      alert('Your cart is empty!');
      setCheckoutLoading(false);
      return;
    }

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to checkout');
      navigate('/login', { state: { from: '/cart' } });
      setCheckoutLoading(false);
      return;
    }

    // Navigate to checkout page (you'll create this later)
    setTimeout(() => {
      navigate('/checkout');
      setCheckoutLoading(false);
    }, 1000);
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <Container className="text-center mt-5 py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading your cart...</p>
      </Container>
    );
  }

  // ================= ERROR STATE =================
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Cart</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={refreshCart}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  // ================= EMPTY CART STATE =================
  if (cart.length === 0) {
    return (
      <Container className="text-center mt-5 py-5">
        <div className="py-5">
          <CartX size={80} className="text-muted mb-4" />
          <h3 className="text-muted mb-3">Your Cart is Empty</h3>
          <p className="text-muted mb-4">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/products')}
            className="px-4"
          >
            <i className="bi bi-bag me-2"></i>
            Start Shopping
          </Button>
        </div>
      </Container>
    );
  }

  // ================= CART ITEMS TABLE =================
  return (
    <Container className="py-5">
      <h1 className="mb-4">🛒 Shopping Cart</h1>
      <p className="text-muted mb-5">
        You have {getCartItemCount()} item{getCartItemCount() !== 1 ? 's' : ''} in your cart
      </p>

      <Row>
        {/* Cart Items Column */}
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Cart Items</h5>
              <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={handleClearCart}
                disabled={cart.length === 0}
              >
                <Trash size={16} className="me-1" />
                Clear Cart
              </Button>
            </Card.Header>
            
            <Card.Body>
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Vendor</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.cartItemId}>
                      {/* Product Column */}
                      <td>
                        <div className="d-flex align-items-center">
                          {item.product.imageUrl ? (
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.productName}
                              className="rounded me-3"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="bg-light rounded me-3 d-flex align-items-center justify-content-center"
                                 style={{ width: '60px', height: '60px' }}>
                              <i className="bi bi-image text-muted"></i>
                            </div>
                          )}
                          <div>
                            <strong>{item.product.productName}</strong>
                            <div className="text-muted small">
                              {item.product.category?.category || 'General'}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Vendor Column */}
                      <td>
                        <div>
                          <strong>{item.vendor.businessName}</strong>
                          <div className="text-muted small">
                            <i className="bi bi-geo-alt me-1"></i>
                            {item.vendor.area?.areaName || 'N/A'}
                          </div>
                        </div>
                      </td>
                      
                      {/* Price Column */}
                      <td className="text-center align-middle">
                        <span className="text-success fw-bold">
                          ₹{item.product.price.toFixed(2)}
                        </span>
                      </td>
                      
                      {/* Quantity Column */}
                      <td className="text-center align-middle">
                        <div className="d-flex align-items-center justify-content-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updating[item.cartItemId]}
                            className="px-3"
                          >
                            <Dash />
                          </Button>
                          
                          <div className="mx-3">
                            {updating[item.cartItemId] ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              <span className="fw-bold fs-5">{item.quantity}</span>
                            )}
                          </div>
                          
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                            disabled={updating[item.cartItemId]}
                            className="px-3"
                          >
                            <Plus />
                          </Button>
                        </div>
                      </td>
                      
                      {/* Total Column */}
                      <td className="text-center align-middle">
                        <span className="fw-bold fs-5 text-primary">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </td>
                      
                      {/* Action Column */}
                      <td className="text-center align-middle">
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleRemoveItem(item.cartItemId)}
                          title="Remove item"
                        >
                          <Trash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary Column */}
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Header className="bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            
            <Card.Body>
              {/* Price Breakdown */}
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({getCartItemCount()} items)</span>
                  <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charges</span>
                  <span className="text-success">FREE</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (GST 18%)</span>
                  <span>₹{(getCartTotal() * 0.18).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total Amount</strong>
                  <strong className="text-primary fs-4">
                    ₹{(getCartTotal() * 1.18).toFixed(2)}
                  </strong>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                variant="success" 
                size="lg" 
                className="w-100 py-3 mb-3"
                onClick={handleCheckout}
                disabled={checkoutLoading || cart.length === 0}
              >
                {checkoutLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-lock-fill me-2"></i>
                    Proceed to Checkout
                  </>
                )}
              </Button>

              {/* Continue Shopping Button */}
              <Button 
                variant="outline-primary" 
                className="w-100"
                onClick={() => navigate('/products')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Button>

              {/* Security Info */}
              <div className="mt-4 text-center">
                <div className="text-muted small">
                  <i className="bi bi-shield-check text-success me-1"></i>
                  100% Secure Checkout
                </div>
                <div className="text-muted small mt-1">
                  Your information is protected
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}