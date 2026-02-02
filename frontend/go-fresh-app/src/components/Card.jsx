
import { Link } from "react-router-dom";
import "../styles/Card.css";

const Card = ({ product }) => {
  if (!product) return null;
  return (
    // Change from /product/${product.prodId} to /products/${product.prodId}
    <Link
      to={`/products/${product.id}`}   // ← CHANGED TO /products (plural)  //Mapping with ProductDetails
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={`product-card`}>
        <div className="image-wrapper">
          <img 
            src={product.image}
            alt={product.productName}
            onError={(e) => {
              e.target.src = "/default-product.png";
            }}
          />
        </div>

        <div className="card-body">
          <h3>{product.productName}</h3>
          <p className="price">
            {product.name}
          </p>

          <button>
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
