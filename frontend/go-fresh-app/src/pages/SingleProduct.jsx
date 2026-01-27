import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

// TEMP MOCK RESPONSE FROM BACKEND
const productResponse = {
  prodId: 1,
  name: "Apple",
  description: "Fresh apples",
  image: "https://via.placeholder.com/300",
  stocks: [
    {
      stockId: 10,
      vendorId: 1,
      vendorName: "Green Farm",
      price: 120,
      quantity: 20,
    },
    {
      stockId: 11,
      vendorId: 2,
      vendorName: "Fresh Basket",
      price: 130,
      quantity: 10,
    },
  ],
};

export default function SingleProduct() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = productResponse; // later fetch by id

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>

      <h3>Available Vendors</h3>

      {product.stocks.map((s) => (
        <div
          key={s.stockId}
          style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}
        >
          <p>Vendor: {s.vendorName}</p>
          <p>Price: ₹{s.price}</p>
          <p>Available: {s.quantity}</p>

          <button
            onClick={() =>
              addToCart({
                productId: product.prodId,
                productName: product.name,
                vendorId: s.vendorId,
                vendorName: s.vendorName,
                stockId: s.stockId,
                price: s.price,
                quantity: 1,
                image: product.image,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
