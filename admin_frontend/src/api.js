import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7100/api/admin",
  headers: { roleId: 1 } // ADMIN
});

export const getUsers = () => API.get("/users");
export const toggleUser = (id) => API.put(`/users/toggle/${id}`);
export const getUserById = (id) => API.get(`/users/${id}`);

export const changeUserRole = (id, roleId) =>
  API.put(`/users/changerole/${id}?roleId=${roleId}`);


//vendors services
export const getVendors = () => API.get("/vendors/pending");
export const getApprovedVendors = () => API.get("/vendors/approved"); // 👈 ADD THIS
export const approveVendor = (id) => API.put(`/vendors/approve/${id}`);
export const disableVendor = (id) => API.put(`/vendors/disable/${id}`);
export const enableVendor = (id) => API.put(`/vendors/enable/${id}`);
export const getAllVendors = () => API.get("/vendors/all");


// for product services
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const addProduct = (product) => API.post("/products", product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const searchProducts = (name, catId) => 
  API.get(`/products/search?name=${name || ""}&catId=${catId || ""}`);

// api.js
