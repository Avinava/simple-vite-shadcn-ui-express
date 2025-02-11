import axios from 'axios';

// In development, we use the proxy configured in vite.config.js
// In production, we use the VITE_API_URL environment variable or fall back to relative path
const API_URL = import.meta.env.DEV 
  ? '' // Empty string will use the proxy in development
  : (import.meta.env.VITE_API_URL || '');

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === 'ECONNABORTED' || !error.response) {
      return Promise.reject({
        success: false,
        message: 'Unable to connect to the server. Please ensure the server is running.',
        error: 'CONNECTION_ERROR'
      });
    }
    
    // Return standardized error format
    return Promise.reject(error.response?.data || {
      success: false,
      message: error.message,
      error: 'API_ERROR'
    });
  }
);

export const userService = {
  async getUsers() {
    try {
      return await api.get('/users');
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },

  async getUser(id) {
    try {
      return await api.get(`/users/${id}`);
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      return await api.post('/users', userData);
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  },

  async updateUser(id, userData) {
    try {
      return await api.put(`/users/${id}`, userData);
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      return await api.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Failed to delete user ${id}:`, error);
      throw error;
    }
  }
};