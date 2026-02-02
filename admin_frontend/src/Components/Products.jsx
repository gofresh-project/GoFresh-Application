import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      console.log("API DATA:", res.data); // debug
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      alert("Product deleted");
      loadProducts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Products</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Cat ID</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.prodId}>
              <td>{p.prodId}</td>
              <td>{p.productName}</td>
              <td>{p.catId}</td>
              <td>{p.description}</td>
              <td>
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.productName}
                    width="60"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(p.prodId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Products;
