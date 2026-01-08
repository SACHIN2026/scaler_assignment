import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Products
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  
  const response = await axios.get(`${API_BASE_URL}/products?${params}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// Categories
export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

// Cart
export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`);
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post(`${API_BASE_URL}/cart`, {
    productId,
    quantity
  });
  return response.data;
};

export const updateCartItem = async (cartId, quantity) => {
  const response = await axios.put(`${API_BASE_URL}/cart/${cartId}`, {
    quantity
  });
  return response.data;
};

export const removeFromCart = async (cartId) => {
  const response = await axios.delete(`${API_BASE_URL}/cart/${cartId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await axios.post(`${API_BASE_URL}/cart/clear`);
  return response.data;
};

// Orders
export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
  return response.data;
};

export const getOrderByNumber = async (orderNumber) => {
  const response = await axios.get(`${API_BASE_URL}/orders/number/${orderNumber}`);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};
