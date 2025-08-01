import axios from 'axios';

const API_URL = 'http://localhost:8000/api/orders/'; // Backend API URL

// 🛒 Order Create API Call
export const createOrder = async (order) => {
  try {
    const response = await axios.post(API_URL, order);
    console.log("Order Placed Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Order Placement Failed:", error.response?.data || error.message);
    throw error;
  }
};

// 📋 Get All Orders API Call
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Fetching Orders Failed:", error.response?.data || error.message);
    throw error;
  }
};
