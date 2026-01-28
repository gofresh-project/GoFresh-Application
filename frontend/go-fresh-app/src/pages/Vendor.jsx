import React, { useState } from "react";
import CategoryModal from "../components/CategoryModal";
import Card from "../components/Card";
import "../styles/Vendor.css";

export default function Vendor() {
  const [showModal, setShowModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Fruits", "Vegetables", "Dairy", "Bakery"];

  // Dummy products (generic, not fruit-specific)
  const products = [
    {
      id: 1,
      name: "Fresh Apple",
      price: 120,
      available: true,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    },
    {
      id: 2,
      name: "Banana",
      price: 60,
      available: false,
      image: "https://images.unsplash.com/photo-1574226516831-e1dff420e12a",
    },
    {
      id: 3,
      name: "Orange",
      price: 80,
      available: true,
      image: "https://images.unsplash.com/photo-1571047303866-2f2d23d2693a",
    },
    {
      id: 4,
      name: "Strawberry",
      price: 150,
      available: true,
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    },
  ];

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Total Orders", value: 112 },
    { label: "Revenue", value: "₹18,450" },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowModal(false);
  };

  return (
    <>
      {/* Category Popup */}
      {showModal && (
        <CategoryModal
          categories={categories}
          onSelect={handleCategorySelect}
        />
      )}

      {/* Vendor Dashboard */}
      {!showModal && (
        <div className="container my-4">
          <h2 className="mb-4 fw-bold text-success">
            {selectedCategory} Vendor Dashboard
          </h2>

          {/* Stats Section */}
          <div className="row mb-4">
            {stats.map((stat, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card stat-card text-center shadow-sm border-0">
                  <div className="card-body">
                    <h6 className="text-muted">{stat.label}</h6>
                    <h4 className="fw-bold text-success">
                      {stat.value}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Products Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-semibold">
              {selectedCategory} Products
            </h4>
            <button className="btn btn-success">
              + Add Product
            </button>
          </div>

          {/* Products Grid */}
          <div className="row">
            {products.map((product) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 mb-4"
                key={product.id}
              >
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
