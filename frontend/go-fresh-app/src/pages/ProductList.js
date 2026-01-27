const products = [
  {
    id: 1,
    name: "Fresh Apples",
    price: "₹120 / kg",
    imageSrc: "https://via.placeholder.com/300",
    imageAlt: "Fresh apples",
    href: "#",
  },
  {
    id: 2,
    name: "Organic Tomatoes",
    price: "₹60 / kg",
    imageSrc: "https://via.placeholder.com/300",
    imageAlt: "Organic tomatoes",
    href: "#",
  },
  {
    id: 3,
    name: "Green Spinach",
    price: "₹40 / bunch",
    imageSrc: "https://via.placeholder.com/300",
    imageAlt: "Green spinach",
    href: "#",
  },
  {
    id: 4,
    name: "Bananas",
    price: "₹50 / dozen",
    imageSrc: "https://via.placeholder.com/300",
    imageAlt: "Fresh bananas",
    href: "#",
  },
];

function ProductList() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-success">
        Our Fresh Products
      </h2>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h6 className="card-title">{product.name}</h6>
                <p className="card-text fw-bold text-success">
                  {product.price}
                </p>
              </div>

              <div className="card-footer bg-white border-0 text-center">
                <a href={product.href} className="btn btn-outline-success btn-sm">
                  View Product
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
