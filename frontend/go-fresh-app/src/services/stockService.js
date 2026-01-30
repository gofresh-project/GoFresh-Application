import axios from "axios";

const API_BASE = "http://localhost:8080";

// Get stocks by vendor ID
export const getStocksByVendor = async (vendorId) => {
  try {
    const response = await axios.get(`${API_BASE}/stocks/vendor/${vendorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendor stocks:", error);
    throw error;
  }
};

// Update stock
export const updateStock = async (stockId, price, quantity) => {
  try {
    const response = await axios.put(
      `${API_BASE}/stocks/${stockId}?price=${price}&quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
};

export const addStock = (productId, vendorId, price, quantity) => {
  return axios.post("http://localhost:8080/stocks", {
    productId,
    vendorId,
    price,
    quantity
  });
};



// Add new stock (vendor adds product to their inventory)
export const addStock2 = async (productId, vendorId, price, quantity) => {
  try {
    const response = await axios.post(
      `${API_BASE}/stocks?productId=${productId}&vendorId=${vendorId}&price=${price}&quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
};




// Get stock by ID
export const getStockById = async (stockId) => {
  try {
    const response = await axios.get(`${API_BASE}/stocks/${stockId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock:", error);
    throw error;
  }
};

// Delete stock
export const deleteStock = async (stockId) => {
  try {
    await axios.delete(`${API_BASE}/stocks/${stockId}`);
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw error;
  }
};