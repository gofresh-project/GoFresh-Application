import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.prodId}`)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>From ₹{product.minPrice}</p>
    </div>
  );
}
