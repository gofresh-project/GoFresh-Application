import "../styles/Card.css";

const Card = ({ product }) => {
  if (!product) return null; // safety check

  return (
    <div className={`product-card ${!product.available ? "disabled" : ""}`}>
      <div className="image-wrapper">
        <img src={product.image} alt={product.name} />

        <span
          className={`status ${
            product.available ? "available" : "not-available"
          }`}
        >
          {product.available ? "Available" : "Out of Stock"}
        </span>
      </div>

      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">₹ {product.price} / kg</p>

        <button disabled={!product.available}>
          {product.available ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default Card;
