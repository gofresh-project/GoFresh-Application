import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div key={item.stockId} style={{ borderBottom: "1px solid #ddd" }}>
          <p>{item.productName}</p>
          <p>Vendor: {item.vendorName}</p>
          <p>
            ₹{item.price} × {item.quantity}
          </p>

          <button
            onClick={() =>
              removeFromCart(item.productId, item.vendorId)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}
