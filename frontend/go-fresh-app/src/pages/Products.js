import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import Card from "../components/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function Products() {




  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 FILTER STATES
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading products...</p>;
  }

  // 🔹 FILTER LOGIC (CATEGORY + STOCK)
  const filteredProducts = products.filter((p) => {
    const categoryMatch =
      categoryFilter === "ALL" ||
      (p.category && p.category.category === categoryFilter);

    const stockMatch =
      stockFilter === "ALL" ||
      (stockFilter === "IN" && p.available === true) ||
      (stockFilter === "OUT" && p.available === false);

    return categoryMatch && stockMatch;
  });

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* 🔹 LEFT FILTER PANEL */}
        <Col md={3} className="border-end">
          <h5 className="mb-3">Filter Products</h5>

          {/* CATEGORY FILTER */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
            </Form.Select>
          </Form.Group>

          {/* STOCK FILTER */}
          <Form.Group>
            <Form.Label>Availability</Form.Label>
            <Form.Select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="IN">In Stock</option>
              <option value="OUT">Out of Stock</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* 🔹 PRODUCT LIST */}
        <Col md={9}>
          <h2 className="mb-4 text-center">Fresh Products</h2>

          <Row>
            {filteredProducts.length === 0 && (
              <p className="text-center text-muted">
                No products match your filter
              </p>
            )}

            {filteredProducts.map((backendProduct) => {
              const product = {
                id: backendProduct.prodId,
                name: backendProduct.productName,
                description: backendProduct.description,
                image: backendProduct.imageUrl,

                price: backendProduct.price,
                quantity: backendProduct.quantity,
                available: backendProduct.available,

                // 🔹 CATEGORY OBJECT FROM BACKEND
                category: backendProduct.category.category,
              };

              return (
                <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                  <Card product={product} />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
