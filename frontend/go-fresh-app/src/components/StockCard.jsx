import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const StockCard = ({ stock, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState(stock.price);
  const [quantity, setQuantity] = useState(stock.quantity);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/stocks/${stock.stockId}?price=${price}&quantity=${quantity}`, {
        method: "PUT",
      });
      
      if (response.ok) {
        setEditing(false);
        onUpdate(); // Refresh parent list
        alert("Stock updated successfully!");
      } else {
        alert("Failed to update stock");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{stock.product?.productName || "Unknown Product"}</Card.Title>
        
        <Card.Subtitle className="mb-2 text-muted">
          {stock.product?.category?.category || "No Category"}
        </Card.Subtitle>

        {/* Price Section */}
        <div className="mb-3">
          <strong>Price:</strong>
          {editing ? (
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              min="0"
              step="0.01"
              className="mt-1"
            />
          ) : (
            <p className="fs-5 text-success">₹{stock.price.toFixed(2)}</p>
          )}
        </div>

        {/* Quantity Section */}
        <div className="mb-3">
          <strong>Quantity:</strong>
          {editing ? (
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="0"
              className="mt-1"
            />
          ) : (
            <p className="fs-5">{stock.quantity} units</p>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          <span className={`badge ${stock.quantity > 0 ? 'bg-success' : 'bg-danger'}`}>
            {stock.quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          {editing ? (
            <>
              <Button
                variant="success"
                onClick={handleUpdate}
                disabled={loading}
                className="flex-fill"
              >
                {loading ? "Updating..." : "Confirm"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditing(false);
                  setPrice(stock.price);
                  setQuantity(stock.quantity);
                }}
                className="flex-fill"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={() => setEditing(true)}
              className="w-100"
            >
              Edit Stock
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StockCard;