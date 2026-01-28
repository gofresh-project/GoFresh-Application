import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import Card from "../components/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Fresh Products</h2>

      <Row>
        {products.map((backendProduct) => {
          // Normalize backend → frontend model
          const product = {
            id: backendProduct.prod_id,
            name: backendProduct.product_name,
            price: backendProduct.price,
            image: backendProduct.image_url,
            available: backendProduct.available,
          };

          return (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
              <Card product={product} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
