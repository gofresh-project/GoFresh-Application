import axios from "axios";

const API_URL = "http://localhost:8080/product";

export const getAllProducts = () => axios.get(API_URL);


export const getProductsByCategory = (catId) =>
  axios.get(`http://localhost:8080/api/categories/${catId}/products`);

