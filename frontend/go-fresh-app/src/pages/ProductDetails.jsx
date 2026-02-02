// src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  console.log("✅ ProductDetails loaded");
  console.log("✅ URL path: /products/" + productId);
  console.log("✅ productId value:", productId);
  
  // Get cart context - IMPORTANT: Use currentUser from context
  const { addToCart, currentUser, getCartItemQuantity, getCartItemId, updateQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});

  // Fetch product and stock data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching product details for ID: ${productId}`);
        const productRes = await axios.get(`http://localhost:8080/product/${productId}`);
        setProduct(productRes.data);

        const stocksRes = await axios.get(`http://localhost:8080/stocks/product/${productId}`);
        
        console.log('Stocks data:', stocksRes.data); // Debug log
        
        // Only show vendors with available stock
        const availableStocks = stocksRes.data.filter(stock => stock.quantity > 0);
        setStocks(availableStocks);

        // Initialize quantity for each vendor
        const initialQuantities = {};
        availableStocks.forEach(stock => {
          if (stock.vendor && stock.vendor.vendorId) { // FIX: Check if vendor exists
            const vendorId = stock.vendor.vendorId;
            // Check if item is already in cart
            const cartQuantity = getCartItemQuantity(productId, vendorId);
            initialQuantities[vendorId] = cartQuantity > 0 ? cartQuantity : 1;
          }
        });
        setQuantities(initialQuantities);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId, currentUser]);

  // Handle quantity change - FIXED: Check if vendor exists
  const handleQuantityChange = (vendorId, newQuantity) => {
    if (!vendorId) {
      console.error('vendorId is undefined');
      return;
    }
    
    let qty = parseInt(newQuantity) || 1;
    
    const vendorStock = stocks.find(stock => 
      stock.vendor && stock.vendor.vendorId === vendorId
    );
    
    if (!vendorStock) {
      console.error(`No stock found for vendor ID: ${vendorId}`);
      return;
    }
    
    if (qty < 1) {
      qty = 1;
    } else if (qty > vendorStock.quantity) {
      qty = vendorStock.quantity;
    }
    
    setQuantities({
      ...quantities,
      [vendorId]: qty
    });
  };

  // Handle increment - FIXED: Check if vendor exists
  const handleIncrement = (vendorId) => {
    if (!vendorId) {
      console.error('vendorId is undefined');
      return;
    }
    const currentQty = quantities[vendorId] || 1;
    handleQuantityChange(vendorId, currentQty + 1);
  };

  // Handle decrement - FIXED: Check if vendor exists
  const handleDecrement = (vendorId) => {
    if (!vendorId) {
      console.error('vendorId is undefined');
      return;
    }
    const currentQty = quantities[vendorId] || 1;
    if (currentQty > 1) {
      handleQuantityChange(vendorId, currentQty - 1);
    }
  };

  // Handle manual input change - FIXED: Check if vendor exists
  const handleInputChange = (vendorId, value) => {
    if (!vendorId) {
      console.error('vendorId is undefined');
      return;
    }
    handleQuantityChange(vendorId, value);
  };

  // Handle Add to Cart - FIXED: Check if vendor exists
  const handleAddToCart = async (stock) => {
    try {
      // FIX: Check if vendor exists
      if (!stock.vendor || !stock.vendor.vendorId) {
        alert('Vendor information is missing');
        return;
      }

      const vendorId = stock.vendor.vendorId;
      const productId = product.prodId; // FIX: Use productId from your model
      const qty = quantities[vendorId] || 1;
      const vendorName = stock.vendor.businessName || "Vendor";
      const productName = product.productName || "Product";

      console.log("🛒 handleAddToCart called with:", {
        vendorId,
        productId,
        quantity: qty,
        currentUser
      });

      // Check if user is logged in
      if (!currentUser) {
        alert('Please login to add items to cart');
        navigate('/login', { 
          state: { from: `/product/${productId}` } 
        });
        return;
      }

      // Check if user is a customer
      if (currentUser.role?.roleName !== 'Customer') {
        alert('Only customers can add items to cart');
        return;
      }

      // Set loading state for this specific vendor
      setAddingToCart(prev => ({ ...prev, [vendorId]: true }));

      // Check if item already exists in cart
      const existingCartItemId = getCartItemId(productId, vendorId);
      
      if (existingCartItemId) {
        // Item exists, update quantity
        const currentCartQty = getCartItemQuantity(productId, vendorId);
        const newTotalQty = currentCartQty + qty;
        
        if (newTotalQty > stock.quantity) {
          alert(`Cannot add ${qty} more items. Total would be ${newTotalQty}, but only ${stock.quantity} available.`);
          setAddingToCart(prev => ({ ...prev, [vendorId]: false }));
          return;
        }
        
        await updateQuantity(existingCartItemId, newTotalQty);
        alert(`✅ Updated quantity to ${newTotalQty} for ${productName} from ${vendorName}`);
      } else {
        // New item, add to cart
        const success = await addToCart(productId, vendorId, qty);
        
        if (success) {
          alert(`✅ Successfully added ${qty} ${productName}(s) from ${vendorName} to cart!\n\n` +
                `Price: ₹${stock.price} per unit\n` +
                `Total: ₹${(qty * stock.price).toFixed(2)}`);
        }
      }

    } catch (error) {
      console.error('Error in handleAddToCart:', error);
      alert('An error occurred while adding to cart. Please try again.');
    } finally {
      // Reset loading state
      const vendorId = stock.vendor?.vendorId;
      if (vendorId) {
        setAddingToCart(prev => ({ ...prev, [vendorId]: false }));
      }
    }
  };

  // Check if item is already in cart
  const isItemInCart = (vendorId) => {
    if (!currentUser || !product || !vendorId) return false;
    return getCartItemQuantity(product.productId, vendorId) > 0; // FIX: Use productId
  };

  // Get button text based on state
  const getButtonText = (vendorId, stock) => {
    if (!currentUser) {
      return "Login to Add to Cart";
    }
    
    if (currentUser.role?.roleName !== 'Customer') {
      return "Customers Only";
    }
    
    if (addingToCart[vendorId]) {
      return "Adding...";
    }
    
    if (vendorId && isItemInCart(vendorId)) {
      const cartQty = getCartItemQuantity(product.productId, vendorId);
      return `${cartQty} in Cart - Add More`;
    }
    
    return "Add to Cart";
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <Container className="text-center mt-5 py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading product details...</p>
        <p className="small text-muted">Fetching data from server...</p>
      </Container>
    );
  }

  // ================= ERROR STATE =================
  if (error) {
    return (
      <Container className="text-center mt-5 py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Product</h4>
          <p>{error}</p>
          <hr />
          <Button variant="outline-danger" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Container>
    );
  }

  // ================= PRODUCT NOT FOUND =================
  if (!product) {
    return (
      <Container className="text-center mt-5 py-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Product Not Found</h4>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="outline-primary" onClick={() => navigate('/products')}>
            Browse Available Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Product Header */}
      <Row className="mb-5 align-items-center">
        <Col md={6} className="mb-4">
          <div className="border rounded p-3 bg-light text-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="img-fluid rounded"
                style={{ maxHeight: "300px", objectFit: "contain" }}
                onError={(e) => {
                  e.target.src = "/default-product.png";
                  console.warn("Product image failed to load, using default");
                }}
              />
            ) : (
              <div className="py-5 text-muted">
                <i className="bi bi-image" style={{ fontSize: "4rem" }}></i>
                <p className="mt-2">No image available</p>
              </div>
            )}
          </div>
        </Col>
        
        <Col md={6}>
          <h1 className="mb-3">{product.productName}</h1>
          
          <div className="mb-3">
            <span className="badge bg-info fs-6 px-3 py-2">
              <i className="bi bi-tag me-2"></i>
              {product.category?.category || "General"}
            </span>
          </div>
          
          <p className="lead text-muted">{product.description}</p>
          
          {/* Show login prompt if not logged in */}
          {!currentUser && (
            <div className="alert alert-warning mb-4">
              <i className="bi bi-info-circle me-2"></i>
              Please <strong>login as a customer</strong> to add items to cart
            </div>
          )}

          {/* Show role warning if not customer */}
          {currentUser && currentUser.role?.roleName !== 'Customer' && (
            <div className="alert alert-danger mb-4">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Only <strong>customers</strong> can add items to cart
            </div>
          )}

          <div className="card bg-light mb-4 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-info-circle me-2"></i>
                Availability Summary
              </h5>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="card-text mb-0">
                    {stocks.length > 0 
                      ? `Available from ${stocks.length} vendor(s)` 
                      : "Currently out of stock"}
                  </p>
                </div>
                {stocks.length > 0 && (
                  <div className="text-success">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    In Stock
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Vendor Stocks Section */}
      <div className="mb-4">
        <h3 className="border-bottom pb-2">
          <i className="bi bi-shop me-2"></i>
          Available From Vendors
        </h3>
        <p className="text-muted">
          Select a vendor and adjust quantity. Only vendors with available stock are shown.
        </p>
      </div>

      {/* NO STOCK AVAILABLE MESSAGE */}
      {stocks.length === 0 ? (
        <div className="text-center py-5 border rounded bg-light">
          <div className="py-4">
            <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: "3rem" }}></i>
            <h5 className="text-muted mt-3 mb-2">No Stock Available</h5>
            <p className="text-muted mb-4">
              This product is currently out of stock with all vendors.<br />
              Check back later or browse other products.
            </p>
            <Button variant="outline-primary" onClick={() => navigate('/products')}>
              <i className="bi bi-arrow-left me-2"></i>
              View Other Products
            </Button>
          </div>
        </div>
      ) : (
        <Row>
          {stocks.map((stock) => {
            // FIX: Check if vendor exists
            if (!stock.vendor || !stock.vendor.vendorId) {
              console.warn('Stock has no vendor:', stock);
              return null; // Skip this stock item
            }
            
            const vendor = stock.vendor;
            const vendorId = vendor.vendorId;
            const currentQty = quantities[vendorId] || 1;
            const isLowStock = stock.quantity > 0 && stock.quantity < 10;
            const isAdding = addingToCart[vendorId];
            const canAddToCart = currentUser && currentUser.role?.roleName === 'Customer';
            const isInCart = vendorId && isItemInCart(vendorId);
            const cartQty = isInCart ? getCartItemQuantity(product.productId, vendorId) : 0;
            
            return (
              <Col key={stock.stockId} lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow-sm border">
                  <Card.Body>
                    <Card.Title className="text-primary mb-3">
                      <i className="bi bi-shop me-2"></i>
                      {vendor.businessName || "Unknown Vendor"}
                    </Card.Title>
                    
                    {vendor.user && (
                      <Card.Subtitle className="mb-3 text-muted small">
                        <i className="bi bi-person me-1"></i>
                        {vendor.user.firstName} {vendor.user.lastName}
                      </Card.Subtitle>
                    )}

                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="fw-bold">Price:</span>
                          <p className="text-muted small mb-0">per unit</p>
                        </div>
                        <span className="fs-4 fw-bold text-success">
                          ₹{stock.price ? stock.price.toFixed(2) : '0.00'}
                        </span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <span className="fw-bold">Available Stock:</span>
                          <p className="text-muted small mb-0">units in inventory</p>
                        </div>
                        <span className={`fs-5 fw-bold ${isLowStock ? 'text-warning' : 'text-success'}`}>
                          {stock.quantity} units
                        </span>
                      </div>

                      {isInCart && (
                        <div className="alert alert-info mb-3 py-2">
                          <i className="bi bi-cart-check me-2"></i>
                          <small>You have {cartQty} in cart</small>
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="fw-bold">Location:</span>
                          <p className="text-muted small mb-0">delivery area</p>
                        </div>
                        <span className="text-muted">
                          <i className="bi bi-geo-alt me-1"></i>
                          {vendor.area?.areaName || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Form.Label className="fw-bold mb-3">
                        <i className="bi bi-cart me-2"></i>
                        Select Quantity to {isInCart ? "Add More" : "Add"}
                      </Form.Label>
                      <div className="d-flex align-items-center justify-content-between">
                        <Button 
                          variant="outline-secondary" 
                          size="lg"
                          onClick={() => handleDecrement(vendorId)}
                          disabled={currentQty <= 1 || isAdding || !canAddToCart}
                          aria-label="Decrease quantity"
                          className="px-3"
                        >
                          <i className="bi bi-dash-lg"></i>
                        </Button>
                        
                        <div className="text-center mx-3">
                          <Form.Control
                            type="number"
                            min="1"
                            max={stock.quantity}
                            value={currentQty}
                            onChange={(e) => handleInputChange(vendorId, e.target.value)}
                            className="text-center fs-4"
                            style={{ width: "80px" }}
                            aria-label="Quantity input"
                            disabled={isAdding || !canAddToCart}
                          />
                          <small className="text-muted d-block mt-1">
                            Max: {stock.quantity}
                          </small>
                        </div>
                        
                        <Button 
                          variant="outline-secondary" 
                          size="lg"
                          onClick={() => handleIncrement(vendorId)}
                          disabled={currentQty >= stock.quantity || isAdding || !canAddToCart}
                          aria-label="Increase quantity"
                          className="px-3"
                        >
                          <i className="bi bi-plus-lg"></i>
                        </Button>
                      </div>
                      
                      <div className="text-center mt-3">
                        <p className="mb-0">
                          <strong>Total:</strong> 
                          <span className="text-success fs-5 ms-2">
                            ₹{(currentQty * (stock.price || 0)).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* ADD TO CART BUTTON */}
                    <Button
                      variant={isInCart ? "warning" : "primary"}
                      className="w-100 py-3 fs-5"
                      onClick={() => handleAddToCart(stock)}
                      disabled={stock.quantity === 0 || isAdding || !canAddToCart}
                      data-vendor-id={vendorId}
                      aria-label={`Add ${currentQty} items from ${vendor.businessName} to cart`}
                    >
                      {isAdding ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Adding...
                        </>
                      ) : (
                        <>
                          <i className={`bi ${isInCart ? 'bi-cart-plus-fill' : 'bi-cart-plus'} me-2`}></i>
                          {getButtonText(vendorId, stock)}
                        </>
                      )}
                    </Button>

                    {isLowStock && (
                      <div className="alert alert-warning mt-3 mb-0 text-center py-2">
                        <small>
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          <strong>Low Stock Alert!</strong> Only {stock.quantity} units remaining.
                        </small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}