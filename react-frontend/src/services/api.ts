import axios from 'axios';
import { Shop, OrderPayload, OrderResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMenu = async (): Promise<Shop> => {
  const response = await fetch('/menu.json');
  if (!response.ok) {
    throw new Error('Failed to fetch menu');
  }
  return response.json();
};

export const createOrder = async (orderData: OrderPayload): Promise<OrderResponse> => {
  try {
    console.log('Sending order data:', orderData);
    console.log('API URL:', API_BASE_URL);
    const response = await api.post('/orders', orderData);
    console.log('Order created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
    }
    throw error;
  }
};

export default api;
