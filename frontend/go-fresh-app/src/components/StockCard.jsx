import { useState } from "react";
import { updateStock } from "../services/stockService";
import "../styles/StockCard.css";


const StockCard = ({ stock, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState(stock.price);
  const [quantity, setQuantity] = useState(stock.quantity);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateStock(stock.stockId, price, quantity);
      setEditing(false);
      onUpdate(); // Refresh parent list
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-card">
      {/* Product Info */}
      <div className="product-info">
        <h4>{stock.product.productName}</h4>
        <p className="category">
          Category: {stock.product.category?.category || "N/A"}
        </p>
      </div>

      {/* Price Section */}
      <div className="price-section">
        <label>Price (₹):</label>
        {editing ? (
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            min="0"
            step="0.01"
          />
        ) : (
          <p className="value">₹ {stock.price.toFixed(2)}</p>
        )}
      </div>

      {/* Quantity Section */}
      <div className="quantity-section">
        <label>Quantity:</label>
        {editing ? (
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="0"
          />
        ) : (
          <p className="value">{stock.quantity} units</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {editing ? (
          <>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="btn-confirm"
            >
              {loading ? "Updating..." : "Confirm"}
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setPrice(stock.price);
                setQuantity(stock.quantity);
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} className="btn-edit">
            Edit Stock
          </button>
        )}
      </div>

      {/* Status */}
      <div className={`status ${stock.quantity > 0 ? "in-stock" : "out-stock"}`}>
        {stock.quantity > 0 ? "In Stock" : "Out of Stock"}
      </div>
    </div>
  );
};

export default StockCard;