import React from "react";
import FruitCard from "./FruitCard";
import "../styles/Vendor.css";

const stats = [
  { label: "Total Products", value: 24 },
  { label: "Total Orders", value: 112 },
  { label: "Revenue", value: "₹18,450" },
];

const products = [
  {
    id: 1,
    name: "Fresh Apple",
    price: 120,
    stock: 40,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
  },
  {
    id: 2,
    name: "Banana",
    price: 60,
    stock: 100,
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e12a",
  },
  {
    id: 3,
    name: "Orange",
    price: 80,
    stock: 50,
    image: "https://images.unsplash.com/photo-1571047303866-2f2d23d2693a",
  },
  {
    id: 4,
    name: "Strawberry",
    price: 150,
    stock: 25,
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
  },
];

export default function VendorDashboard({ selectedCategory }) {
  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold text-success">{selectedCategory} Dashboard</h2>

      {/* Stats */}
      <div className="row mb-4">
        {stats.map((s, i) => (
          <div className="col-md-4 mb-3" key={i}>
            <div className="card text-center shadow-sm border-0 rounded stat-card">
              <div className="card-body">
                <h6 className="text-muted">{s.label}</h6>
                <h4 className="fw-bold text-success">{s.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold">{selectedCategory} Products</h4>
        <button className="btn btn-success">+ Add Product</button>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-sm-6 col-lg-3 mb-4" key={p.id}>
            <FruitCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
