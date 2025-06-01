'use client';
import axios from 'axios';

// Create an axios instance with authentication headers
const createAuthenticatedAxios = (token) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

// Helper function to get the authenticated axios instance
export const getAuthAxios = () => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  return createAuthenticatedAxios(token);
};

// Helper function to handle API requests with authentication
export const apiRequest = async (method, url, data = null) => {
  try {
    const authAxios = getAuthAxios();
    
    let response;
    
    switch (method.toLowerCase()) {
      case 'get':
        response = await authAxios.get(url);
        break;
      case 'post':
        response = await authAxios.post(url, data);
        break;
      case 'put':
        response = await authAxios.put(url, data);
        break;
      case 'delete':
        response = await authAxios.delete(url);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    
    return response.data;
  } catch (error) {
    // Handle token expiration or authentication errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear token and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    throw error;
  }
};
