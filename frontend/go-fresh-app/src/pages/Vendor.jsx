import { useEffect, useState } from "react";
import { getStocksByVendor } from "../services/stockService";
import { getAllProducts } from "../services/productService";
import StockCard from "../components/StockCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function VendorProducts() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vendorId, setVendorId] = useState(2); // Default vendor ID, you can get from auth
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");
  
  // Add new stock modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  useEffect(() => {
    fetchStocks();
    fetchAllProducts();
  }, [vendorId]);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const data = await getStocksByVendor(vendorId);
      setStocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
      alert("Failed to load stocks");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter logic
  const filteredStocks = stocks.filter((stock) => {
    const categoryMatch =
      categoryFilter === "ALL" ||
      (stock.product.category?.category === categoryFilter);

    const stockMatch =
      stockFilter === "ALL" ||
      (stockFilter === "IN" && stock.quantity > 0) ||
      (stockFilter === "OUT" && stock.quantity === 0);

    return categoryMatch && stockMatch;
  });

  const handleAddStock = async () => {
    if (!selectedProduct || !newPrice || !newQuantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      // You'll need to import addStock from stockService
      // await addStock(selectedProduct, vendorId, parseFloat(newPrice), parseInt(newQuantity));
      alert("Stock added successfully!");
      setShowAddModal(false);
      setSelectedProduct("");
      setNewPrice("");
      setNewQuantity("");
      fetchStocks(); // Refresh list
    } catch (error) {
      alert("Failed to add stock");
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading your stock items...</p>;
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Left Filter Panel */}
        <Col md={3} className="border-end">
          <h5 className="mb-3">Manage Your Stock</h5>
          
          {/* Vendor ID Input (for testing) */}
          <Form.Group className="mb-3">
            <Form.Label>Vendor ID</Form.Label>
            <Form.Control
              type="number"
              value={vendorId}
              onChange={(e) => setVendorId(parseInt(e.target.value))}
              placeholder="Enter Vendor ID"
            />
          </Form.Group>

          {/* Category Filter */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
            </Form.Select>
          </Form.Group>

          {/* Stock Status Filter */}
          <Form.Group className="mb-3">
            <Form.Label>Stock Status</Form.Label>
            <Form.Select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="IN">In Stock</option>
              <option value="OUT">Out of Stock</option>
            </Form.Select>
          </Form.Group>

          {/* Add New Stock Button */}
          <Button 
            variant="success" 
            className="w-100"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Product
          </Button>
        </Col>

        {/* Stock List */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Your Stock Items</h2>
            <p className="text-muted mb-0">
              Showing {filteredStocks.length} of {stocks.length} items
            </p>
          </div>

          {filteredStocks.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-3">No stock items found</p>
              <Button 
                variant="primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Your First Product
              </Button>
            </div>
          ) : (
            <Row>
              {filteredStocks.map((stock) => (
                <Col key={stock.stockId} sm={12} md={6} lg={4} className="mb-4">
                  <StockCard 
                    stock={stock} 
                    onUpdate={fetchStocks}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      {/* Add New Stock Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product to Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.prodId} value={product.prodId}>
                    {product.productName} ({product.category?.category})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Enter price"
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="0"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddStock}>
            Add to Stock
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}