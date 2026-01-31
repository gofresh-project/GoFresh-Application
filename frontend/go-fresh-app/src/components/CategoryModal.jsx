import React from "react";
import "../styles/Vendor.css";

export default function CategoryModal({ categories, onSelect }) {
  return (
    <div className="category-modal-overlay">
      <div className="category-modal-card">
        <h3 className="mb-4 fw-bold">Select a Category</h3>
        <div className="d-flex flex-column gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className="btn btn-outline-success fw-semibold category-btn"
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
